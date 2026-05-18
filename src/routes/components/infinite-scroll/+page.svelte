<script lang="ts">
	import { CaretLeft, CircleNotch } from 'phosphor-svelte';
	import { InfiniteScroll } from 'alus';

	let items = $state<number[]>(Array.from({ length: 20 }, (_, i) => i + 1));
	let hasMore = $state(true);

	async function loadMore() {
		await new Promise((r) => setTimeout(r, 600));
		const start = items.length + 1;
		const next = Array.from({ length: 20 }, (_, i) => start + i);
		items = [...items, ...next];
		if (items.length >= 120) hasMore = false;
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
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Lazy list</h2>
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
								<span>— end —</span>
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
</main>
