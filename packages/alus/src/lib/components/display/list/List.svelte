<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		children?: import('svelte').Snippet;
		as?: 'ul' | 'ol';
	};

	let { children, class: className = '', as = 'ul', ...rest }: Props = $props();
</script>

<svelte:element this={as} {...rest} role="list" class={className}>
	{#if children}{@render children()}{/if}
</svelte:element>
