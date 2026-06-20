<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';
	import { VisuallyHidden } from '$components/utility/visually-hidden/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		live?: 'polite' | 'off';
	}

	let { children, class: className = '', live = 'polite' }: Props = $props();
	const ctx = getCarouselContext();
</script>

<VisuallyHidden as="div">
	<span aria-live="polite" aria-atomic="true">
		Slide {ctx.index() + 1} of {ctx.count()}
	</span>
</VisuallyHidden>

<div id={ctx.slidesId} class={className} aria-live={live} aria-atomic="false">
	{#if children}{@render children()}{/if}
</div>
