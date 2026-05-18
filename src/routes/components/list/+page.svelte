<script lang="ts">
	import { CaretLeft, Circle } from 'phosphor-svelte';
	import { List, ListItem } from 'alus';
</script>

<svelte:head>
	<title>List · Alus Components</title>
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
			<div class="hanko-seal">列</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">List</h1>
				<p class="tracking-widest text-(--bamboo)">リスト</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantic ul/ol with explicit list role. Pair with ListItem.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border grid gap-8 bg-white/50 p-8 backdrop-blur-sm md:grid-cols-2">
			<div>
				<h3 class="font-display mb-3 text-lg text-(--ink)">Unordered</h3>
				<List class="space-y-2">
					{#each ['Sakura', 'Maple', 'Bamboo', 'Pine'] as item (item)}
						<ListItem class="flex items-center gap-2 text-(--charcoal)">
							<Circle class="h-2 w-2 fill-(--vermilion) text-(--vermilion)" />
							{item}
						</ListItem>
					{/each}
				</List>
			</div>
			<div>
				<h3 class="font-display mb-3 text-lg text-(--ink)">Ordered</h3>
				<List as="ol" class="list-decimal space-y-2 pl-5">
					{#each ['Wake at dawn', 'Tea ceremony', 'Garden walk'] as item (item)}
						<ListItem class="text-(--charcoal)">{item}</ListItem>
					{/each}
				</List>
			</div>
		</div>
	</section>
</main>
