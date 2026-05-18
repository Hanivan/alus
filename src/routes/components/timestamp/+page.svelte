<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Timestamp } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Timestamp value={Date.now() - 60_000} />
<Timestamp value={ts} mode="absolute" />
<Timestamp value={ts} mode="both" relativeStyle="short" />`;

	const now = Date.now();
	const samples = [
		{ label: 'Just now', value: now - 5_000 },
		{ label: '12 minutes ago', value: now - 12 * 60 * 1000 },
		{ label: '3 hours ago', value: now - 3 * 60 * 60 * 1000 },
		{ label: 'Yesterday', value: now - 24 * 60 * 60 * 1000 },
		{ label: '5 days ago', value: now - 5 * 24 * 60 * 60 * 1000 },
		{ label: '2 weeks ago', value: now - 14 * 24 * 60 * 60 * 1000 },
		{ label: 'Next week', value: now + 7 * 24 * 60 * 60 * 1000 }
	];
</script>

<svelte:head>
	<title>Timestamp · Alus Components</title>
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
			<div class="hanko-seal">時</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Timestamp</h1>
				<p class="tracking-widest text-(--bamboo)">時刻</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantic <code>&lt;time&gt;</code> element with relative formatting via
			<code>Intl.RelativeTimeFormat</code>. Auto-refreshes on an interval. Tooltips show the
			absolute date.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Relative</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ul class="divide-y divide-(--charcoal)/10">
				{#each samples as s}
					<li class="flex items-center justify-between py-3">
						<span class="text-(--ink)">{s.label}</span>
						<Timestamp value={s.value} class="font-mono text-sm text-(--charcoal)/70" />
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Absolute + both</h2>
		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<p>
				absolute:
				<Timestamp
					value={samples[2].value}
					mode="absolute"
					class="font-mono text-sm text-(--charcoal)/70"
				/>
			</p>
			<p>
				both:
				<Timestamp
					value={samples[2].value}
					mode="both"
					class="font-mono text-sm text-(--charcoal)/70"
				/>
			</p>
			<p>
				short style:
				<Timestamp
					value={samples[4].value}
					relativeStyle="short"
					class="font-mono text-sm text-(--charcoal)/70"
				/>
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'number | string | Date', default: 'required' },
			{ name: 'mode', type: "'relative' | 'absolute' | 'both'", default: "'relative'" },
			{ name: 'relativeStyle', type: "'long' | 'short' | 'narrow'", default: "'long'" },
			{
				name: 'locale',
				type: 'string',
				default: 'undefined',
				description: 'Falls back to user locale'
			},
			{
				name: 'updateInterval',
				type: 'number',
				default: '60_000',
				description: 'ms; 0 disables auto-refresh'
			}
		]}
		a11y={[
			'Renders semantic <code class="rounded bg-(--cream) px-1">&lt;time datetime="…"&gt;</code>',
			'Absolute ISO date in <code class="rounded bg-(--cream) px-1">datetime</code> attr lets AT show exact time',
			'Visible text uses <code class="rounded bg-(--cream) px-1">Intl.RelativeTimeFormat</code> for localisation',
			'Auto-refresh respects <code class="rounded bg-(--cream) px-1">prefers-reduced-motion</code>'
		]}
	/>
</main>
