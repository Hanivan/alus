<script lang="ts">
	import { getAccordionRoot, setAccordionItem } from './context.js';

	interface Props {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		value: string;
		disabled?: boolean;
		class?: string;
	}

	let { children, value, disabled = false, class: className = '' }: Props = $props();

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
	class={className}
	data-state={open ? 'open' : 'closed'}
	data-disabled={disabled || root.disabled() || undefined}
>
	{#if children}{@render children({ open })}{/if}
</div>
