<script lang="ts">
	import { CaretLeft, ImageBroken } from 'phosphor-svelte';
	import { Image } from 'alus';
</script>

<svelte:head>
	<title>Image · Alus Components</title>
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
			<div class="hanko-seal">画</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Image</h1>
				<p class="tracking-widest text-(--bamboo)">画像</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Image with lazy loading, placeholder, and fallback on error.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border grid gap-6 bg-white/50 p-8 backdrop-blur-sm md:grid-cols-2">
			<div>
				<p class="mb-2 text-sm text-(--charcoal)/60">Loaded</p>
				<Image
					src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=600"
					alt="Mount Fuji"
					class="aspect-video w-full border border-(--indigo-dye)/20 object-cover"
				/>
			</div>
			<div>
				<p class="mb-2 text-sm text-(--charcoal)/60">Error → fallback</p>
				<Image
					src="https://invalid-url-test/broken.jpg"
					alt="Broken"
					class="aspect-video w-full border border-(--indigo-dye)/20 object-cover"
				>
					{#snippet fallback()}
						<div
							class="grid aspect-video w-full place-items-center border border-dashed border-(--indigo-dye)/30 bg-(--cream)/50 text-(--charcoal)/40"
						>
							<ImageBroken class="h-12 w-12" />
						</div>
					{/snippet}
				</Image>
			</div>
		</div>
	</section>
</main>
