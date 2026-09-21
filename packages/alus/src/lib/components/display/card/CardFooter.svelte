<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['footer'], 'children'> & {
		children?: import('svelte').Snippet;
	};

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<footer {...rest} class={className}>
	{#if children}{@render children()}{/if}
</footer>
