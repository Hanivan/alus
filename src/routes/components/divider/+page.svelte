<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Divider } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Divider class="border-t border-gray-200" />
<Divider orientation="vertical" class="h-6 border-l border-gray-200" />`;
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

	<DemoFooter
		{code}
		props={[
			{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
			{
				name: 'decorative',
				type: 'boolean',
				default: 'false',
				description: 'Removes from a11y tree'
			},
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Horizontal: native <code class="rounded bg-(--cream) px-1">&lt;hr&gt;</code> for semantic content separation',
			'Vertical: <code class="rounded bg-(--cream) px-1">role="separator"</code> + <code class="rounded bg-(--cream) px-1">aria-orientation="vertical"</code>',
			'<code>decorative</code> prop adds <code class="rounded bg-(--cream) px-1">aria-hidden</code> for purely visual lines',
			'Use sparingly — whitespace and headings are usually clearer than rules'
		]}
	/>
</main>
