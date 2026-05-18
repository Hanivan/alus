<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { DataList, DataListTerm, DataListDescription } from 'alus';
</script>

<svelte:head>
	<title>DataList · Alus Components</title>
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
			<div class="hanko-seal">表</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">DataList</h1>
				<p class="tracking-widest text-(--bamboo)">データリスト</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantic dl/dt/dd for key-value pairs.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DataList class="grid grid-cols-[max-content_1fr] gap-x-8 gap-y-2">
				<DataListTerm class="font-medium text-(--ink)">Name</DataListTerm>
				<DataListDescription class="text-(--charcoal)/80">Mount Fuji</DataListDescription>

				<DataListTerm class="font-medium text-(--ink)">Height</DataListTerm>
				<DataListDescription class="text-(--charcoal)/80">3,776 m</DataListDescription>

				<DataListTerm class="font-medium text-(--ink)">Type</DataListTerm>
				<DataListDescription class="text-(--charcoal)/80">Stratovolcano</DataListDescription>

				<DataListTerm class="font-medium text-(--ink)">Last erupted</DataListTerm>
				<DataListDescription class="text-(--charcoal)/80">1707-1708</DataListDescription>
			</DataList>
		</div>
	</section>
</main>
