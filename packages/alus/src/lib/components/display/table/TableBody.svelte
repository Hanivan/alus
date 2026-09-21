<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['tbody'], 'children'> & {
		children?: import('svelte').Snippet;
	};
	let { children, class: className = '', ...rest }: Props = $props();
</script>

<tbody {...rest} class={className}>
	{#if children}{@render children()}{/if}
</tbody>
