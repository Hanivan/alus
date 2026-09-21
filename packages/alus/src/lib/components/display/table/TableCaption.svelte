<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['caption'], 'children'> & {
		children?: import('svelte').Snippet;
		side?: 'top' | 'bottom';
		style?: string;
	};

	let {
		children,
		class: className = '',
		side = 'top',
		style: extraStyle = '',
		...rest
	}: Props = $props();
</script>

<!-- The host writes its own `style`, so a consumer's `style` is appended rather than dropped:
     `{...rest}` goes first, which would otherwise discard it silently. No `|| undefined` guard
     here: the base is the non-empty literal `caption-side:{side};`, so it can never emit `""`. -->
<caption {...rest} class={className} style="caption-side:{side};{extraStyle}">
	{#if children}{@render children()}{/if}
</caption>
