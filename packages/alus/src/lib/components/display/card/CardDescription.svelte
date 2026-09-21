<script lang="ts">
	import { untrack } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getCardContext } from './Card.svelte';

	type Props = Omit<SvelteHTMLElements['p'], 'children'> & {
		children?: import('svelte').Snippet;
	};

	let { children, class: className = '', ...rest }: Props = $props();

	const ctx = getCardContext();

	$effect(() => {
		return untrack(() => {
			ctx.setHasDescription(true);
			return () => ctx.setHasDescription(false);
		});
	});
</script>

<p {...rest} id={ctx.descriptionId} class={className}>
	{#if children}{@render children()}{/if}
</p>
