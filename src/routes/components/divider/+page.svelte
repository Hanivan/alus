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
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">線</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Divider</h1>
				<p class="tracking-widest text-(--bamboo)">ディバイダ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			A visual separator with horizontal and vertical orientations.
		</p>
	</header>

	<!-- Horizontal -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Horizontal</span>
			<span class="ml-2 text-lg text-(--bamboo)">水平</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<p class="mb-4 text-(--charcoal)/80">Above the divider</p>
			<Divider class="border-t border-(--indigo-dye)/20" />
			<p class="mt-4 text-(--charcoal)/80">Below the divider</p>
		</div>
	</section>

	<!-- Vertical -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Vertical</span>
			<span class="ml-2 text-lg text-(--bamboo)">垂直</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex items-center gap-4">
				<span class="text-(--charcoal)/80">Left</span>
				<Divider orientation="vertical" class="h-6 border-l border-(--indigo-dye)/20" />
				<span class="text-(--charcoal)/80">Right</span>
			</div>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Accessibility</span>
			<span class="ml-2 text-lg text-(--bamboo)">アクセシビリティ</span>
		</h2>

		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Horizontal: native <code class="rounded bg-(--cream) px-1">&lt;hr&gt;</code> element
						with <code class="rounded bg-(--cream) px-1">aria-hidden</code></span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Vertical: <code class="rounded bg-(--cream) px-1">role="separator"</code> with
						<code class="rounded bg-(--cream) px-1">aria-orientation="vertical"</code></span
					>
				</li>
			</ul>
		</div>
	</section>
</main>
