<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { VisuallyHidden } from 'alus';
</script>

<svelte:head>
	<title>VisuallyHidden · Alus Components</title>
	<meta name="description" content="Screen-reader only content wrapper" />
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
			<div class="hanko-seal">隠</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">VisuallyHidden</h1>
				<p class="tracking-widest text-(--bamboo)">非表示</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Hide content visually while keeping it accessible to screen readers.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<button
				class="border border-(--indigo-dye)/20 px-4 py-2 transition-colors hover:border-(--vermilion)"
			>
				<span aria-hidden="true">×</span>
				<VisuallyHidden>Close dialog</VisuallyHidden>
			</button>
			<p class="text-sm text-(--charcoal)/70">
				The icon-only button above has a screen-reader-accessible label "Close dialog".
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>As Div</span>
			<span class="ml-2 text-lg text-(--bamboo)">ブロック</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<h3 class="mb-2 text-(--ink)">Article heading</h3>
			<VisuallyHidden as="div">Published 2026-05-17 by Alus team</VisuallyHidden>
			<p class="text-(--charcoal)/70">
				Metadata above is hidden visually but read by screen readers.
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Accessibility</span>
			<span class="ml-2 text-lg text-(--bamboo)">アクセシビリティ</span>
		</h2>

		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80">Content remains in DOM and accessibility tree</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Uses clip pattern (1px sized, clipped) — works with all screen readers</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Render as <code class="rounded bg-(--cream) px-1">span</code> or
						<code class="rounded bg-(--cream) px-1">div</code>
						via <code class="rounded bg-(--cream) px-1">as</code> prop</span
					>
				</li>
			</ul>
		</div>
	</section>
</main>
