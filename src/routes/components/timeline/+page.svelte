<script lang="ts">
	import { CaretLeft, Check, Circle, CircleNotch } from 'phosphor-svelte';
	import { Timeline, TimelineItem } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Timeline aria-label="Project milestones">
	<TimelineItem status="completed" time="Q1" datetime="2026-01-01">
		{#snippet marker()}<Check />{/snippet}
		<p>Foundation shipped.</p>
	</TimelineItem>
	<TimelineItem status="current" time="Q2" datetime="2026-05-18">
		<p>In progress.</p>
	</TimelineItem>
</Timeline>`;
</script>

<svelte:head>
	<title>Timeline · Alus Components</title>
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
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Timeline</h1>
				<p class="tracking-widest text-(--bamboo)">年表</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Vertical / horizontal timeline with markers, time, and status (completed / current / upcoming).
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Vertical</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Timeline aria-label="Project milestones" class="relative space-y-6 pl-8">
				<TimelineItem
					status="completed"
					time="Q1"
					datetime="2026-01-01"
					class="relative"
				>
					{#snippet marker()}
						<span
							class="absolute left-[-2rem] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-(--matcha) text-white"
						>
							<Check class="h-4 w-4" weight="bold" />
						</span>
					{/snippet}
					<div>
						<p class="font-display text-lg text-(--ink)">Foundation</p>
						<p class="text-sm text-(--charcoal)/70">Core form components shipped.</p>
					</div>
				</TimelineItem>

				<TimelineItem status="completed" time="Q2" datetime="2026-04-01">
					{#snippet marker()}
						<span
							class="absolute left-[-2rem] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-(--matcha) text-white"
						>
							<Check class="h-4 w-4" weight="bold" />
						</span>
					{/snippet}
					<div>
						<p class="font-display text-lg text-(--ink)">Navigation & Overlays</p>
						<p class="text-sm text-(--charcoal)/70">Tabs, Menu, Modal, Popover delivered.</p>
					</div>
				</TimelineItem>

				<TimelineItem status="current" time="Q2 (now)" datetime="2026-05-18">
					{#snippet marker()}
						<span
							class="absolute left-[-2rem] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-(--vermilion) text-white"
						>
							<CircleNotch class="h-4 w-4 animate-spin" weight="bold" />
						</span>
					{/snippet}
					<div>
						<p class="font-display text-lg text-(--ink)">Complex Data</p>
						<p class="text-sm text-(--vermilion)">Table, TreeView, Timeline — in progress.</p>
					</div>
				</TimelineItem>

				<TimelineItem status="upcoming" time="Q3" datetime="2026-07-01">
					{#snippet marker()}
						<span
							class="absolute left-[-2rem] top-0 flex h-6 w-6 items-center justify-center rounded-full border-2 border-(--charcoal)/30 bg-white"
						>
							<Circle class="h-2 w-2 text-(--charcoal)/30" weight="fill" />
						</span>
					{/snippet}
					<div>
						<p class="font-display text-lg text-(--ink)">Polish & v1</p>
						<p class="text-sm text-(--charcoal)/70">CommandMenu, Calendar, public release.</p>
					</div>
				</TimelineItem>
			</Timeline>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'", description: '<code>Timeline</code>' },
			{ name: 'status', type: "'completed' | 'current' | 'upcoming'", default: "'upcoming'", description: '<code>TimelineItem</code>' },
			{ name: 'time', type: 'string', default: 'undefined' },
			{ name: 'datetime', type: 'string', default: 'undefined', description: 'ISO 8601 for <code>&lt;time&gt;</code>' },
			{ name: 'marker', type: 'Snippet', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">&lt;ol&gt;</code> root — items are ordered semantically',
			'Current item gets <code class="rounded bg-(--cream) px-1">aria-current="step"</code>',
			'<code class="rounded bg-(--cream) px-1">datetime</code> attribute on internal <code>&lt;time&gt;</code> exposes machine-readable date',
			'Status surfaced as <code class="rounded bg-(--cream) px-1">data-status</code> for styling'
		]}
	/>
</main>
