<script lang="ts">
	import { untrack } from 'svelte';
	import { getCarouselContext } from './Carousel.svelte';

	interface Props {
		index: number;
		children?: import('svelte').Snippet<[{ active: boolean }]>;
		class?: string;
		label?: string;
	}

	let { index, children, class: className = '', label }: Props = $props();

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
