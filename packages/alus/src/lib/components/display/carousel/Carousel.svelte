<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus-ui:carousel');

	export interface CarouselContext {
		index: () => number;
		setIndex: (i: number) => void;
		count: () => number;
		registerSlide: () => { id: number; unregister: () => void };
		next: () => void;
		prev: () => void;
		goTo: (i: number) => void;
		loop: () => boolean;
		slidesId: string;
	}

	export function getCarouselContext(): CarouselContext {
		const ctx = getContext<CarouselContext | undefined>(KEY);
		if (!ctx) throw new Error('Carousel subcomponent must be inside <Carousel>');
		return ctx;
	}

	export function setCarouselContext(ctx: CarouselContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		index?: number;
		loop?: boolean;
		autoplay?: boolean | number;
		pauseOnHover?: boolean;
		onIndexChange?: (i: number) => void;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		class: className = '',
		index = $bindable(0),
		loop = false,
		autoplay = false,
		pauseOnHover = true,
		onIndexChange,
		'aria-label': ariaLabel = 'Carousel',
		'aria-labelledby': ariaLabelledby
	}: Props = $props();

	let count = $state(0);
	let nextId = 0;
	let paused = $state(false);
	const slidesId = generateCounterId('carousel-slides');
	const interval = $derived(typeof autoplay === 'number' ? autoplay : autoplay ? 4000 : 0);

	function setIndex(i: number) {
		index = i;
		onIndexChange?.(i);
	}

	function clamp(i: number): number {
		if (count === 0) return 0;
		if (loop) return ((i % count) + count) % count;
		return Math.max(0, Math.min(count - 1, i));
	}

	setCarouselContext({
		index: () => index,
		setIndex: (i) => setIndex(clamp(i)),
		count: () => count,
		registerSlide: () => {
			const id = nextId++;
			count++;
			return {
				id,
				unregister: () => {
					count = Math.max(0, count - 1);
				}
			};
		},
		next: () => setIndex(clamp(index + 1)),
		prev: () => setIndex(clamp(index - 1)),
		goTo: (i) => setIndex(clamp(i)),
		loop: () => loop,
		slidesId
	});

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }))
	);

	$effect(() => {
		if (interval <= 0 || count < 2 || paused) return;
		const id = setInterval(() => {
			if (typeof document !== 'undefined' && document.hidden) return;
			const cur = index;
			const next = cur + 1;
			if (next >= count && !loop) return;
			setIndex(clamp(next));
		}, interval);
		return () => clearInterval(id);
	});

	function onEnter() {
		if (pauseOnHover) paused = true;
	}
	function onLeave() {
		if (pauseOnHover) paused = false;
	}
</script>

<section
	aria-roledescription="carousel"
	class={className}
	onpointerenter={onEnter}
	onpointerleave={onLeave}
	onfocusin={onEnter}
	onfocusout={onLeave}
	{...ariaAttrs}
>
	{#if children}{@render children()}{/if}
</section>
