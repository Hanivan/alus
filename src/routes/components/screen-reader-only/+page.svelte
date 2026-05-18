<script lang="ts">
	import { CaretLeft, Trash, MagnifyingGlass } from 'phosphor-svelte';
	import { ScreenReaderOnly } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<button>
	<Trash class="h-5 w-5" />
	<ScreenReaderOnly>Delete item</ScreenReaderOnly>
</button>`;
</script>

<svelte:head>
	<title>ScreenReaderOnly · Alus Components</title>
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
			<div class="hanko-seal">読</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">ScreenReaderOnly</h1>
				<p class="tracking-widest text-(--bamboo)">音読</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Alias of <code>VisuallyHidden</code> — content not rendered to screen but read by screen readers.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Icon-only buttons</h2>
		<div class="japanese-border flex items-center gap-3 bg-white/50 p-8 backdrop-blur-sm">
			<button
				class="inline-flex h-10 w-10 items-center justify-center rounded border border-(--charcoal)/20 bg-white text-(--vermilion)"
			>
				<Trash class="h-5 w-5" />
				<ScreenReaderOnly>Delete item</ScreenReaderOnly>
			</button>
			<button
				class="inline-flex h-10 w-10 items-center justify-center rounded border border-(--charcoal)/20 bg-white text-(--indigo-dye)"
			>
				<MagnifyingGlass class="h-5 w-5" />
				<ScreenReaderOnly>Search</ScreenReaderOnly>
			</button>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Skip link target</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<p class="text-sm text-(--charcoal)/70">
				<ScreenReaderOnly>(Decorative section start)</ScreenReaderOnly>
				A heading announced as "Decorative section start, Welcome".
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
			'Alias of <code class="rounded bg-(--cream) px-1">VisuallyHidden</code> — same clip-pattern implementation',
			'Use for icon-only button labels, skip-link targets, and decorative section markers',
			'Pair icon with <code class="rounded bg-(--cream) px-1">aria-hidden="true"</code> so SR reads only the hidden label',
			'Never wrap interactive content inside it — focus into invisible text confuses keyboard users'
		]}
	/>
</main>
