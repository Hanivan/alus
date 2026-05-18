<script lang="ts">
	import { untrack } from 'svelte';
	import { getCardContext } from './Card.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();

	const ctx = getCardContext();

	$effect(() => {
		return untrack(() => {
			ctx.setHasDescription(true);
			return () => ctx.setHasDescription(false);
		});
	});
</script>

<p id={ctx.descriptionId} class={className}>
	{#if children}{@render children()}{/if}
</p>
