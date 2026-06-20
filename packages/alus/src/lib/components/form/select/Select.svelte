<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus-ui:select');

	export interface SelectOptionEntry {
		value: unknown;
		el: HTMLElement;
		disabled: boolean;
	}

	export interface SelectContext {
		open: () => boolean;
		setOpen: (v: boolean) => void;
		value: () => unknown;
		setValue: (v: unknown) => void;
		multiple: () => boolean;
		disabled: () => boolean;
		highlighted: () => unknown;
		setHighlighted: (v: unknown) => void;
		triggerEl: { current: HTMLElement | null };
		setTriggerEl: (el: HTMLElement | null) => void;
		contentEl: { current: HTMLElement | null };
		setContentEl: (el: HTMLElement | null) => void;
		registerOption: (entry: SelectOptionEntry) => () => void;
		options: () => SelectOptionEntry[];
		toggleValue: (v: unknown) => void;
		isSelected: (v: unknown) => boolean;
		contentId: string;
		triggerId: string;
		labelId: () => string | undefined;
	}

	export function getSelectContext(): SelectContext {
		const ctx = getContext<SelectContext | undefined>(KEY);
		if (!ctx) throw new Error('Select subcomponent must be used inside <Select>');
		return ctx;
	}

	export function setSelectContext(ctx: SelectContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		value?: unknown;
		open?: boolean;
		multiple?: boolean;
		disabled?: boolean;
		name?: string;
		'aria-labelledby'?: string;
		onValueChange?: (value: unknown) => void;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		value = $bindable(),
		open = $bindable(false),
		multiple = false,
		disabled = false,
		name,
		'aria-labelledby': ariaLabelledby,
		onValueChange,
		onOpenChange
	}: Props = $props();

	let highlighted = $state<unknown>(undefined);
	let triggerEl = $state<HTMLElement | null>(null);
	let contentEl = $state<HTMLElement | null>(null);
	let opts: SelectOptionEntry[] = [];

	const triggerId = generateCounterId('select-trigger');
	const contentId = generateCounterId('select-content');

	function setValue(v: unknown) {
		value = v;
		onValueChange?.(v);
	}

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	function isSelected(v: unknown): boolean {
		if (multiple) return Array.isArray(value) && value.includes(v);
		return value === v;
	}

	function toggleValue(v: unknown) {
		if (multiple) {
			const arr = Array.isArray(value) ? [...value] : [];
			const i = arr.indexOf(v);
			if (i >= 0) arr.splice(i, 1);
			else arr.push(v);
			setValue(arr);
		} else {
			setValue(v);
			setOpen(false);
		}
	}

	setSelectContext({
		open: () => open,
		setOpen,
		value: () => value,
		setValue,
		multiple: () => multiple,
		disabled: () => disabled,
		highlighted: () => highlighted,
		setHighlighted: (v) => (highlighted = v),
		triggerEl: {
			get current() {
				return triggerEl;
			}
		},
		setTriggerEl: (el) => (triggerEl = el),
		contentEl: {
			get current() {
				return contentEl;
			}
		},
		setContentEl: (el) => (contentEl = el),
		registerOption: (entry) => {
			opts.push(entry);
			return () => {
				const i = opts.findIndex((o) => o.el === entry.el);
				if (i >= 0) opts.splice(i, 1);
			};
		},
		options: () => opts,
		toggleValue,
		isSelected,
		contentId,
		triggerId,
		labelId: () => ariaLabelledby
	});

	let hiddenValues = $derived.by(() => {
		if (!name) return [];
		if (multiple && Array.isArray(value)) return value.map(String);
		if (value !== undefined && value !== null) return [String(value)];
		return [];
	});
</script>

{#each hiddenValues as v, i (i)}
	<input type="hidden" {name} value={v} />
{/each}

{#if children}{@render children()}{/if}
