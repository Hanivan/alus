<script lang="ts">
	import { CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight } from 'phosphor-svelte';
	import { Pagination } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Pagination } from 'alus-ui';
	let page = $state(1);
<\/script>

<Pagination bind:page count={120} pageSize={10} siblingCount={1} aria-label="Search results" />`;

	let page = $state(1);
</script>

<svelte:head>
	<title>Pagination · Alus Components</title>
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
			<div class="hanko-seal">頁</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Pagination</h1>
				<p class="tracking-widest text-(--bamboo)">ページ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Headless pagination — computes page list with ellipsis. You render the buttons.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Pagination bind:page total={237} perPage={10}>
				{#snippet children({ page: p, totalPages, pages, goto, prev, next, canPrev, canNext })}
					<div class="flex items-center justify-center gap-1">
						<button
							type="button"
							onclick={() => goto(1)}
							disabled={!canPrev}
							aria-label="First page"
							class="border border-(--indigo-dye)/20 p-2 hover:border-(--vermilion) disabled:opacity-30"
						>
							<CaretDoubleLeft class="h-4 w-4" />
						</button>
						<button
							type="button"
							onclick={prev}
							disabled={!canPrev}
							aria-label="Previous page"
							class="border border-(--indigo-dye)/20 p-2 hover:border-(--vermilion) disabled:opacity-30"
						>
							<CaretLeft class="h-4 w-4" />
						</button>
						{#each pages as item, i (i)}
							{#if item === 'ellipsis'}
								<span class="px-2 text-(--charcoal)/40">…</span>
							{:else}
								<button
									type="button"
									onclick={() => goto(item)}
									aria-current={item === p ? 'page' : undefined}
									aria-label={`Page ${item}`}
									class="min-w-9 border px-3 py-1 transition-colors {item === p
										? 'border-(--vermilion) bg-(--vermilion) text-white'
										: 'border-(--indigo-dye)/20 hover:border-(--vermilion)'}"
								>
									{item}
								</button>
							{/if}
						{/each}
						<button
							type="button"
							onclick={next}
							disabled={!canNext}
							aria-label="Next page"
							class="border border-(--indigo-dye)/20 p-2 hover:border-(--vermilion) disabled:opacity-30"
						>
							<CaretRight class="h-4 w-4" />
						</button>
						<button
							type="button"
							onclick={() => goto(totalPages)}
							disabled={!canNext}
							aria-label="Last page"
							class="border border-(--indigo-dye)/20 p-2 hover:border-(--vermilion) disabled:opacity-30"
						>
							<CaretDoubleRight class="h-4 w-4" />
						</button>
					</div>
					<p class="mt-4 text-center text-sm text-(--charcoal)/60">
						Page {p} of {totalPages}
					</p>
				{/snippet}
			</Pagination>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'page',
				type: 'number',
				default: '1',
				description: 'Bindable current page (1-indexed)'
			},
			{ name: 'count', type: 'number', default: '0', description: 'Total item count' },
			{ name: 'pageSize', type: 'number', default: '10' },
			{ name: 'siblingCount', type: 'number', default: '1' },
			{ name: 'boundaryCount', type: 'number', default: '1' },
			{ name: 'aria-label', type: 'string', default: "'Pagination'" },
			{ name: 'onChange', type: '(page: number) => void', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">&lt;nav aria-label="Pagination"&gt;</code> wraps a list',
			'Current page button has <code class="rounded bg-(--cream) px-1">aria-current="page"</code>',
			'Each button has <code class="rounded bg-(--cream) px-1">aria-label</code> (e.g. "Go to page 3", "Previous page")',
			'Ellipsis renders as <code class="rounded bg-(--cream) px-1">aria-hidden</code> spacer'
		]}
	/>
</main>
