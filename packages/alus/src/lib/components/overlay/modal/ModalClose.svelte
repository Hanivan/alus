<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getModalContext } from './Modal.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet;
		'aria-label'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel = 'Close',
		...rest
	}: Props = $props();

	const ctx = getModalContext();
</script>

<button
	{...rest}
	type="button"
	class={className}
	aria-label={ariaLabel}
	onclick={() => ctx.setOpen(false)}
>
	{#if children}{@render children()}{/if}
</button>
