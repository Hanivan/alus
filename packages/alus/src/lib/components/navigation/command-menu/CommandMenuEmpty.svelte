<script lang="ts">
	import { getCommandMenuContext } from './CommandMenu.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
	const ctx = getCommandMenuContext();
	const empty = $derived(ctx.query().trim() !== '' && ctx.filteredItems().length === 0);
</script>

{#if empty}
	<div role="presentation" class={className}>
		{#if children}{@render children()}{/if}
	</div>
{/if}
