<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
	}

	let { children, class: className = '', 'aria-label': ariaLabel = 'Next slide' }: Props = $props();
	const ctx = getCarouselContext();
	const disabled = $derived(!ctx.loop() && ctx.index() >= ctx.count() - 1);
</script>

<button
	type="button"
	class={className}
	aria-label={ariaLabel}
	aria-controls={ctx.slidesId}
	{disabled}
	onclick={() => ctx.next()}
>
	{#if children}{@render children()}{/if}
</button>
