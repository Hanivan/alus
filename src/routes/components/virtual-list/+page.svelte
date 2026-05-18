<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { VirtualList } from 'alus';

	interface Row {
		id: number;
		title: string;
		subtitle: string;
	}

	const rows: Row[] = Array.from({ length: 10000 }, (_, i) => ({
		id: i + 1,
		title: `Row #${i + 1}`,
		subtitle: `Generated entry ${(i * 31) % 999}`
	}));
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
			<code>overscan</code>. 10,000 rows here.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">10,000 rows</h2>
		<div class="japanese-border bg-white/50 p-4 backdrop-blur-sm">
			<VirtualList
				items={rows}
				itemHeight={56}
				class="h-96 rounded border border-(--charcoal)/15 bg-white"
				aria-label="Many rows"
			>
				{#snippet item({ item: r })}
					<div class="flex h-full items-center gap-3 border-b border-(--charcoal)/10 px-4">
						<div class="font-display text-sm text-(--indigo-dye)">{r.id}</div>
						<div class="flex-1">
							<div class="text-sm text-(--ink)">{r.title}</div>
							<div class="text-xs text-(--charcoal)/60">{r.subtitle}</div>
						</div>
					</div>
				{/snippet}
			</VirtualList>
		</div>
	</section>
</main>
