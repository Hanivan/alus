<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['span'], 'children'> & {
		children?: import('svelte').Snippet;
	};

	let { children, class: className = '', ...rest }: Props = $props();
</script>

<span {...rest} aria-hidden="true" class={className}>
	{#if children}{@render children()}{:else}/{/if}
</span>
