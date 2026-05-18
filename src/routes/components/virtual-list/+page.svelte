<script lang="ts">
	import { CaretLeft, Plus, Trash, Shuffle } from 'phosphor-svelte';
	import { VirtualList } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<VirtualList items={rows} itemHeight={56} overscan={4} aria-label="Rows">
	{#snippet item({ item, index })}
		<div>{index}: {item.title}</div>
	{/snippet}
</VirtualList>`;

	interface Row {
		id: number;
		title: string;
		subtitle: string;
		color: string;
	}

	const palette = ['vermilion', 'indigo-dye', 'matcha', 'bamboo'];
	function mkRow(id: number): Row {
		return {
			id,
			title: `Row #${id}`,
			subtitle: `Generated entry ${(id * 31) % 999}`,
			color: palette[id % palette.length]
		};
	}

	const rows: Row[] = Array.from({ length: 10000 }, (_, i) => mkRow(i + 1));

	let dynamic = $state<Row[]>(Array.from({ length: 50 }, (_, i) => mkRow(i + 1)));
	let nextId = $state(51);

	function addBatch() {
		const batch = Array.from({ length: 100 }, (_, i) => mkRow(nextId + i));
		dynamic = [...dynamic, ...batch];
		nextId += 100;
	}
	function removeFirst() {
		dynamic = dynamic.slice(10);
	}
	function shuffle() {
		dynamic = [...dynamic].sort(() => Math.random() - 0.5);
	}
	function reset() {
		dynamic = [];
		nextId = 1;
	}

	let empty = $state<Row[]>([]);
</script>

<svelte:head>
	<title>VirtualList · Alus Components</title>
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
			<div class="hanko-seal">虚</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">VirtualList</h1>
				<p class="tracking-widest text-(--bamboo)">仮想列</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Windowed scrolling — only renders the visible slice. Fixed <code>itemHeight</code>, tunable
			<code>overscan</code>.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">10,000 rows (static)</h2>
		<div class="japanese-border bg-white/50 p-4 backdrop-blur-sm">
			<VirtualList
				items={rows}
				itemHeight={56}
				class="h-96 rounded border border-(--charcoal)/15 bg-white"
				aria-label="Many rows"
			>
				{#snippet item({ item: r })}
					<div class="flex h-full items-center gap-3 border-b border-(--charcoal)/10 px-4">
						<div class="font-display text-sm text-(--{r.color})">{r.id}</div>
						<div class="flex-1">
							<div class="text-sm text-(--ink)">{r.title}</div>
							<div class="text-xs text-(--charcoal)/60">{r.subtitle}</div>
						</div>
					</div>
				{/snippet}
			</VirtualList>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Dynamic — add / remove / shuffle</h2>
		<div class="japanese-border bg-white/50 p-4 backdrop-blur-sm">
			<div class="mb-3 flex flex-wrap gap-2">
				<button
					type="button"
					onclick={addBatch}
					class="inline-flex items-center gap-1 rounded bg-(--indigo-dye) px-3 py-1.5 text-xs text-white"
				>
					<Plus class="h-3 w-3" /> Add 100
				</button>
				<button
					type="button"
					onclick={removeFirst}
					disabled={dynamic.length === 0}
					class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 px-3 py-1.5 text-xs text-(--ink) disabled:opacity-40"
				>
					<Trash class="h-3 w-3" /> Drop first 10
				</button>
				<button
					type="button"
					onclick={shuffle}
					disabled={dynamic.length === 0}
					class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 px-3 py-1.5 text-xs text-(--ink) disabled:opacity-40"
				>
					<Shuffle class="h-3 w-3" /> Shuffle
				</button>
				<button
					type="button"
					onclick={reset}
					class="rounded border border-(--vermilion)/40 px-3 py-1.5 text-xs text-(--vermilion)"
				>
					Reset
				</button>
				<span class="ml-auto self-center text-xs text-(--charcoal)/60">{dynamic.length} items</span>
			</div>

			{#if dynamic.length === 0}
				<div class="flex h-64 items-center justify-center rounded border border-dashed border-(--charcoal)/20 bg-white text-sm text-(--charcoal)/50">
					Empty list — add some items to begin.
				</div>
			{:else}
				<VirtualList
					items={dynamic}
					itemHeight={48}
					overscan={6}
					class="h-64 rounded border border-(--charcoal)/15 bg-white"
					aria-label="Dynamic rows"
				>
					{#snippet item({ item: r, index })}
						<div
							class="flex h-full items-center gap-3 border-b border-(--charcoal)/10 px-4 text-sm"
						>
							<span class="w-10 text-xs text-(--charcoal)/40">{index}</span>
							<span class="font-display text-(--{r.color})">{r.id}</span>
							<span class="text-(--ink)">{r.title}</span>
						</div>
					{/snippet}
				</VirtualList>
			{/if}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Empty state</h2>
		<div class="japanese-border bg-white/50 p-4 backdrop-blur-sm">
			{#if empty.length === 0}
				<div class="flex h-32 items-center justify-center rounded border border-dashed border-(--charcoal)/20 bg-white text-sm text-(--charcoal)/50">
					Nothing here yet.
				</div>
			{:else}
				<VirtualList items={empty} itemHeight={40} class="h-32 rounded border bg-white">
					{#snippet item({ item: r })}
						<div class="px-3 py-2 text-sm">{r.title}</div>
					{/snippet}
				</VirtualList>
			{/if}
			<p class="mt-3 text-xs text-(--charcoal)/60">
				VirtualList itself doesn't render an empty placeholder — guard with a parent <code
					>&#123;#if&#125;</code
				>.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'items', type: 'T[]', default: 'required' },
			{ name: 'itemHeight', type: 'number', default: 'required', description: 'Fixed px per row' },
			{ name: 'overscan', type: 'number', default: '3', description: 'Extra rows rendered above / below viewport' },
			{ name: 'item', type: 'Snippet<[{ item, index }]>', default: 'required' },
			{ name: 'aria-label', type: 'string', default: 'undefined' }
		]}
		a11y={[
			'Outer container is a scroll region with the provided <code class="rounded bg-(--cream) px-1">aria-label</code>',
			'<code class="rounded bg-(--cream) px-1">role="list"</code> + <code class="rounded bg-(--cream) px-1">aria-setsize</code> / <code class="rounded bg-(--cream) px-1">aria-posinset</code> let SRs know total count + position',
			'Empty state must be rendered by the parent — VirtualList has nothing to show',
			'Keyboard scrolling works via the native overflow container (PageUp / PageDown / arrow keys)'
		]}
	/>
</main>
