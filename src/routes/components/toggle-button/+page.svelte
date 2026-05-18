<script lang="ts">
	import { CaretLeft, TextB, TextItalic, TextUnderline, Sun, Moon } from 'phosphor-svelte';
	import { ToggleButton } from 'alus';

	let bold = $state(true);
	let italic = $state(false);
	let underline = $state(false);
	let dark = $state(false);
</script>

<svelte:head>
	<title>ToggleButton · Alus Components</title>
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
			<div class="hanko-seal">押</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">ToggleButton</h1>
				<p class="tracking-widest text-(--bamboo)">切替</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Two-state button using <code>aria-pressed</code>. Click toggles. Bindable <code>pressed</code>.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Text formatting</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex gap-2">
				<ToggleButton
					bind:pressed={bold}
					aria-label="Bold"
					class="flex h-10 w-10 items-center justify-center rounded border border-(--charcoal)/20 bg-white text-(--ink) data-[state=on]:border-(--indigo-dye) data-[state=on]:bg-(--indigo-dye) data-[state=on]:text-white"
				>
					<TextB class="h-5 w-5" />
				</ToggleButton>
				<ToggleButton
					bind:pressed={italic}
					aria-label="Italic"
					class="flex h-10 w-10 items-center justify-center rounded border border-(--charcoal)/20 bg-white text-(--ink) data-[state=on]:border-(--indigo-dye) data-[state=on]:bg-(--indigo-dye) data-[state=on]:text-white"
				>
					<TextItalic class="h-5 w-5" />
				</ToggleButton>
				<ToggleButton
					bind:pressed={underline}
					aria-label="Underline"
					class="flex h-10 w-10 items-center justify-center rounded border border-(--charcoal)/20 bg-white text-(--ink) data-[state=on]:border-(--indigo-dye) data-[state=on]:bg-(--indigo-dye) data-[state=on]:text-white"
				>
					<TextUnderline class="h-5 w-5" />
				</ToggleButton>
			</div>
			<p class="mt-4 text-sm text-(--charcoal)/60">
				Bold: {bold} · Italic: {italic} · Underline: {underline}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Theme toggle (snippet children)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ToggleButton
				bind:pressed={dark}
				aria-label="Toggle dark mode"
				class="inline-flex items-center gap-2 rounded border border-(--charcoal)/20 bg-white px-3 py-1.5 text-sm text-(--ink)"
			>
				{#snippet children({ pressed })}
					{#if pressed}<Moon class="h-4 w-4" />Dark{:else}<Sun class="h-4 w-4" />Light{/if}
				{/snippet}
			</ToggleButton>
		</div>
	</section>
</main>
