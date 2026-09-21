<script lang="ts">
	import { untrack } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getCarouselContext } from './Carousel.svelte';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		index: number;
		children?: import('svelte').Snippet<[{ active: boolean }]>;
		// Kept: the markup computes the slide's accessible name from it.
		label?: string;
	};

	let { index, children, class: className = '', label, ...rest }: Props = $props();

	const ctx = getCarouselContext();
	const active = $derived(ctx.index() === index);

	$effect(() => {
		return untrack(() => {
			const reg = ctx.registerSlide();
			return reg.unregister;
		});
	});
</script>

<div
	{...rest}
	role="group"
	aria-roledescription="slide"
	aria-label={label ?? `Slide ${index + 1} of ${ctx.count()}`}
	aria-hidden={!active}
	hidden={!active || undefined}
	data-active={active || undefined}
	class={className}
>
	{#if children}{@render children({ active })}{/if}
</div>
