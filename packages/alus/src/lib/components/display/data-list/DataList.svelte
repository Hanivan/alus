<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['dl'], 'children'> & {
		children?: import('svelte').Snippet;
	};

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<dl {...rest} class={className}>
	{#if children}{@render children()}{/if}
</dl>
