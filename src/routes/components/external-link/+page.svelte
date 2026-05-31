<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft, ArrowSquareOut } from 'phosphor-svelte';
	import { ExternalLink } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<ExternalLink href="https://svelte.dev" class="text-(--indigo-dye) underline">
	Svelte docs
</ExternalLink>`;
</script>

<svelte:head>
	<title>ExternalLink · Alus Components</title>
</svelte:head>

<a
	href={resolve('/')}
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">外</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">ExternalLink</h1>
				<p class="tracking-widest text-(--bamboo)">外部</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Anchor with safe defaults: <code>target="_blank"</code>,
			<code>rel="noopener noreferrer"</code>, and a visually-hidden "(opens in new tab)"
			announcement for screen readers.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Inline + with icon</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<p class="text-(--ink)">
				Read more on the
				<ExternalLink
					href="https://svelte.dev"
					class="inline-flex items-center gap-1 font-medium text-(--indigo-dye) underline-offset-2 hover:underline"
				>
					Svelte website
					{#snippet icon()}
						<ArrowSquareOut class="h-3.5 w-3.5" aria-hidden="true" />
					{/snippet}
				</ExternalLink>.
			</p>

			<p class="text-(--ink)">
				Or visit
				<ExternalLink
					href="https://www.w3.org/WAI/ARIA/apg/"
					class="font-medium text-(--vermilion) underline underline-offset-2"
				>
					the ARIA Authoring Practices Guide
				</ExternalLink>
				for reference patterns.
			</p>

			<p class="font-mono text-xs text-(--charcoal)/60">
				Each link includes <code>target=_blank</code>, <code>rel="noopener noreferrer"</code>, and a
				sr-only span. Hover over either link, then inspect to see attrs.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'href', type: 'string', default: 'required' },
			{
				name: 'icon',
				type: 'Snippet',
				default: 'undefined',
				description: 'Optional trailing icon'
			},
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">target="_blank"</code> + <code class="rounded bg-(--cream) px-1">rel="noopener noreferrer"</code> baked in',
			'Appends sr-only "(opens in new tab)" announcement for screen readers',
			'Decorative icon is <code class="rounded bg-(--cream) px-1">aria-hidden</code>'
		]}
	/>
</main>
