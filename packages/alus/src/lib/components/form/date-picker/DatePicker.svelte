<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom';
	import { DateFormatter, getLocalTimeZone, today as iToday, type DateValue } from '@internationalized/date';
	import { generateCounterId } from '$utils/a11y/id.js';
	import Portal from '../../utility/portal/Portal.svelte';
	import Calendar from '../calendar/Calendar.svelte';

	interface Props {
		value?: DateValue | null;
		open?: boolean;
		min?: DateValue;
		max?: DateValue;
		locale?: string;
		timeZone?: string;
		dateOptions?: Intl.DateTimeFormatOptions;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		closeOnSelect?: boolean;
		isDateDisabled?: (date: DateValue) => boolean;
		class?: string;
		inputClass?: string;
		popoverClass?: string;
		calendarClass?: string;
		headerClass?: string;
		gridClass?: string;
		weekdayClass?: string;
		dayClass?: string;
		monthClass?: string;
		yearClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		onSelect?: (date: DateValue) => void;
	}

	let {
		value = $bindable(null),
		open = $bindable(false),
		min,
		max,
		locale,
		timeZone = getLocalTimeZone(),
		dateOptions = { year: 'numeric', month: 'short', day: 'numeric' },
		placeholder = 'Select date…',
		disabled = false,
		required = false,
		closeOnSelect = true,
		isDateDisabled,
		class: className = '',
		inputClass = '',
		popoverClass = '',
		calendarClass = '',
		headerClass = '',
		gridClass = '',
		weekdayClass = '',
		dayClass = '',
		monthClass = '',
		yearClass = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		onSelect
	}: Props = $props();

	const popId = generateCounterId('datepicker-pop');

	let triggerEl = $state<HTMLButtonElement | null>(null);
	let viewDate = $state<DateValue>(value ?? iToday(getLocalTimeZone()));
	let view = $state<'days' | 'months' | 'years'>('days');

	const resolvedLocale = $derived(
		locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
	);
	const fmt = $derived(new DateFormatter(resolvedLocale, dateOptions));
	const display = $derived(value ? fmt.format(value.toDate(timeZone)) : '');

	function toggle() {
		if (disabled) return;
		open = !open;
		if (open) {
			if (value) viewDate = value;
			view = 'days';
		}
	}

	function onPick(d: DateValue) {
		value = d;
		onSelect?.(d);
		if (closeOnSelect) {
			open = false;
			triggerEl?.focus();
		}
	}

	const popRef: Attachment<HTMLDivElement> = (node) => {
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
		function onDown(e: PointerEvent) {
			const t = e.target as Node;
			if (node.contains(t) || triggerEl?.contains(t)) return;
			open = false;
		}
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				open = false;
				triggerEl?.focus();
			}
		}
		document.addEventListener('pointerdown', onDown, true);
		document.addEventListener('keydown', onKey);
		return () => {
			cleanup?.();
			document.removeEventListener('pointerdown', onDown, true);
			document.removeEventListener('keydown', onKey);
		};
	};

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
		{#if display}
			<span>{display}</span>
		{:else}
			<span data-placeholder>{placeholder}</span>
		{/if}
	</button>

	{#if open}
		<Portal>
			<div
				id={popId}
				role="dialog"
				aria-label={ariaLabel ?? 'Choose date'}
				class={popoverClass}
				style="position:fixed; top:0; left:0;"
				{@attach popRef}
			>
				<Calendar
					bind:value
					bind:viewDate
					bind:view
					{min}
					{max}
					{locale}
					{timeZone}
					{isDateDisabled}
					onSelect={onPick}
					class={calendarClass}
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
