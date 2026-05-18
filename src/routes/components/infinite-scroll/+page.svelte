<script lang="ts">
	import { CaretLeft, CircleNotch, WarningCircle, ArrowClockwise } from 'phosphor-svelte';
	import { InfiniteScroll, Button } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<InfiniteScroll {hasMore} onLoad={loadMore}>
	{#each items as item}
		<Row {item} />
	{/each}
	{#snippet sentinel({ loading, done })}
		{#if done}— end —
		{:else if loading}Loading…
		{/if}
	{/snippet}
</InfiniteScroll>`;

	let items = $state<number[]>(Array.from({ length: 20 }, (_, i) => i + 1));
	let hasMore = $state(true);

	async function loadMore() {
		await new Promise((r) => setTimeout(r, 600));
		const start = items.length + 1;
		const next = Array.from({ length: 20 }, (_, i) => start + i);
		items = [...items, ...next];
		if (items.length >= 120) hasMore = false;
	}

	let errorItems = $state<number[]>(Array.from({ length: 10 }, (_, i) => i + 1));
	let errorHasMore = $state(true);
	let errorState = $state<string | null>(null);
	let attempts = $state(0);

	async function flakyLoad() {
		attempts++;
		await new Promise((r) => setTimeout(r, 500));
		if (attempts % 3 === 2) {
			errorState = 'Network error — try again';
			errorHasMore = false;
			return;
		}
		const start = errorItems.length + 1;
		errorItems = [...errorItems, ...Array.from({ length: 10 }, (_, i) => start + i)];
		if (errorItems.length >= 60) errorHasMore = false;
	}

	function retry() {
		errorState = null;
		errorHasMore = true;
	}

	let emptyItems = $state<number[]>([]);
	let emptyHasMore = $state(true);

	async function loadEmpty() {
		await new Promise((r) => setTimeout(r, 400));
		emptyHasMore = false;
	}
</script>

<svelte:head>
	<title>InfiniteScroll · Alus Components</title>
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
			<div class="hanko-seal">続</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">InfiniteScroll</h1>
				<p class="tracking-widest text-(--bamboo)">無限</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			IntersectionObserver-backed sentinel — invokes <code>onLoad</code> when scrolled into view.
			<code>hasMore</code> stops the loop, <code>loading</code> guards against re-entry.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Happy path (caps at 120)</h2>
		<div class="japanese-border bg-white/50 p-4 backdrop-blur-sm">
			<div class="h-96 overflow-auto rounded border border-(--charcoal)/15 bg-white p-3">
				<InfiniteScroll {hasMore} onLoad={loadMore} class="space-y-1">
					{#each items as n (n)}
						<div class="rounded border border-(--charcoal)/10 px-3 py-2 text-sm text-(--ink)">
							Item #{n}
						</div>
					{/each}
					{#snippet sentinel({ loading, done })}
						<div class="flex items-center justify-center gap-2 py-4 text-sm text-(--charcoal)/60">
							{#if done}
								<span>— end of list —</span>
							{:else if loading}
								<CircleNotch class="h-4 w-4 animate-spin" />
								<span>Loading…</span>
							{:else}
								<span>Scroll for more</span>
							{/if}
						</div>
					{/snippet}
				</InfiniteScroll>
			</div>
			<p class="mt-3 text-xs text-(--charcoal)/60">Loaded: {items.length}</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Error + retry (every 3rd page fails)</h2>
		<div class="japanese-border bg-white/50 p-4 backdrop-blur-sm">
			<div class="h-80 overflow-auto rounded border border-(--charcoal)/15 bg-white p-3">
				<InfiniteScroll hasMore={errorHasMore} onLoad={flakyLoad} class="space-y-1">
					{#each errorItems as n (n)}
						<div class="rounded border border-(--charcoal)/10 px-3 py-2 text-sm text-(--ink)">
							Item #{n}
						</div>
					{/each}
					{#snippet sentinel({ loading, done })}
						<div class="flex items-center justify-center gap-2 py-4 text-sm">
							{#if errorState}
								<div
									class="flex items-center gap-3 rounded border border-(--vermilion)/30 bg-(--vermilion)/5 px-4 py-2"
								>
									<WarningCircle class="h-4 w-4 text-(--vermilion)" />
									<span class="text-(--vermilion)">{errorState}</span>
									<Button
										onclick={retry}
										class="inline-flex items-center gap-1 rounded bg-(--vermilion) px-2 py-1 text-xs text-white"
									>
										<ArrowClockwise class="h-3 w-3" /> Retry
									</Button>
								</div>
							{:else if done}
								<span class="text-(--charcoal)/60">— complete —</span>
							{:else if loading}
								<CircleNotch class="h-4 w-4 animate-spin text-(--charcoal)/60" />
								<span class="text-(--charcoal)/60">Loading page {attempts}…</span>
							{:else}
								<span class="text-(--charcoal)/60">Scroll for more</span>
							{/if}
						</div>
					{/snippet}
				</InfiniteScroll>
			</div>
			<p class="mt-3 text-xs text-(--charcoal)/60">
				Loaded: {errorItems.length} · Attempts: {attempts}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Empty state</h2>
		<div class="japanese-border bg-white/50 p-4 backdrop-blur-sm">
			<div class="h-48 overflow-auto rounded border border-(--charcoal)/15 bg-white p-3">
				<InfiniteScroll hasMore={emptyHasMore} onLoad={loadEmpty} class="space-y-1">
					{#each emptyItems as n (n)}
						<div class="rounded border border-(--charcoal)/10 px-3 py-2 text-sm text-(--ink)">
							Item #{n}
						</div>
					{/each}
					{#snippet sentinel({ loading, done })}
						<div class="flex items-center justify-center py-8 text-sm text-(--charcoal)/60">
							{#if done && emptyItems.length === 0}
								<span>No results to show.</span>
							{:else if loading}
								<CircleNotch class="h-4 w-4 animate-spin" />
							{/if}
						</div>
					{/snippet}
				</InfiniteScroll>
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'hasMore',
				type: 'boolean',
				default: 'true',
				description: 'When false sentinel stops firing'
			},
			{ name: 'onLoad', type: '() => void | Promise<void>', default: 'required' },
			{ name: 'rootMargin', type: 'string', default: "'200px'" },
			{ name: 'threshold', type: 'number', default: '0' },
			{ name: 'sentinel', type: 'Snippet<[{ loading, done }]>', default: 'undefined' }
		]}
		a11y={[
			'Sentinel state should be announced — wrap loading text in a polite live region',
			'Provide an explicit "Load more" button as fallback when IntersectionObserver fails',
			'Focus should not jump — new content appends, existing items stay in place',
			'Set <code class="rounded bg-(--cream) px-1">aria-busy="true"</code> on the scroll container while loading'
		]}
	/>
</main>
