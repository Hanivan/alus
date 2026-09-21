<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLLiAttributes, 'children'> {
		children?: import('svelte').Snippet;
	}

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<li {...rest} role="listitem" class={className}>
	{#if children}{@render children()}{/if}
</li>
