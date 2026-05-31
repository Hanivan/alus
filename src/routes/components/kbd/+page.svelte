<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft } from 'phosphor-svelte';
	import { Kbd } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Kbd>Esc</Kbd>
<Kbd keys={['Ctrl', 'S']} />
<Kbd keys={['g', 'i']} separator=" then " />`;
</script>

<svelte:head>
	<title>Kbd · Alus Components</title>
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
			<div class="hanko-seal">鍵</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Kbd</h1>
				<p class="tracking-widest text-(--bamboo)">鍵盤</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantic <code>&lt;kbd&gt;</code> wrapper for keyboard shortcuts. Pass a
			<code>keys</code> array for chord rendering with separator.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Single key + chords</h2>

		<div class="japanese-border space-y-6 bg-white/50 p-8 backdrop-blur-sm">
			<p class="text-(--ink)">
				Press <Kbd
					class="inline-flex items-center justify-center rounded border border-(--charcoal)/20 bg-white px-1.5 py-0.5 font-mono text-xs text-(--ink) shadow-[0_1px_0_rgba(0,0,0,0.05)]"
					>Esc</Kbd
				> to close.
			</p>

			<p class="text-(--ink)">
				Save with <Kbd class="inline-flex items-center gap-1" keys={['Ctrl', 'S']} />.
			</p>

			<p class="text-(--ink)">
				Open command palette: <Kbd class="inline-flex items-center gap-1" keys={['Cmd', 'K']} />.
			</p>

			<p class="text-(--ink)">
				Sequential: <Kbd
					class="inline-flex items-center gap-1"
					keys={['g', 'i']}
					separator=" then "
				/>
				(go to inbox).
			</p>

			<p class="text-(--ink)">
				Custom inner: <Kbd class="inline-flex items-center gap-1">
					<kbd
						class="inline-flex items-center justify-center rounded border border-(--charcoal)/20 bg-white px-1.5 py-0.5 font-mono text-xs text-(--ink) shadow-[0_1px_0_rgba(0,0,0,0.05)]"
						>↑</kbd
					>
					<span aria-hidden="true">+</span>
					<kbd
						class="inline-flex items-center justify-center rounded border border-(--charcoal)/20 bg-white px-1.5 py-0.5 font-mono text-xs text-(--ink) shadow-[0_1px_0_rgba(0,0,0,0.05)]"
						>↓</kbd
					>
				</Kbd>
				to scroll.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'keys',
				type: 'string[]',
				default: 'undefined',
				description: 'Renders each key as a <code>&lt;kbd&gt;</code> joined by separator'
			},
			{ name: 'separator', type: 'string', default: "'+'", description: 'Visual + SR-announced' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Renders native <code class="rounded bg-(--cream) px-1">&lt;kbd&gt;</code> — SR announces "keyboard" semantics',
			'Separator is included in the SR text so chord meaning is preserved',
			'Use real keyboard activation, not just visual hints — many users only see the kbd label',
			'For platform-specific keys (⌘ vs Ctrl), prefer named tokens that SRs can pronounce'
		]}
	/>
</main>
