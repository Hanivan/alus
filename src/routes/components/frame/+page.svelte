<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Frame } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Frame width={280} height={160} overflow="auto">
	<p>Long content scrolls inside the fixed box.</p>
</Frame>`;
</script>

<svelte:head>
	<title>Frame · Alus Components</title>
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
			<div class="hanko-seal">枠</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Frame</h1>
				<p class="tracking-widest text-(--bamboo)">枠組</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Sizing container with width / height / min / max plus overflow control. Pair with images or
			rich content that should sit inside a fixed bounding box.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Fixed + overflow scroll</h2>

		<div class="japanese-border flex flex-wrap gap-6 bg-white/50 p-8 backdrop-blur-sm">
			<Frame
				width={280}
				height={160}
				overflow="hidden"
				class="rounded border border-(--charcoal)/15 bg-(--cherry-blossom)/40"
			>
				<div class="flex h-full items-center justify-center">
					<span class="font-display text-3xl text-(--ink)">280 × 160</span>
				</div>
			</Frame>

			<Frame
				width={280}
				height={160}
				overflow="auto"
				class="rounded border border-(--charcoal)/15 bg-white p-4"
			>
				<p class="text-sm text-(--ink)">
					This frame is fixed at 280 × 160 px with <code>overflow:auto</code>. Long content like
					this paragraph will scroll inside it instead of pushing surrounding layout. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
					dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
				</p>
			</Frame>

			<Frame
				minHeight={160}
				maxWidth="22rem"
				class="rounded border border-(--charcoal)/15 bg-white p-4"
			>
				<p class="text-sm text-(--ink)">
					min-height 160px, max-width 22rem. Grows to fit short content, caps wide.
				</p>
			</Frame>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'width', type: 'number | string', default: 'undefined' },
			{ name: 'height', type: 'number | string', default: 'undefined' },
			{ name: 'minWidth', type: 'number | string', default: 'undefined' },
			{ name: 'minHeight', type: 'number | string', default: 'undefined' },
			{ name: 'maxWidth', type: 'number | string', default: 'undefined' },
			{ name: 'maxHeight', type: 'number | string', default: 'undefined' },
			{ name: 'overflow', type: "'visible' | 'hidden' | 'auto' | 'scroll'", default: "'visible'" }
		]}
		a11y={[
			'Pure layout primitive — adds no semantics',
			'Scrollable frames (<code>overflow:auto</code>) are keyboard-scrollable when given <code>tabindex="0"</code>',
			'Provide an accessible name for scroll containers via <code>aria-label</code>',
			'Children retain their own roles'
		]}
	/>
</main>
