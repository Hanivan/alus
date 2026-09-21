<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['span'], 'children'> & {
		children?: import('svelte').Snippet;
		position?: 'prefix' | 'suffix';
	};

	let { children, class: className = '', position = 'prefix', ...rest }: Props = $props();
</script>

<span {...rest} data-input-addon={position} class={className}>
	{#if children}{@render children()}{/if}
</span>
