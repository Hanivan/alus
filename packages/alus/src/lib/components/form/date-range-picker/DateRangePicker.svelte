<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom';
	import {
		DateFormatter,
		getLocalTimeZone,
		today as iToday,
		type DateValue
	} from '@internationalized/date';
	import { useEventListener } from 'runed';
	import { generateCounterId } from '$utils/a11y/id.js';
	import { trap, focusFirst } from '$utils/a11y/index.js';
	import Portal from '../../utility/portal/Portal.svelte';
	import DateRange, { type DateRangeValue } from '../date-range/DateRange.svelte';

	interface Props {
		start?: DateValue | null;
		end?: DateValue | null;
		open?: boolean;
		min?: DateValue;
		max?: DateValue;
		locale?: string;
		timeZone?: string;
		dateOptions?: Intl.DateTimeFormatOptions;
		placeholder?: string;
		separator?: string;
		disabled?: boolean;
		required?: boolean;
		closeOnSelect?: boolean;
		numberOfMonths?: 1 | 2;
		isDateDisabled?: (date: DateValue) => boolean;
		class?: string;
		inputClass?: string;
		popoverClass?: string;
		rangeClass?: string;
		monthsClass?: string;
		calendarClass?: string;
		headerClass?: string;
		gridClass?: string;
		weekdayClass?: string;
		dayClass?: string;
		monthClass?: string;
		yearClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		onChange?: (range: DateRangeValue) => void;
	}

	let {
		start = $bindable(null),
		end = $bindable(null),
		open = $bindable(false),
		min,
		max,
		locale,
		timeZone = getLocalTimeZone(),
		dateOptions = { year: 'numeric', month: 'short', day: 'numeric' },
		placeholder = 'Select range…',
		separator = '–',
		disabled = false,
		required = false,
		closeOnSelect = true,
		numberOfMonths = 2,
		isDateDisabled,
		class: className = '',
		inputClass = '',
		popoverClass = '',
		rangeClass = '',
		monthsClass = '',
		calendarClass = '',
		headerClass = '',
		gridClass = '',
		weekdayClass = '',
		dayClass = '',
		monthClass = '',
		yearClass = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		onChange
	}: Props = $props();

	const popId = generateCounterId('daterange-pop');

	let triggerEl = $state<HTMLButtonElement | null>(null);
	let popEl = $state<HTMLDivElement | null>(null);
	let viewDate = $state<DateValue>(start ?? iToday(getLocalTimeZone()));

	const resolvedLocale = $derived(
		locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
	);
	const fmt = $derived(new DateFormatter(resolvedLocale, dateOptions));
	const startLabel = $derived(start ? fmt.format(start.toDate(timeZone)) : '');
	const endLabel = $derived(end ? fmt.format(end.toDate(timeZone)) : '');

	function toggle() {
		if (disabled) return;
		open = !open;
		if (open && start) viewDate = start;
	}

	function onRangeChange(r: DateRangeValue) {
		onChange?.(r);
		if (closeOnSelect && r.start && r.end) {
			open = false;
			triggerEl?.focus();
		}
	}

	const popRef: Attachment<HTMLDivElement> = (node) => {
		popEl = node;
		let cleanup: (() => void) | undefined;
		if (triggerEl) {
			cleanup = autoUpdate(triggerEl, node, async () => {
				const { x, y } = await computePosition(triggerEl as HTMLButtonElement, node, {
					placement: 'bottom-start',
					strategy: 'fixed',
					middleware: [offset(4), flip(), shift({ padding: 8 })]
				});
				Object.assign(node.style, { left: `${x}px`, top: `${y}px` });
			});
		}
		const release = trap(node);
		focusFirst(node);
		return () => {
			cleanup?.();
			release();
			popEl = null;
		};
	};

	useEventListener(
		() => (open ? document : null),
		'pointerdown',
		(e) => {
			if (!popEl) return;
			const t = e.target as Node;
			if (popEl.contains(t) || triggerEl?.contains(t)) return;
			open = false;
			triggerEl?.focus();
		},
		{ capture: true }
	);

	useEventListener(
		() => (open ? document : null),
		'keydown',
		(e) => {
			if (e.key === 'Escape') {
				open = false;
				triggerEl?.focus();
			}
		}
	);

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		triggerEl = node;
		return () => {
			triggerEl = null;
		};
	};
</script>

<div class={className}>
	<button
		type="button"
		{disabled}
		aria-haspopup="dialog"
		aria-expanded={open}
		aria-controls={popId}
		data-required={required || undefined}
		aria-label={ariaLabel}
		aria-labelledby={ariaLabelledby}
		class={inputClass}
		onclick={toggle}
		{@attach triggerRef}
	>
		{#if start || end}
			<span>{startLabel || '…'} {separator} {endLabel || '…'}</span>
		{:else}
			<span data-placeholder>{placeholder}</span>
		{/if}
	</button>

	{#if open}
		<Portal>
			<div
				id={popId}
				role="dialog"
				aria-modal="true"
				aria-label={ariaLabel ?? 'Choose date range'}
				tabindex="-1"
				class={popoverClass}
				style="position:fixed; top:0; left:0;"
				{@attach popRef}
			>
				<DateRange
					bind:start
					bind:end
					bind:viewDate
					{min}
					{max}
					{locale}
					{timeZone}
					{numberOfMonths}
					{isDateDisabled}
					onChange={onRangeChange}
					class={rangeClass}
					{monthsClass}
					{calendarClass}
					{headerClass}
					{gridClass}
					{weekdayClass}
					{dayClass}
					{monthClass}
					{yearClass}
				/>
			</div>
		</Portal>
	{/if}
</div>
