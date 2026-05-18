<script lang="ts">
	import { CaretLeft, House, Compass, BookOpen, Gear } from 'phosphor-svelte';
	import { Navigation } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Navigation aria-label="Primary">
	<a href="/" aria-current="page">Home</a>
	<a href="/about">About</a>
	<a href="/contact">Contact</a>
</Navigation>`;
</script>

<svelte:head>
	<title>Navigation · Alus Components</title>
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
			<div class="hanko-seal">航</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Navigation</h1>
				<p class="tracking-widest text-(--bamboo)">案内</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantic <code>&lt;nav&gt;</code> wrapper with ARIA label support. Use as the container for any
			navigation list.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Primary nav</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Navigation
				aria-label="Primary"
				class="flex items-center gap-1 rounded border border-(--charcoal)/15 bg-white p-1"
			>
				<a
					href="/"
					aria-current="page"
					class="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm text-(--ink) aria-[current=page]:bg-(--indigo-dye) aria-[current=page]:text-white"
				>
					<House class="h-4 w-4" />Home
				</a>
				<a
					href="/components"
					class="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm text-(--ink) hover:bg-(--cream)"
				>
					<Compass class="h-4 w-4" />Components
				</a>
				<a
					href="/docs"
					class="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm text-(--ink) hover:bg-(--cream)"
				>
					<BookOpen class="h-4 w-4" />Docs
				</a>
				<a
					href="/settings"
					class="inline-flex items-center gap-2 rounded px-3 py-1.5 text-sm text-(--ink) hover:bg-(--cream)"
				>
					<Gear class="h-4 w-4" />Settings
				</a>
			</Navigation>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Secondary nav (vertical)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Navigation aria-label="Section" class="w-48 space-y-1 text-sm">
				<a href="#overview" class="block rounded px-3 py-1.5 text-(--ink) hover:bg-(--cream)">
					Overview
				</a>
				<a href="#install" aria-current="page" class="block rounded bg-(--indigo-dye)/10 px-3 py-1.5 text-(--indigo-dye)">
					Installation
				</a>
				<a href="#usage" class="block rounded px-3 py-1.5 text-(--ink) hover:bg-(--cream)">Usage</a>
				<a href="#api" class="block rounded px-3 py-1.5 text-(--ink) hover:bg-(--cream)">API</a>
			</Navigation>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'aria-label', type: 'string', default: 'undefined', description: 'Required if multiple <nav>s on page' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Renders a semantic <code class="rounded bg-(--cream) px-1">&lt;nav&gt;</code> landmark',
			'<code class="rounded bg-(--cream) px-1">aria-label</code> distinguishes multiple navs (e.g. "Primary" vs "Footer")',
			'Mark active link with <code class="rounded bg-(--cream) px-1">aria-current="page"</code> on the child anchor'
		]}
	/>
</main>
