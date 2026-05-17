<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Skeleton } from 'alus';
</script>

<svelte:head>
	<title>Skeleton · Alus Components</title>
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
			<div class="hanko-seal">骨</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Skeleton</h1>
				<p class="tracking-widest text-(--bamboo)">スケルトン</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Loading placeholder. Apply animation + shape via your own classes.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Card</span>
			<span class="ml-2 text-lg text-(--bamboo)">カード</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex items-center gap-4">
				<Skeleton class="block h-12 w-12 animate-pulse rounded-full bg-(--indigo-dye)/10" />
				<div class="flex-1 space-y-2">
					<Skeleton class="block h-4 w-1/3 animate-pulse bg-(--indigo-dye)/10" />
					<Skeleton class="block h-3 w-1/2 animate-pulse bg-(--indigo-dye)/10" />
				</div>
			</div>
			<Skeleton class="block h-32 w-full animate-pulse bg-(--indigo-dye)/10" />
			<Skeleton class="block h-3 w-full animate-pulse bg-(--indigo-dye)/10" />
			<Skeleton class="block h-3 w-4/5 animate-pulse bg-(--indigo-dye)/10" />
		</div>
	</section>
</main>
