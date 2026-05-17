<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Slider, Label } from 'alus';

	let volume = $state(50);
	let brightness = $state(80);
</script>

<svelte:head>
	<title>Slider · Alus Components</title>
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
			<div class="hanko-seal">滑</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Slider</h1>
				<p class="tracking-widest text-(--bamboo)">スライダー</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Range slider built on native <code class="rounded bg-(--cream) px-1">input type=range</code>
			with full keyboard support.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-8 bg-white/50 p-8 backdrop-blur-sm">
			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<Label for="vol">Volume</Label>
					<span class="font-mono text-sm text-(--charcoal)/70">{volume}</span>
				</div>
				<Slider id="vol" bind:value={volume} min={0} max={100} class="w-full" />
			</div>

			<div class="space-y-2">
				<div class="flex items-center justify-between">
					<Label for="bright">Brightness</Label>
					<span class="font-mono text-sm text-(--charcoal)/70">{brightness}%</span>
				</div>
				<Slider
					id="bright"
					bind:value={brightness}
					min={0}
					max={100}
					step={5}
					class="w-full"
				/>
			</div>
		</div>
	</section>
</main>
