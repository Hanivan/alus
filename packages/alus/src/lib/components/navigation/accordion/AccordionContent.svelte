<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getAccordionItem } from './context.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		// Read by the `{#if open || forceMount}` markup — rule 3.
		forceMount?: boolean;
	};

	let { children, class: className = '', forceMount = false, ...rest }: Props = $props();

	const item = getAccordionItem();
	let open = $derived(item.open());
</script>

{#if open || forceMount}
	<div
		{...rest}
		id={item.contentId}
		role="region"
		aria-labelledby={item.triggerId}
		hidden={!open}
		data-state={open ? 'open' : 'closed'}
		class={className}
	>
		{#if children}{@render children()}{/if}
	</div>
{/if}
