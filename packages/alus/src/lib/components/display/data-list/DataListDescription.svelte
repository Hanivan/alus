<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['dd'], 'children'> & {
		children?: import('svelte').Snippet;
	};

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<dd {...rest} class={className}>
	{#if children}{@render children()}{/if}
</dd>
