<script lang="ts">
	import { CaretLeft, ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from 'phosphor-svelte';
	import { Swipeable, type SwipeDirection } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';
	import { resolve } from '$app/paths';

	const code = `<Swipeable
	onSwipe={(d) => handle(d)}
	onSwipeMove={({ dx }) => (dragX = dx)}
	threshold={50}
	preventScroll
>
	<div style="transform:translateX({dragX}px)">…</div>
</Swipeable>`;

	let lastDirection = $state<SwipeDirection | null>(null);
	let dragX = $state(0);
	let cardIndex = $state(0);

	const cards = [
		{ kanji: '一', en: 'One' },
		{ kanji: '二', en: 'Two' },
		{ kanji: '三', en: 'Three' },
		{ kanji: '四', en: 'Four' }
	];

	function dirArrow(d: SwipeDirection | null) {
		return d;
	}
</script>

<svelte:head>
	<title>Swipeable · Alus Components</title>
</svelte:head>

<a
	href={resolve('/')}
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">掃</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Swipeable</h1>
				<p class="tracking-widest text-(--bamboo)">滑動</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Pointer swipe handler. Reports direction on threshold or velocity. Live drag info during
			gesture.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Detect direction</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Swipeable
				class="flex h-64 items-center justify-center rounded border border-dashed border-(--charcoal)/30 bg-white/60 text-center select-none"
				onSwipe={(d) => (lastDirection = d)}
			>
				<div class="flex flex-col items-center gap-2">
					<p class="text-sm text-(--charcoal)/60">Swipe anywhere inside this box</p>
					<p class="font-display text-3xl text-(--ink)">
						{#if lastDirection === 'left'}
							<ArrowLeft class="inline h-8 w-8" /> Left
						{:else if lastDirection === 'right'}
							<ArrowRight class="inline h-8 w-8" /> Right
						{:else if lastDirection === 'up'}
							<ArrowUp class="inline h-8 w-8" /> Up
						{:else if lastDirection === 'down'}
							<ArrowDown class="inline h-8 w-8" /> Down
						{:else}
							—
						{/if}
					</p>
				</div>
			</Swipeable>
		</div>

		<p class="mt-4 font-mono text-sm text-(--charcoal)/60">
			last: {dirArrow(lastDirection) ?? 'none'}
		</p>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Card stack — swipe through</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Swipeable
				class="relative h-72 touch-none overflow-hidden rounded select-none"
				onSwipeMove={({ dx }) => (dragX = dx)}
				onSwipeEnd={({ direction }) => {
					dragX = 0;
					if (direction === 'left') cardIndex = Math.min(cards.length - 1, cardIndex + 1);
					else if (direction === 'right') cardIndex = Math.max(0, cardIndex - 1);
				}}
				preventScroll
			>
				<div
					class="absolute inset-0 flex items-center justify-center"
					style={`transform:translateX(${dragX}px);transition:${dragX === 0 ? 'transform 220ms ease' : 'none'};`}
				>
					<div
						class="font-display flex h-56 w-56 flex-col items-center justify-center gap-3 rounded-lg bg-(--cherry-blossom) text-(--ink) shadow-lg"
					>
						<span class="text-7xl">{cards[cardIndex].kanji}</span>
						<span class="text-sm tracking-widest text-(--bamboo)">{cards[cardIndex].en}</span>
					</div>
				</div>
			</Swipeable>
		</div>

		<p class="mt-4 font-mono text-sm text-(--charcoal)/60">
			card: {cardIndex + 1} / {cards.length} · drag dx: {Math.round(dragX)}px
		</p>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'onSwipe',
				type: '(direction) => void',
				default: 'undefined',
				description: 'Fires once on threshold cross'
			},
			{ name: 'onSwipeStart', type: '(e) => void', default: 'undefined' },
			{ name: 'onSwipeMove', type: '({ dx, dy }) => void', default: 'undefined' },
			{
				name: 'onSwipeEnd',
				type: '({ direction, dx, dy, velocity }) => void',
				default: 'undefined'
			},
			{ name: 'threshold', type: 'number', default: '50', description: 'Min px to fire onSwipe' },
			{ name: 'preventScroll', type: 'boolean', default: 'false' }
		]}
		a11y={[
			'Pointer-only gesture — pair with visible buttons or keyboard handlers for parity',
			'Set <code class="rounded bg-(--cream) px-1">aria-label</code> on the swipe surface so SR users know what it does',
			'Announce post-swipe state changes via a live region (e.g. "moved to card 2")',
			'<code>preventScroll</code> blocks native page scroll while dragging — use only when intent is clear'
		]}
	/>
</main>
