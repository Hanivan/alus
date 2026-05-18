<script lang="ts">
	import { CaretLeft, CaretDown } from 'phosphor-svelte';
	import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from 'alus';

	let last = $state('');
</script>

<svelte:head>
	<title>Dropdown · Alus Components</title>
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
			<div class="hanko-seal">下</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Dropdown</h1>
				<p class="tracking-widest text-(--bamboo)">ドロップダウン</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Button-triggered menu — alias for Menu. Keyboard nav + activation-then-close.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<Dropdown>
				<DropdownTrigger
					class="inline-flex items-center gap-2 border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:border-(--vermilion) data-[state=open]:border-(--vermilion)"
				>
					{#snippet children({ open })}
						<span>Sort by</span>
						<CaretDown class="h-4 w-4 transition-transform {open ? 'rotate-180' : ''}" />
					{/snippet}
				</DropdownTrigger>
				<DropdownContent
					class="z-50 min-w-44 border border-(--indigo-dye)/20 bg-white py-1 shadow-lg focus:outline-none"
				>
					{#each ['Name', 'Date', 'Size', 'Type'] as opt (opt)}
						<DropdownItem
							onSelect={() => (last = opt)}
							class="cursor-pointer px-3 py-2 text-(--charcoal) data-[highlighted]:bg-(--cream) data-[highlighted]:text-(--vermilion)"
						>
							{opt}
						</DropdownItem>
					{/each}
				</DropdownContent>
			</Dropdown>

			<p class="text-sm text-(--charcoal)/60">Last selected: <code>{last || '—'}</code></p>
		</div>
	</section>
</main>
