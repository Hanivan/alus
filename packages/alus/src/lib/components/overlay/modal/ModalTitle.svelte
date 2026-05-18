<script lang="ts">
	import { onMount } from 'svelte';
	import { getModalContext } from './Modal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	}

	let { children, class: className = '', as = 'h2' }: Props = $props();

	const ctx = getModalContext();

	onMount(() => {
		ctx.setHasTitle(true);
		return () => ctx.setHasTitle(false);
	});
</script>

<svelte:element this={as} id={ctx.titleId} class={className}>
	{#if children}{@render children()}{/if}
</svelte:element>
