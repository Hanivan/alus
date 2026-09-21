<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['tfoot'], 'children'> & {
		children?: import('svelte').Snippet;
	};
	let { children, class: className = '', ...rest }: Props = $props();
</script>

<tfoot {...rest} class={className}>
	{#if children}{@render children()}{/if}
</tfoot>
