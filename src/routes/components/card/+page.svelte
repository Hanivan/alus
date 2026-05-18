<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Card>
	<CardHeader>
		<CardTitle>Mount Fuji</CardTitle>
		<CardDescription>Japan's highest peak.</CardDescription>
	</CardHeader>
	<CardContent>An iconic active stratovolcano on Honshu island.</CardContent>
	<CardFooter>
		<button>Learn more</button>
	</CardFooter>
</Card>`;
</script>

<svelte:head>
	<title>Card · Alus Components</title>
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
			<div class="hanko-seal">札</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Card</h1>
				<p class="tracking-widest text-(--bamboo)">カード</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantic card container with header/title/description/content/footer + auto ARIA labelling.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Card class="border border-(--indigo-dye)/20 bg-white p-6 shadow-sm">
				<CardHeader class="mb-4">
					<CardTitle class="font-display text-2xl text-(--ink)">Mount Fuji</CardTitle>
					<CardDescription class="text-sm text-(--charcoal)/70">
						Japan's highest peak, standing 3,776 meters.
					</CardDescription>
				</CardHeader>
				<CardContent class="mb-6 text-(--charcoal)/80">
					An iconic active stratovolcano on Honshu island, last erupting in 1707-1708.
				</CardContent>
				<CardFooter class="flex justify-end gap-2">
					<button
						class="border border-(--indigo-dye)/20 bg-transparent px-4 py-2 text-sm text-(--ink) hover:bg-(--cream)"
					>
						Cancel
					</button>
					<button class="bg-(--vermilion) px-4 py-2 text-sm text-white hover:bg-(--vermilion)/90">
						Learn more
					</button>
				</CardFooter>
			</Card>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'as',
				type: 'string',
				default: "'article'",
				description: 'Element on <code>Card</code>'
			},
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">&lt;article&gt;</code> root — landmark for AT navigation',
			'<code class="rounded bg-(--cream) px-1">CardTitle</code> renders a heading; <code>aria-labelledby</code> wires it to the card',
			'<code class="rounded bg-(--cream) px-1">CardDescription</code> wired via <code>aria-describedby</code>',
			'Footer actions remain focusable in DOM order'
		]}
	/>
</main>
