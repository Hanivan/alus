<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Divider } from 'alus';
</script>

<svelte:head>
	<title>Divider · Alus Components</title>
	<meta name="description" content="Accessible divider component for visual separation" />
</svelte:head>

<a
	href="/"
	class="inline-flex items-center gap-2 text-(--indigo-dye) hover:text-(--vermilion) transition-colors duration-300 mb-8"
>
	<CaretLeft class="w-5 h-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="flex items-center gap-6 mb-6">
			<div class="hanko-seal">線</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-(--ink) mb-2">Divider</h1>
				<p class="text-(--bamboo) tracking-widest">ディバイダ</p>
			</div>
		</div>
		<p class="text-xl text-(--charcoal)/70 max-w-2xl">
			A visual separator with horizontal and vertical orientations.
		</p>
	</header>

	<!-- Horizontal -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Horizontal</span>
			<span class="text-(--bamboo) text-lg ml-2">水平</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<p class="text-(--charcoal)/80 mb-4">Above the divider</p>
			<Divider class="border-t border-(--indigo-dye)/20" />
			<p class="text-(--charcoal)/80 mt-4">Below the divider</p>
		</div>
	</section>

	<!-- Vertical -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Vertical</span>
			<span class="text-(--bamboo) text-lg ml-2">垂直</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex items-center gap-4">
				<span class="text-(--charcoal)/80">Left</span>
				<Divider orientation="vertical" class="h-6 border-l border-(--indigo-dye)/20" />
				<span class="text-(--charcoal)/80">Right</span>
			</div>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Accessibility</span>
			<span class="text-(--bamboo) text-lg ml-2">アクセシビリティ</span>
		</h2>

		<div class="japanese-border p-8 bg-linear-to-br from-white to-(--cream)">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Horizontal: native <code class="bg-(--cream) px-1 rounded">&lt;hr&gt;</code> element with <code class="bg-(--cream) px-1 rounded">aria-hidden</code></span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Vertical: <code class="bg-(--cream) px-1 rounded">role="separator"</code> with <code class="bg-(--cream) px-1 rounded">aria-orientation="vertical"</code></span>
				</li>
			</ul>
		</div>
	</section>
</main>