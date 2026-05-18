<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { SplitView, SplitViewPane, SplitViewHandle } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<SplitView bind:size={pct} min={20} max={80} orientation="horizontal" aria-label="Editor">
	<SplitViewPane side="first">Left</SplitViewPane>
	<SplitViewHandle aria-label="Resize panes" />
	<SplitViewPane side="second">Right</SplitViewPane>
</SplitView>`;

	let hSize = $state(40);
	let vSize = $state(55);
</script>

<svelte:head>
	<title>SplitView · Alus Components</title>
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
			<div class="hanko-seal">分</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">SplitView</h1>
				<p class="tracking-widest text-(--bamboo)">分割</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Two-pane split view with a draggable separator. Size is a percent (0–100). Keyboard: arrow keys
			step, PageUp/PageDown large step, Home / End jump to min / max.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Horizontal split</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<SplitView
				bind:size={hSize}
				min={20}
				max={80}
				orientation="horizontal"
				aria-label="Editor"
				class="flex h-64 overflow-hidden rounded border border-(--charcoal)/15"
			>
				<SplitViewPane side="first" class="bg-(--cherry-blossom)/40 p-6">
					<div class="flex h-full flex-col items-center justify-center gap-2 text-(--ink)">
						<span class="font-display text-4xl">左</span>
						<span class="font-mono text-sm text-(--charcoal)/60">{Math.round(hSize)}%</span>
					</div>
				</SplitViewPane>
				<SplitViewHandle
					aria-label="Resize horizontal panes"
					class="w-1.5 cursor-ew-resize bg-(--indigo-dye)/15 hover:bg-(--indigo-dye)/40 focus-visible:bg-(--vermilion) outline-none"
				/>
				<SplitViewPane side="second" class="bg-white p-6">
					<div class="flex h-full flex-col items-center justify-center gap-2 text-(--ink)">
						<span class="font-display text-4xl">右</span>
						<span class="font-mono text-sm text-(--charcoal)/60">{100 - Math.round(hSize)}%</span>
					</div>
				</SplitViewPane>
			</SplitView>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Vertical split</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<SplitView
				bind:size={vSize}
				min={20}
				max={80}
				orientation="vertical"
				aria-label="Stacked"
				class="flex h-96 flex-col overflow-hidden rounded border border-(--charcoal)/15"
			>
				<SplitViewPane side="first" class="bg-(--matcha)/30 p-6">
					<div class="flex h-full flex-col items-center justify-center gap-2 text-(--ink)">
						<span class="font-display text-4xl">上</span>
						<span class="font-mono text-sm text-(--charcoal)/60">{Math.round(vSize)}%</span>
					</div>
				</SplitViewPane>
				<SplitViewHandle
					aria-label="Resize vertical panes"
					class="h-1.5 cursor-ns-resize bg-(--matcha)/25 hover:bg-(--matcha)/50 focus-visible:bg-(--vermilion) outline-none"
				/>
				<SplitViewPane side="second" class="bg-white p-6">
					<div class="flex h-full flex-col items-center justify-center gap-2 text-(--ink)">
						<span class="font-display text-4xl">下</span>
						<span class="font-mono text-sm text-(--charcoal)/60">{100 - Math.round(vSize)}%</span>
					</div>
				</SplitViewPane>
			</SplitView>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'size', type: 'number', default: '50', description: 'Bindable 0..100 (% of first pane)' },
			{ name: 'min', type: 'number', default: '0' },
			{ name: 'max', type: 'number', default: '100' },
			{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
			{ name: 'side', type: "'first' | 'second'", default: 'required', description: '<code>SplitViewPane</code>' }
		]}
		a11y={[
			'Handle is <code class="rounded bg-(--cream) px-1">role="separator"</code> + <code class="rounded bg-(--cream) px-1">aria-orientation</code>',
			'<code class="rounded bg-(--cream) px-1">aria-valuenow</code> / <code>aria-valuemin</code> / <code>aria-valuemax</code> reflect percentages',
			'Arrows step 1%, PageUp / PageDown 10%, Home / End jump to min / max',
			'Wrap the whole SplitView with <code class="rounded bg-(--cream) px-1">aria-label</code> describing the layout'
		]}
	/>
</main>
