<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { AspectRatio } from 'alus';

	const ratios = [
		{ label: '16:9', value: 16 / 9 },
		{ label: '4:3', value: 4 / 3 },
		{ label: '1:1', value: 1 },
		{ label: '3:4', value: 3 / 4 },
		{ label: '9:16', value: 9 / 16 }
	];
</script>

<svelte:head>
	<title>AspectRatio · Alus Components</title>
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
			<div class="hanko-seal">割</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">AspectRatio</h1>
				<p class="tracking-widest text-(--bamboo)">縦横</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Container that maintains a constant width / height ratio using the CSS
			<code>aspect-ratio</code> property.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Common ratios</h2>

		<div class="japanese-border grid grid-cols-2 gap-6 bg-white/50 p-8 backdrop-blur-sm md:grid-cols-3 lg:grid-cols-5">
			{#each ratios as r}
				<div class="flex flex-col items-center gap-2">
					<AspectRatio
						ratio={r.value}
						class="w-full overflow-hidden rounded border border-(--charcoal)/15 bg-(--cherry-blossom)/40"
						innerClass="flex items-center justify-center"
					>
						<span class="font-display text-2xl text-(--ink)">{r.label}</span>
					</AspectRatio>
					<span class="font-mono text-xs text-(--charcoal)/60">{r.label}</span>
				</div>
			{/each}
		</div>
	</section>
</main>
