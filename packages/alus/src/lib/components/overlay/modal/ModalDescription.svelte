<script lang="ts">
	import { getModalContext } from './Modal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();

	const ctx = getModalContext();

	$effect(() => {
		ctx.setHasDescription(true);
		return () => ctx.setHasDescription(false);
	});
</script>

<p id={ctx.descriptionId} class={className}>
	{#if children}{@render children()}{/if}
</p>
