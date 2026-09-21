<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getAccordionRoot, setAccordionItem } from './context.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		value: string;
		disabled?: boolean;
	};

	let { children, value, disabled = false, class: className = '', ...rest }: Props = $props();

	const root = getAccordionRoot();

	setAccordionItem({
		get value() {
			return value;
		},
		disabled: () => disabled || root.disabled(),
		open: () => root.isOpen(value),
		get triggerId() {
			return `${root.baseId}-trigger-${value}`;
		},
		get contentId() {
			return `${root.baseId}-content-${value}`;
		}
	});

	let open = $derived(root.isOpen(value));
</script>

<div
	{...rest}
	class={className}
	data-state={open ? 'open' : 'closed'}
	data-disabled={disabled || root.disabled() || undefined}
>
	{#if children}{@render children({ open })}{/if}
</div>
