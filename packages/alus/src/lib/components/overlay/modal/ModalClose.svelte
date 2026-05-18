<script lang="ts">
	import { getModalContext } from './Modal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel = 'Close'
	}: Props = $props();

	const ctx = getModalContext();
</script>

<button type="button" class={className} aria-label={ariaLabel} onclick={() => ctx.setOpen(false)}>
	{#if children}{@render children()}{/if}
</button>
