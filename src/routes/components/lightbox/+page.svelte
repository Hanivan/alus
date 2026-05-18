<script lang="ts">
	import { CaretLeft, X, CaretLeft as Prev, CaretRight as Next } from 'phosphor-svelte';
	import { Lightbox, type LightboxImage } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Lightbox, type LightboxImage } from 'alus';
	const images: LightboxImage[] = [
		{ src: '/a.jpg', alt: 'First' },
		{ src: '/b.jpg', alt: 'Second' }
	];
	let open = $state(false);
	let index = $state(0);
<\/script>

<Lightbox {images} bind:open bind:index />`;

	const images: LightboxImage[] = [
		{
			src: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1200',
			alt: 'Kyoto temple',
			caption: 'Kyoto · 京都'
		},
		{
			src: 'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=1200',
			alt: 'Mount Fuji',
			caption: 'Mount Fuji · 富士山'
		},
		{
			src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200',
			alt: 'Tokyo street',
			caption: 'Tokyo · 東京'
		}
	];

	let open = $state(false);
	let index = $state(0);

	function openAt(i: number) {
		index = i;
		open = true;
	}
</script>

<svelte:head>
	<title>Lightbox · Alus Components</title>
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
			<div class="hanko-seal">写</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Lightbox</h1>
				<p class="tracking-widest text-(--bamboo)">写真</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Image overlay viewer with prev / next, keyboard arrows, Escape to close, optional loop.
		</p>
	</header>

	<section class="mb-16">
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="grid grid-cols-3 gap-2">
				{#each images as img, i}
					<button
						class="overflow-hidden rounded border border-(--charcoal)/15"
						onclick={() => openAt(i)}
					>
						<img src={img.src} alt={img.alt} class="h-32 w-full object-cover" />
					</button>
				{/each}
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'images', type: 'LightboxImage[]', default: '[]' },
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'index', type: 'number', default: '0', description: 'Bindable current image' },
			{ name: 'loop', type: 'boolean', default: 'true' },
			{ name: 'controls', type: 'Snippet', default: 'undefined', description: 'Custom prev/next UI' },
			{ name: 'caption', type: 'Snippet<[{ image, index }]>', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="dialog"</code> + <code class="rounded bg-(--cream) px-1">aria-modal="true"</code>',
			'Focus trap + Escape close',
			'ArrowLeft / ArrowRight navigate between images',
			'<code class="rounded bg-(--cream) px-1">aria-live="polite"</code> announces image change',
			'Each image renders as <code class="rounded bg-(--cream) px-1">&lt;figure&gt;</code> with <code class="rounded bg-(--cream) px-1">&lt;figcaption&gt;</code>'
		]}
	/>
</main>

<Lightbox
	{images}
	bind:open
	bind:index
	backdropClass="fixed inset-0 z-50 flex items-center justify-center bg-(--ink)/90 p-8"
	class="relative max-h-full max-w-4xl text-white"
	imageClass="max-h-[70vh] w-auto rounded shadow-2xl"
>
	{#snippet caption({ image, index, total })}
		<span class="mt-3 block text-center text-sm text-white/80">
			{image.caption} · {index + 1} / {total}
		</span>
	{/snippet}
	{#snippet controls({ prev, next, close, hasPrev, hasNext })}
		<button
			aria-label="Close"
			onclick={close}
			class="absolute top-2 right-2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
		>
			<X class="h-5 w-5" />
		</button>
		<button
			aria-label="Previous"
			disabled={!hasPrev}
			onclick={prev}
			class="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-30"
		>
			<Prev class="h-6 w-6" />
		</button>
		<button
			aria-label="Next"
			disabled={!hasNext}
			onclick={next}
			class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 disabled:opacity-30"
		>
			<Next class="h-6 w-6" />
		</button>
	{/snippet}
</Lightbox>
