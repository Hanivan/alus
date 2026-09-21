<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getCommandMenuContext } from './CommandMenu.svelte';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
	};

	let { children, class: className = '', ...rest }: Props = $props();
	const ctx = getCommandMenuContext();
	const empty = $derived(ctx.query().trim() !== '' && ctx.filteredItems().length === 0);
</script>

{#if empty}
	<div {...rest} role="status" aria-live="polite" class={className}>
		{#if children}{@render children()}{/if}
	</div>
{/if}
