<script lang="ts">
	import { untrack } from 'svelte';
	import { getModalContext } from './Modal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();

	const ctx = getModalContext();

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
