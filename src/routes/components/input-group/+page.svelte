<script lang="ts">
	import { CaretLeft, At, MagnifyingGlass, CurrencyDollar } from 'phosphor-svelte';
	import { InputGroup, Input } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<InputGroup>
	{#snippet prefix()}<span>$</span>{/snippet}
	<Input type="number" placeholder="0.00" />
	{#snippet suffix()}<span>USD</span>{/snippet}
</InputGroup>`;
</script>

<svelte:head>
	<title>InputGroup · Alus Components</title>
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
			<div class="hanko-seal">組</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">InputGroup</h1>
				<p class="tracking-widest text-(--bamboo)">入力群</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Input with prefix/suffix addons via snippets.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<InputGroup
				class="flex items-center border border-(--indigo-dye)/20 focus-within:border-(--vermilion)"
			>
				{#snippet prefix()}
					<span class="grid h-10 w-10 place-items-center bg-(--cream) text-(--charcoal)/60">
						<At class="h-4 w-4" />
					</span>
				{/snippet}
				<Input
					type="email"
					placeholder="you@example.com"
					class="flex-1 bg-transparent px-3 py-2 placeholder:text-(--charcoal)/40 focus:outline-none"
				/>
			</InputGroup>

			<InputGroup
				class="flex items-center border border-(--indigo-dye)/20 focus-within:border-(--vermilion)"
			>
				{#snippet prefix()}
					<span class="grid h-10 w-10 place-items-center text-(--charcoal)/60">
						<MagnifyingGlass class="h-4 w-4" />
					</span>
				{/snippet}
				<Input
					placeholder="Search..."
					class="flex-1 bg-transparent px-2 py-2 placeholder:text-(--charcoal)/40 focus:outline-none"
				/>
				{#snippet suffix()}
					<button class="bg-(--vermilion) px-4 py-2 text-sm text-white">Go</button>
				{/snippet}
			</InputGroup>

			<InputGroup
				class="flex items-center border border-(--indigo-dye)/20 focus-within:border-(--vermilion)"
			>
				{#snippet prefix()}
					<span class="grid h-10 w-10 place-items-center bg-(--cream) text-(--charcoal)/60">
						<CurrencyDollar class="h-4 w-4" />
					</span>
				{/snippet}
				<Input
					type="number"
					placeholder="0.00"
					class="flex-1 bg-transparent px-3 py-2 placeholder:text-(--charcoal)/40 focus:outline-none"
				/>
				{#snippet suffix()}
					<span class="px-3 text-sm text-(--charcoal)/60">USD</span>
				{/snippet}
			</InputGroup>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'prefix', type: 'Snippet', default: 'undefined' },
			{ name: 'suffix', type: 'Snippet', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Addons are <code class="rounded bg-(--cream) px-1">aria-hidden</code> when purely decorative',
			'Use <code class="rounded bg-(--cream) px-1">aria-describedby</code> on the inner Input to associate textual addons',
			'Keyboard behaviour is delegated to the child Input — no extra handling needed'
		]}
	/>
</main>
