<script lang="ts">
	import { untrack } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { setAccordionRoot, type AccordionType } from './context.js';
	import { generateCounterId } from '$utils/a11y/id.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		type?: AccordionType;
		value?: string[];
		collapsible?: boolean;
		disabled?: boolean;
		// `id` is read once (under `untrack`) to seed `baseId`, so it is referenced outside the
		// destructure and stays declared — `rest` must not also carry it.
		id?: string;
		onValueChange?: (v: string[]) => void;
	};

	let {
		children,
		type = 'single',
		value = $bindable([]),
		collapsible = true,
		disabled = false,
		class: className = '',
		id,
		onValueChange,
		...rest
	}: Props = $props();

	const baseId = untrack(() => id ?? generateCounterId('accordion'));

	function setValue(v: string[]) {
		value = v;
		onValueChange?.(v);
	}

	function toggle(v: string) {
		if (disabled) return;
		const isOpen = value.includes(v);
		if (type === 'single') {
			if (isOpen) {
				if (collapsible) setValue([]);
			} else {
				setValue([v]);
			}
		} else {
			setValue(isOpen ? value.filter((x) => x !== v) : [...value, v]);
		}
	}

	setAccordionRoot({
		type: () => type,
		value: () => value,
		toggle,
		isOpen: (v: string) => value.includes(v),
		collapsible: () => collapsible,
		baseId,
		disabled: () => disabled
	});
</script>

<div {...rest} class={className} data-accordion-root={baseId} data-disabled={disabled || undefined}>
	{#if children}{@render children()}{/if}
</div>
