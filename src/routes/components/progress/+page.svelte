<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Progress } from 'alus';
	import { onMount } from 'svelte';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Progress
	value={45}
	max={100}
	aria-label="Upload progress"
	indicatorClass="h-full bg-blue-500 transition-all"
/>`;

	let value = $state(33);

	onMount(() => {
		const id = setInterval(() => {
			value = (value + 7) % 101;
		}, 600);
		return () => clearInterval(id);
	});
</script>

<svelte:head>
	<title>Progress · Alus Components</title>
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
			<div class="hanko-seal">進</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Progress</h1>
				<p class="tracking-widest text-(--bamboo)">プログレス</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Progress bar with determinate and indeterminate states.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Determinate</span>
			<span class="ml-2 text-lg text-(--bamboo)">確定</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<Progress
				{value}
				aria-label="Loading progress"
				class="h-2 w-full overflow-hidden bg-(--indigo-dye)/10"
				indicatorClass="h-full bg-(--vermilion) transition-all"
			/>
			<p class="text-sm text-(--charcoal)/60">{value}% complete</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Indeterminate</span>
			<span class="ml-2 text-lg text-(--bamboo)">不確定</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Progress
				indeterminate
				aria-label="Loading"
				class="h-2 w-full overflow-hidden bg-(--indigo-dye)/10"
				indicatorClass="h-full w-1/3 animate-pulse bg-(--vermilion)"
			/>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'number', default: '0', description: 'Current progress 0..max' },
			{ name: 'max', type: 'number', default: '100' },
			{
				name: 'indeterminate',
				type: 'boolean',
				default: 'false',
				description: 'Drops value, animates instead'
			},
			{
				name: 'indicatorClass',
				type: 'string',
				default: "''",
				description: 'Class on the filled bar'
			},
			{ name: 'aria-label', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="progressbar"</code> with <code class="rounded bg-(--cream) px-1">aria-valuenow</code>, <code class="rounded bg-(--cream) px-1">aria-valuemin</code>, <code class="rounded bg-(--cream) px-1">aria-valuemax</code>',
			'Indeterminate mode omits <code class="rounded bg-(--cream) px-1">aria-valuenow</code> per WAI-ARIA spec',
			'Pair with visible numeric label — bar alone is not enough for SRs in all cases',
			'Honour <code class="rounded bg-(--cream) px-1">prefers-reduced-motion</code> for indeterminate animation'
		]}
	/>
</main>
