<script lang="ts">
	import { CaretLeft, Star } from 'phosphor-svelte';
	import { Rating } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Rating } from 'alus';
	let score = $state(3);
<\/script>

<Rating bind:value={score} max={5} aria-label="Quality rating" />`;

	let val = $state(3);
	let preview = $state(3);
</script>

<svelte:head>
	<title>Rating · Alus Components</title>
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
			<div class="hanko-seal">星</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Rating</h1>
				<p class="tracking-widest text-(--bamboo)">評価</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Star rating with keyboard nav (arrows, Home, End) and aria-valuetext.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-6 bg-white/50 p-8 backdrop-blur-sm">
			<div>
				<p class="mb-3 text-sm text-(--charcoal)/60">
					Interactive — value: <code>{val}</code>
					{#if preview !== val}<span class="text-(--vermilion)"> · preview: {preview}</span>{/if}
				</p>
				<Rating
					bind:value={val}
					onHoverChange={(d) => (preview = d)}
					aria-label="Rate this item"
					class="inline-flex gap-1 outline-none focus-visible:ring-2 focus-visible:ring-(--vermilion)"
				>
					{#snippet item({ filled })}
						<Star
							class="h-8 w-8 transition-colors"
							weight={filled ? 'fill' : 'regular'}
							style="color:{filled ? 'var(--vermilion)' : 'var(--charcoal)'};opacity:{filled
								? 1
								: 0.3};"
						/>
					{/snippet}
				</Rating>
			</div>

			<div>
				<p class="mb-3 text-sm text-(--charcoal)/60">Readonly (4/5)</p>
				<Rating value={4} readonly class="inline-flex gap-1">
					{#snippet item({ filled })}
						<Star
							class="h-6 w-6"
							weight={filled ? 'fill' : 'regular'}
							style="color:{filled ? 'var(--vermilion)' : 'var(--charcoal)'};opacity:{filled
								? 1
								: 0.3};"
						/>
					{/snippet}
				</Rating>
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'number', default: '0', description: 'Bindable' },
			{ name: 'max', type: 'number', default: '5' },
			{ name: 'readonly', type: 'boolean', default: 'false' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'name', type: 'string', default: 'undefined' },
			{
				name: 'item',
				type: 'Snippet<[{ index; filled; displayed; value; max }]>',
				default: 'undefined'
			},
			{ name: 'onValueChange', type: '(v: number) => void', default: 'undefined' },
			{ name: 'onHoverChange', type: '(displayed: number) => void', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="radiogroup"</code> with hidden radios per star',
			'Arrow keys + digits set value, Home/End jump to min/max',
			'<code class="rounded bg-(--cream) px-1">aria-valuetext</code> announces "3 out of 5 stars"',
			'Readonly mode disables interaction without disabling focus'
		]}
	/>
</main>
