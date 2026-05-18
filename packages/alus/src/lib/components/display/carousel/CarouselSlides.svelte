<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		live?: 'polite' | 'off';
	}

	let { children, class: className = '', live = 'polite' }: Props = $props();
	const ctx = getCarouselContext();
</script>

<div id={ctx.slidesId} class={className} aria-live={live} aria-atomic="false">
	{#if children}{@render children()}{/if}
</div>
