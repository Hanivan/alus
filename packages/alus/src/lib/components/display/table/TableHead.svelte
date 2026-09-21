<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['thead'], 'children'> & {
		children?: import('svelte').Snippet;
	};
	let { children, class: className = '', ...rest }: Props = $props();
</script>

<thead {...rest} class={className}>
	{#if children}{@render children()}{/if}
</thead>
