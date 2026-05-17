<script lang="ts">
	import { getAccordionItem } from './context.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		forceMount?: boolean;
	}

	let { children, class: className = '', forceMount = false }: Props = $props();

	const item = getAccordionItem();
	let open = $derived(item.open());
</script>

{#if open || forceMount}
	<div
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
