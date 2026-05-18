<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Spinner } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Spinner
	label="Loading content"
	class="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-blue-500"
/>`;
</script>

<svelte:head>
	<title>Spinner · Alus Components</title>
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
			<div class="hanko-seal">回</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Spinner</h1>
				<p class="tracking-widest text-(--bamboo)">スピナー</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Loading indicator with <code class="rounded bg-(--cream) px-1">role="status"</code> +
			<code class="rounded bg-(--cream) px-1">aria-live</code> for screen readers.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Sizes</span>
			<span class="ml-2 text-lg text-(--bamboo)">サイズ</span>
		</h2>

		<div class="japanese-border flex items-center gap-8 bg-white/50 p-8 backdrop-blur-sm">
			<Spinner
				class="inline-block h-6 w-6 animate-spin rounded-full border-2 border-(--indigo-dye)/20 border-t-(--vermilion)"
				label="Loading content"
			/>
			<Spinner
				class="inline-block h-10 w-10 animate-spin rounded-full border-4 border-(--indigo-dye)/20 border-t-(--vermilion)"
				label="Loading content"
			/>
			<Spinner
				class="inline-block h-16 w-16 animate-spin rounded-full border-4 border-(--indigo-dye)/20 border-t-(--vermilion)"
				label="Loading content"
			/>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'label',
				type: 'string',
				default: "'Loading'",
				description: 'SR-only label announced via aria-label'
			},
			{
				name: 'class',
				type: 'string',
				default: "''",
				description: 'Sizing + spin animation classes'
			}
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="status"</code> + <code class="rounded bg-(--cream) px-1">aria-live="polite"</code> announce loading state',
			'Label is rendered as visually-hidden text so SRs read it without showing visual noise',
			'Honour <code class="rounded bg-(--cream) px-1">prefers-reduced-motion</code> by disabling <code>animate-spin</code> when needed',
			'Pair with descriptive surrounding text — never use a spinner as the only loading affordance'
		]}
	/>
</main>
