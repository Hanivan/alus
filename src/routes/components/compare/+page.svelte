<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft, CaretLeft as Left, CaretRight as Right } from 'phosphor-svelte';
	import { Compare } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Compare bind:position aria-label="Compare winter and spring">
	{#snippet before()}<img src="/winter.jpg" alt="Winter" />{/snippet}
	{#snippet after()}<img src="/spring.jpg" alt="Spring" />{/snippet}
</Compare>`;

	let pos = $state(50);
	let vPos = $state(50);
</script>

<svelte:head>
	<title>Compare · Alus Components</title>
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
			<div class="hanko-seal">比</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Compare</h1>
				<p class="tracking-widest text-(--bamboo)">比較</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Reveal "after" over "before" by dragging the handle, or focus the handle and use arrow keys.
			<code class="font-mono text-sm">role=slider</code> with valuenow / valuemin / valuemax. Click anywhere
			on the track to jump.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Horizontal — seasons</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Compare
				bind:position={pos}
				aria-label="Compare winter and spring"
				class="h-72 rounded border border-(--charcoal)/15"
				handleClass="flex items-center justify-center outline-none w-1 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus-visible:bg-(--vermilion)"
			>
				{#snippet before()}
					<div
						class="flex h-full w-full flex-col items-center justify-center bg-(--indigo-dye)/85 text-white"
					>
						<span class="font-display text-7xl">冬</span>
						<span class="mt-2 text-sm tracking-widest opacity-80">Winter</span>
					</div>
				{/snippet}
				{#snippet after()}
					<div
						class="flex h-full w-full flex-col items-center justify-center bg-(--cherry-blossom) text-(--ink)"
					>
						<span class="font-display text-7xl">春</span>
						<span class="mt-2 text-sm tracking-widest text-(--bamboo)">Spring</span>
					</div>
				{/snippet}
				{#snippet handle()}
					<div
						class="font-display flex h-10 w-10 items-center justify-center gap-0.5 rounded-full bg-white text-(--ink) shadow-md"
					>
						<Left class="h-3 w-3" />
						<Right class="h-3 w-3" />
					</div>
				{/snippet}
			</Compare>
		</div>

		<p class="mt-4 font-mono text-sm text-(--charcoal)/60">position: {Math.round(pos)}%</p>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Vertical — sky and earth</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Compare
				bind:position={vPos}
				orientation="vertical"
				aria-label="Compare sky and earth"
				class="h-80 w-full max-w-md rounded border border-(--charcoal)/15"
				handleClass="outline-none h-1 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)] focus-visible:bg-(--vermilion)"
			>
				{#snippet before()}
					<div class="flex h-full w-full items-center justify-center bg-(--matcha)/70 text-white">
						<span class="font-display text-7xl">地</span>
					</div>
				{/snippet}
				{#snippet after()}
					<div class="flex h-full w-full items-center justify-center bg-(--indigo-dye) text-white">
						<span class="font-display text-7xl">空</span>
					</div>
				{/snippet}
			</Compare>
		</div>

		<p class="mt-4 font-mono text-sm text-(--charcoal)/60">position: {Math.round(vPos)}%</p>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'position', type: 'number', default: '50', description: 'Bindable 0..100' },
			{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
			{ name: 'before', type: 'Snippet', default: 'required' },
			{ name: 'after', type: 'Snippet', default: 'required' },
			{ name: 'handle', type: 'Snippet', default: 'undefined' },
			{ name: 'handleClass', type: 'string', default: "''" }
		]}
		a11y={[
			'Handle is <code class="rounded bg-(--cream) px-1">role="slider"</code> with valuenow / valuemin / valuemax',
			'Arrow keys move 1%, Shift+arrow 10%, Home / End jump to 0 / 100',
			'Both <code>before</code> and <code>after</code> images need their own meaningful <code>alt</code>',
			'Provide <code class="rounded bg-(--cream) px-1">aria-label</code> describing what is being compared'
		]}
	/>
</main>
