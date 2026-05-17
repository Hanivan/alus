<script lang="ts">
	import { CaretLeft, Plus, Minus } from 'phosphor-svelte';
	import { NumberInput, Label } from 'alus';

	let qty = $state<number | null>(1);
	let price = $state<number | null>(9.99);
</script>

<svelte:head>
	<title>NumberInput · Alus Components</title>
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
			<div class="hanko-seal">数</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">NumberInput</h1>
				<p class="tracking-widest text-(--bamboo)">数値</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Number input with increment/decrement buttons. Default layout or fully custom snippet.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Default</span>
			<span class="ml-2 text-lg text-(--bamboo)">既定</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<Label for="qty">Quantity</Label>
			<NumberInput
				id="qty"
				bind:value={qty}
				min={1}
				max={10}
				class="inline-flex items-center border border-(--indigo-dye)/20 [&_button]:px-3 [&_button]:py-2 [&_button:hover]:bg-(--cream) [&_button[disabled]]:opacity-30 [&_input]:w-16 [&_input]:bg-transparent [&_input]:px-2 [&_input]:py-2 [&_input]:text-center"
			/>
			<p class="text-sm text-(--charcoal)/60">Value: {qty ?? '—'}</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Custom Snippet</span>
			<span class="ml-2 text-lg text-(--bamboo)">独自</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<NumberInput bind:value={price} step={0.5} min={0}>
				{#snippet children({ value, increment, decrement })}
					<div class="inline-flex items-center gap-2">
						<button
							type="button"
							onclick={decrement}
							class="border border-(--indigo-dye)/20 p-2 hover:border-(--vermilion)"
							aria-label="Decrease"
						>
							<Minus class="h-4 w-4" />
						</button>
						<div class="font-mono text-2xl text-(--ink)">${value?.toFixed(2) ?? '0.00'}</div>
						<button
							type="button"
							onclick={increment}
							class="border border-(--indigo-dye)/20 p-2 hover:border-(--vermilion)"
							aria-label="Increase"
						>
							<Plus class="h-4 w-4" />
						</button>
					</div>
				{/snippet}
			</NumberInput>
		</div>
	</section>
</main>
