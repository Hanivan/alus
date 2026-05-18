<script lang="ts">
	import { CaretLeft, ArrowSquareOut } from 'phosphor-svelte';
	import { Link } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Link href="/docs" class="text-(--indigo-dye) underline">Docs</Link>
<Link href="https://svelte.dev" class="text-(--indigo-dye) underline">External</Link>`;
</script>

<svelte:head>
	<title>Link · Alus Components</title>
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
			<div class="hanko-seal">繋</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Link</h1>
				<p class="tracking-widest text-(--bamboo)">リンク</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Anchor wrapper that auto-detects external URLs and sets safe
			<code class="rounded bg-(--cream) px-1">rel</code> attributes.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Variants</span>
			<span class="ml-2 text-lg text-(--bamboo)">種類</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<p>
				<Link href="/" class="text-(--indigo-dye) underline hover:text-(--vermilion)">
					Internal link
				</Link>
				— points within the app.
			</p>
			<p>
				<Link
					href="https://svelte.dev"
					class="inline-flex items-center gap-1 text-(--indigo-dye) underline hover:text-(--vermilion)"
				>
					External link
					<ArrowSquareOut class="h-3 w-3" />
				</Link>
				— auto-detected; opens in new tab with safe rel.
			</p>
			<p>
				<Link
					href="/components"
					current="page"
					class="text-(--vermilion) underline aria-[current=page]:font-semibold"
				>
					Current page link
				</Link>
				— sets <code class="rounded bg-(--cream) px-1">aria-current="page"</code>.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'href', type: 'string', default: 'required' },
			{
				name: 'external',
				type: 'boolean',
				default: 'auto-detected',
				description: 'Override external detection'
			},
			{
				name: 'current',
				type: 'boolean',
				default: 'false',
				description: 'Adds aria-current="page"'
			},
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;a href&gt;</code> — keyboard focusable, screen-reader friendly',
			'Auto-detects external links by URL and sets <code class="rounded bg-(--cream) px-1">rel="noopener"</code> + <code class="rounded bg-(--cream) px-1">target="_blank"</code>',
			'<code class="rounded bg-(--cream) px-1">current</code> prop sets <code class="rounded bg-(--cream) px-1">aria-current="page"</code> for active routes'
		]}
	/>
</main>
