<script lang="ts">
	import { CaretLeft, MagnifyingGlass, X } from 'phosphor-svelte';
	import { resolve } from '$app/paths';
	import { SearchInput, Label } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { SearchInput } from 'alus-ui';
	import { resolve } from '$app/paths';
	let q = $state('');
<\/script>

<SearchInput bind:value={q} placeholder="Search…" aria-label="Search" class="w-full" />`;

	let query = $state('');
	let custom = $state('');
</script>

<svelte:head>
	<title>SearchInput · Alus Components</title>
</svelte:head>

<a
	href={resolve('/')}
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">探</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">SearchInput</h1>
				<p class="tracking-widest text-(--bamboo)">検索</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Search input with built-in clear button and <code class="rounded bg-(--cream) px-1"
				>role="search"</code
			>.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Default</span>
			<span class="ml-2 text-lg text-(--bamboo)">既定</span>
		</h2>
		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<Label for="q">Search</Label>
			<SearchInput
				id="q"
				bind:value={query}
				placeholder="Search components…"
				class="flex items-center gap-2 border border-(--indigo-dye)/20 px-3 py-2 focus-within:border-(--vermilion)"
				inputClass="flex-1 bg-transparent placeholder:text-(--charcoal)/40"
			/>
			<p class="text-sm text-(--charcoal)/60">Query: <code>{query || '—'}</code></p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Custom Snippet</span>
			<span class="ml-2 text-lg text-(--bamboo)">独自</span>
		</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<SearchInput bind:value={custom}>
				{#snippet children({ value, clear })}
					<div
						class="flex items-center gap-2 border border-(--indigo-dye)/20 px-3 py-2 focus-within:border-(--vermilion)"
					>
						<MagnifyingGlass class="h-4 w-4 text-(--charcoal)/50" />
						<input
							type="search"
							bind:value={custom}
							placeholder="Custom layout…"
							class="flex-1 bg-transparent placeholder:text-(--charcoal)/40"
						/>
						{#if value}
							<button
								type="button"
								onclick={clear}
								aria-label="Clear"
								class="text-(--charcoal)/60 hover:text-(--vermilion)"
							>
								<X class="h-4 w-4" />
							</button>
						{/if}
					</div>
				{/snippet}
			</SearchInput>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'string', default: "''", description: 'Bindable' },
			{ name: 'placeholder', type: 'string', default: 'undefined' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{
				name: 'onSearch',
				type: '(q: string) => void',
				default: 'undefined',
				description: 'Fires on Enter'
			},
			{ name: 'onClear', type: '() => void', default: 'undefined' },
			{ name: 'aria-label', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;input type="search"&gt;</code> + <code class="rounded bg-(--cream) px-1">role="searchbox"</code>',
			'Clear button has accessible label and resets value',
			'Enter submits; Escape clears'
		]}
	/>
</main>
