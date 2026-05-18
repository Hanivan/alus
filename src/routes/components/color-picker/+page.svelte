<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { ColorPicker } from 'alus';

	let c1 = $state('#c84b31');
	let c2 = $state('#005f73');

	const palette = [
		'#000000',
		'#1f1f1f',
		'#c84b31',
		'#d4a017',
		'#84a98c',
		'#005f73',
		'#3d2c8d',
		'#ffffff'
	];
</script>

<svelte:head>
	<title>ColorPicker · Alus Components</title>
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
			<div class="hanko-seal">色</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">ColorPicker</h1>
				<p class="tracking-widest text-(--bamboo)">色選択</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Native color input + hex text field + optional swatch grid. Hex accepts 3 / 6 / 8 char forms
			and normalizes.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Native + hex</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ColorPicker
				bind:value={c1}
				aria-label="Brand color"
				class="inline-flex items-center gap-2 rounded border border-(--charcoal)/20 bg-white p-2"
				nativeClass="h-8 w-10 cursor-pointer rounded border-none bg-transparent"
				inputClass="w-28 rounded border border-(--charcoal)/15 px-2 py-1 text-sm text-(--ink) outline-none focus:border-(--indigo-dye)"
			/>
			<div class="mt-4 flex items-center gap-3">
				<div class="h-12 w-12 rounded border border-(--charcoal)/15" style={`background:${c1};`}></div>
				<code class="text-sm text-(--charcoal)/70">{c1}</code>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">With swatches</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ColorPicker
				bind:value={c2}
				swatches={palette}
				aria-label="Accent color"
				class="inline-flex flex-wrap items-center gap-2 rounded border border-(--charcoal)/20 bg-white p-2"
				nativeClass="h-8 w-10 cursor-pointer rounded border-none bg-transparent"
				inputClass="w-28 rounded border border-(--charcoal)/15 px-2 py-1 text-sm text-(--ink) outline-none focus:border-(--indigo-dye)"
				swatchesClass="flex items-center gap-1.5"
				swatchClass="h-6 w-6 rounded border border-(--charcoal)/15 data-[selected]:ring-2 data-[selected]:ring-(--indigo-dye) data-[selected]:ring-offset-1"
			/>
			<div class="mt-4 flex items-center gap-3">
				<div class="h-12 w-12 rounded border border-(--charcoal)/15" style={`background:${c2};`}></div>
				<code class="text-sm text-(--charcoal)/70">{c2}</code>
			</div>
		</div>
	</section>
</main>
