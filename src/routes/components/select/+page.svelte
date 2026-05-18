<script lang="ts">
	import { CaretLeft, CaretDown, Check } from 'phosphor-svelte';
	import { Select, SelectTrigger, SelectContent, SelectOption } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Select, SelectTrigger, SelectContent, SelectOption } from 'alus-ui';
	let value = $state('');
<\/script>

<Select bind:value aria-label="Country">
	<SelectTrigger class="rounded border-2 border-(--indigo-dye)/20 px-3 py-2">
		{value || 'Choose a country'}
	</SelectTrigger>
	<SelectContent class="rounded border-2 border-(--indigo-dye)/20 bg-white shadow-lg">
		<SelectOption value="jp">Japan</SelectOption>
		<SelectOption value="us">United States</SelectOption>
	</SelectContent>
</Select>`;

	const countries = [
		{ value: 'jp', label: 'Japan' },
		{ value: 'us', label: 'United States' },
		{ value: 'uk', label: 'United Kingdom' },
		{ value: 'fr', label: 'France' },
		{ value: 'de', label: 'Germany' }
	];

	const tagOptions = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'tailwind', label: 'Tailwind' },
		{ value: 'a11y', label: 'Accessibility' },
		{ value: 'design', label: 'Design' }
	];

	let country = $state<string>('jp');
	let tags = $state<string[]>([]);

	const countryLabel = $derived(countries.find((c) => c.value === country)?.label ?? 'Select…');
	const tagsLabel = $derived(
		tags.length === 0
			? 'Select tags…'
			: tags.map((t) => tagOptions.find((o) => o.value === t)?.label).join(', ')
	);
</script>

<svelte:head>
	<title>Select · Alus Components</title>
	<meta name="description" content="Custom-styleable accessible select dropdown" />
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
			<div class="hanko-seal">択</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Select</h1>
				<p class="tracking-widest text-(--bamboo)">セレクト</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Compound select with fully custom-styleable trigger and options. ARIA combobox+listbox
			pattern, floating-ui positioning, keyboard navigation.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Single</span>
			<span class="ml-2 text-lg text-(--bamboo)">単一</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<span id="country-label" class="block text-sm font-medium text-(--charcoal)">Country</span>
			<Select bind:value={country} aria-labelledby="country-label">
				<SelectTrigger
					class="flex w-full items-center justify-between border border-(--indigo-dye)/20 bg-white p-2 transition-colors hover:border-(--vermilion) focus-visible:border-(--vermilion) focus-visible:outline-0"
				>
					<span>{countryLabel}</span>
					<CaretDown class="h-4 w-4 text-(--charcoal)/60" />
				</SelectTrigger>
				<SelectContent
					class="z-50 max-h-60 overflow-auto border border-(--indigo-dye)/20 bg-white shadow-lg focus-visible:outline-0"
				>
					{#each countries as opt (opt.value)}
						<SelectOption
							value={opt.value}
							class="flex cursor-pointer items-center justify-between p-2 text-(--charcoal) data-highlighted:bg-(--indigo-dye)/10 data-selected:font-medium data-selected:text-(--vermilion)"
						>
							{#snippet children({ selected })}
								<span>{opt.label}</span>
								{#if selected}
									<Check class="h-4 w-4" />
								{/if}
							{/snippet}
						</SelectOption>
					{/each}
				</SelectContent>
			</Select>
			<p class="text-sm text-(--charcoal)/60">Selected: {country}</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Multiple</span>
			<span class="ml-2 text-lg text-(--bamboo)">複数</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<span id="tags-label" class="block text-sm font-medium text-(--charcoal)">Tags</span>
			<Select multiple bind:value={tags} aria-labelledby="tags-label">
				<SelectTrigger
					class="flex w-full items-center justify-between border border-(--indigo-dye)/20 bg-white p-2 transition-colors hover:border-(--vermilion) focus-visible:border-(--vermilion) focus-visible:outline-0"
				>
					<span class="truncate text-left">{tagsLabel}</span>
					<CaretDown class="h-4 w-4 shrink-0 text-(--charcoal)/60" />
				</SelectTrigger>
				<SelectContent
					class="z-50 max-h-60 overflow-auto border border-(--indigo-dye)/20 bg-white shadow-lg focus-visible:outline-0"
				>
					{#each tagOptions as opt (opt.value)}
						<SelectOption
							value={opt.value}
							class="flex cursor-pointer items-center justify-between p-2 text-(--charcoal) data-highlighted:bg-(--indigo-dye)/10 data-selected:font-medium data-selected:text-(--vermilion)"
						>
							{#snippet children({ selected })}
								<span>{opt.label}</span>
								{#if selected}
									<Check class="h-4 w-4" />
								{/if}
							{/snippet}
						</SelectOption>
					{/each}
				</SelectContent>
			</Select>
			<p class="text-sm text-(--charcoal)/60">Selected: {tags.join(', ') || 'none'}</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Features</span>
			<span class="ml-2 text-lg text-(--bamboo)">特徴</span>
		</h2>

		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Compound: <code class="rounded bg-(--cream) px-1">Select</code> /
						<code class="rounded bg-(--cream) px-1">SelectTrigger</code> /
						<code class="rounded bg-(--cream) px-1">SelectContent</code> /
						<code class="rounded bg-(--cream) px-1">SelectOption</code></span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>ARIA combobox + listbox pattern with <code class="rounded bg-(--cream) px-1"
							>aria-activedescendant</code
						></span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Keyboard: arrows, Home/End, Enter/Space, Escape, Tab</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Floating-ui positioning with flip + shift + sameWidth</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Style options via <code class="rounded bg-(--cream) px-1">data-highlighted</code>,
						<code class="rounded bg-(--cream) px-1">data-selected</code>,
						<code class="rounded bg-(--cream) px-1">data-disabled</code> attrs</span
					>
				</li>
			</ul>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'value',
				type: 'string',
				default: 'undefined',
				description: 'Bindable. <code>Select</code>'
			},
			{
				name: 'open',
				type: 'boolean',
				default: 'false',
				description: 'Bindable. <code>Select</code>'
			},
			{ name: 'disabled', type: 'boolean', default: 'false', description: '<code>Select</code>' },
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' },
			{
				name: 'value (option)',
				type: 'string',
				default: 'required',
				description: '<code>SelectOption</code>'
			}
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="combobox"</code> on trigger, <code class="rounded bg-(--cream) px-1">role="listbox"</code> on content',
			'<code class="rounded bg-(--cream) px-1">aria-activedescendant</code> tracks highlighted option',
			'Arrow keys navigate, Enter/Space select, Escape closes, Home/End jump to ends',
			'Type-ahead character search',
			'Focus returns to trigger when closed'
		]}
	/>
</main>
