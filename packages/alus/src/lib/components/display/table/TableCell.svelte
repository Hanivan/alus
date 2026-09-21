<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['td'], 'children'> & {
		children?: import('svelte').Snippet;
	};
	let { children, class: className = '', ...rest }: Props = $props();
</script>

<td {...rest} class={className}>
	{#if children}{@render children()}{/if}
</td>
