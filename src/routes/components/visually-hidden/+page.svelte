<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { VisuallyHidden } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<button>
	<span aria-hidden="true">×</span>
	<VisuallyHidden>Close dialog</VisuallyHidden>
</button>`;
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

	<DemoFooter
		{code}
		props={[
			{ name: 'as', type: "'span' | 'div'", default: "'span'" },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Uses the clip pattern (1px sized + clipped) — content stays in the a11y tree',
			'Never use <code class="rounded bg-(--cream) px-1">display:none</code> for SR-only text — that removes it from the AT tree',
			'Pair with icon-only buttons to give them an accessible name',
			'Skip-link target text + decorative section markers are good fits'
		]}
	/>
</main>
