<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		ratio?: number;
		innerClass?: string;
		style?: string;
	};

	let {
		children,
		ratio = 1,
		class: className = '',
		innerClass = '',
		style: extraStyle = '',
		...rest
	}: Props = $props();

	// The host writes its own `style`, so a consumer's `style` must be appended rather than
	// dropped: `{...rest}` goes first, which would otherwise discard it silently.
	const containerStyle = $derived(`aspect-ratio:${ratio};${extraStyle}`);
</script>

<div {...rest} class={className} style={containerStyle} data-aspect-ratio={ratio}>
	<div class={innerClass} style="width:100%;height:100%;">
		{#if children}{@render children()}{/if}
	</div>
</div>
