<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getCarouselContext } from './Carousel.svelte';
	import { VisuallyHidden } from '$components/utility/visually-hidden/index.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		live?: 'polite' | 'off';
	};

	let { children, class: className = '', live = 'polite', ...rest }: Props = $props();
	const ctx = getCarouselContext();
</script>

<VisuallyHidden as="div">
	<span aria-live="polite" aria-atomic="true">
		Slide {ctx.index() + 1} of {ctx.count()}
	</span>
</VisuallyHidden>

<div {...rest} id={ctx.slidesId} class={className} aria-live={live} aria-atomic="false">
	{#if children}{@render children()}{/if}
</div>
