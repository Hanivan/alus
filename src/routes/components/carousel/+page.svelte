<script lang="ts">
	import { CaretLeft, CaretRight, ArrowLeft, ArrowRight } from 'phosphor-svelte';
	import {
		Carousel,
		CarouselSlides,
		CarouselSlide,
		CarouselPrev,
		CarouselNext,
		CarouselIndicators
	} from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Carousel bind:index loop autoplay={3000} aria-label="Four seasons">
	<CarouselSlides>
		{#each slides as s, i}
			<CarouselSlide index={i}>{s.kanji}</CarouselSlide>
		{/each}
	</CarouselSlides>
	<CarouselPrev>‹</CarouselPrev>
	<CarouselIndicators aria-label="Choose season">
		{#snippet item({ active })}
			<span class:active />
		{/snippet}
	</CarouselIndicators>
	<CarouselNext>›</CarouselNext>
</Carousel>`;

	const slides = [
		{ kanji: '春', en: 'Spring', cherry: '🌸', bg: 'var(--cherry-blossom)' },
		{ kanji: '夏', en: 'Summer', cherry: '🍃', bg: 'var(--matcha)' },
		{ kanji: '秋', en: 'Autumn', cherry: '🍁', bg: 'var(--muted-gold)' },
		{ kanji: '冬', en: 'Winter', cherry: '❄', bg: 'var(--indigo-dye)' }
	];

	let index = $state(0);
</script>

<svelte:head>
	<title>Carousel · Alus Components</title>
</svelte:head>

<a
	href="/"
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">輪</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Carousel</h1>
				<p class="tracking-widest text-(--bamboo)">回転</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Slide carousel with prev/next, indicators, and loop option. role=region with
			aria-roledescription="carousel".
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Four seasons</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Carousel bind:index loop autoplay={3000} aria-label="Four seasons" class="relative">
				<CarouselSlides class="relative h-64 overflow-hidden rounded">
					{#each slides as s, i (i)}
						<CarouselSlide index={i} class="absolute inset-0 flex items-center justify-center">
							<div
								class="flex h-full w-full flex-col items-center justify-center text-center text-white"
								style="background:{s.bg};"
							>
								<div class="font-display mb-2 text-7xl">{s.kanji}</div>
								<div class="text-2xl">{s.cherry} {s.en}</div>
							</div>
						</CarouselSlide>
					{/each}
				</CarouselSlides>

				<div class="mt-6 flex items-center justify-between">
					<CarouselPrev
						class="flex h-10 w-10 items-center justify-center rounded-full border border-(--indigo-dye) text-(--indigo-dye) hover:bg-(--indigo-dye) hover:text-white disabled:opacity-30"
					>
						<ArrowLeft class="h-5 w-5" />
					</CarouselPrev>

					<CarouselIndicators class="flex gap-2" aria-label="Choose season">
						{#snippet item({ active })}
							<span
								class="block h-2 w-8 rounded transition-colors"
								style={active ? 'background:var(--vermilion);' : 'background:rgba(45,45,45,0.2);'}
							></span>
						{/snippet}
					</CarouselIndicators>

					<CarouselNext
						class="flex h-10 w-10 items-center justify-center rounded-full border border-(--indigo-dye) text-(--indigo-dye) hover:bg-(--indigo-dye) hover:text-white disabled:opacity-30"
					>
						<ArrowRight class="h-5 w-5" />
					</CarouselNext>
				</div>
			</Carousel>

			<p class="mt-4 text-sm text-(--charcoal)/60">
				Current: <code>{index + 1}</code> of <code>{slides.length}</code>
				<CaretRight class="inline h-3 w-3" /> Autoplay 3s — pauses on hover/focus
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'index', type: 'number', default: '0', description: 'Bindable active slide' },
			{ name: 'loop', type: 'boolean', default: 'false' },
			{
				name: 'autoplay',
				type: 'number',
				default: '0',
				description: 'ms between slides; 0 disables'
			},
			{
				name: 'aria-label',
				type: 'string',
				default: 'required',
				description: 'Names the carousel region'
			},
			{
				name: 'index',
				type: 'number',
				default: 'required',
				description: '<code>CarouselSlide</code>'
			}
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="region"</code> + <code class="rounded bg-(--cream) px-1">aria-roledescription="carousel"</code>',
			'Each slide has <code class="rounded bg-(--cream) px-1">aria-roledescription="slide"</code> + <code class="rounded bg-(--cream) px-1">aria-label="N of total"</code>',
			'Autoplay pauses on hover / focus + honours <code class="rounded bg-(--cream) px-1">prefers-reduced-motion</code>',
			'Prev / Next are real buttons; indicators are <code>role="tab"</code> with <code>aria-selected</code>'
		]}
	/>
</main>
