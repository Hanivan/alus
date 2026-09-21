<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getCarouselContext } from './Carousel.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet;
		// Kept: the destructure default is the button's only accessible name.
		'aria-label'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel = 'Previous slide',
		...rest
	}: Props = $props();
	const ctx = getCarouselContext();
	const disabled = $derived(!ctx.loop() && ctx.index() === 0);
</script>

<button
	{...rest}
	type="button"
	class={className}
	aria-label={ariaLabel}
	aria-controls={ctx.slidesId}
	{disabled}
	onclick={() => ctx.prev()}
>
	{#if children}{@render children()}{/if}
</button>
