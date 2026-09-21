<script lang="ts">
	import { untrack } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getModalContext } from './Modal.svelte';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		children?: import('svelte').Snippet;
		as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	};

	let { children, class: className = '', as = 'h2', ...rest }: Props = $props();

	const ctx = getModalContext();

	$effect(() => {
		return untrack(() => {
			ctx.setHasTitle(true);
			return () => ctx.setHasTitle(false);
		});
	});
</script>

<svelte:element this={as} {...rest} id={ctx.titleId} class={className}>
	{#if children}{@render children()}{/if}
</svelte:element>
