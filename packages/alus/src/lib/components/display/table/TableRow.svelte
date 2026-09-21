<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['tr'], 'children'> & {
		children?: import('svelte').Snippet;
		selected?: boolean;
	};
	let { children, class: className = '', selected, ...rest }: Props = $props();
</script>

<tr
	{...rest}
	class={className}
	aria-selected={selected || undefined}
	data-selected={selected || undefined}
>
	{#if children}{@render children()}{/if}
</tr>
