<script lang="ts">
	import { CaretLeft, DotsSixVertical, DotsSix } from 'phosphor-svelte';
	import { Resizable } from 'alus';

	let width = $state(280);
	let height = $state(180);
</script>

<svelte:head>
	<title>Resizable · Alus Components</title>
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
			<div class="hanko-seal">伸</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Resizable</h1>
				<p class="tracking-widest text-(--bamboo)">伸縮</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Drag the handle, or focus it and use arrow keys (Home / End for min / max). Reports
			<code class="font-mono text-sm">role=separator</code> with valuenow / valuemin / valuemax.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Horizontal — handle on right</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Resizable
				bind:size={width}
				side="right"
				minSize={120}
				maxSize={600}
				step={16}
				aria-label="Resize width"
				class="relative flex h-48 items-center justify-center rounded border border-(--charcoal)/15 bg-white text-(--ink)"
				handleClass="absolute top-0 right-0 h-full w-2 cursor-ew-resize bg-(--indigo-dye)/15 hover:bg-(--indigo-dye)/40 focus-visible:bg-(--vermilion) outline-none"
			>
				<div class="flex flex-col items-center gap-2">
					<span class="font-display text-3xl">幅</span>
					<span class="font-mono text-sm text-(--charcoal)/60">{width}px</span>
				</div>
			</Resizable>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Vertical — handle on bottom</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Resizable
				bind:size={height}
				side="bottom"
				minSize={80}
				maxSize={400}
				step={8}
				aria-label="Resize height"
				class="relative flex w-64 items-center justify-center rounded border border-(--charcoal)/15 bg-(--cherry-blossom)/40 text-(--ink)"
				handleClass="absolute bottom-0 left-0 h-2 w-full cursor-ns-resize bg-(--vermilion)/15 hover:bg-(--vermilion)/40 focus-visible:bg-(--vermilion) outline-none"
			>
				<div class="flex flex-col items-center gap-2">
					<span class="font-display text-3xl">高</span>
					<span class="font-mono text-sm text-(--charcoal)/60">{height}px</span>
				</div>
			</Resizable>
		</div>
	</section>
</main>
