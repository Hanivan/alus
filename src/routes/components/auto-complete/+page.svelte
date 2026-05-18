<script lang="ts">
	import { CaretLeft, MapPin, MagnifyingGlass, CircleNotch } from 'phosphor-svelte';
	import { AutoComplete, type AutoCompleteOption } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { AutoComplete, type AutoCompleteOption } from 'alus-ui';
	const options: AutoCompleteOption<string>[] = [
		{ value: 'tyo', label: 'Tokyo' },
		{ value: 'kyt', label: 'Kyoto' }
	];
	let value = $state('');
<\/script>

<AutoComplete {options} bind:value aria-label="City" />`;

	interface City {
		id: string;
		name: string;
		country: string;
	}

	const cities: AutoCompleteOption<City>[] = [
		{ value: { id: 'tyo', name: 'Tokyo', country: 'Japan' }, label: 'Tokyo' },
		{ value: { id: 'kix', name: 'Osaka', country: 'Japan' }, label: 'Osaka' },
		{ value: { id: 'kyt', name: 'Kyoto', country: 'Japan' }, label: 'Kyoto' },
		{ value: { id: 'sap', name: 'Sapporo', country: 'Japan' }, label: 'Sapporo' },
		{ value: { id: 'fuk', name: 'Fukuoka', country: 'Japan' }, label: 'Fukuoka' },
		{ value: { id: 'sel', name: 'Seoul', country: 'South Korea' }, label: 'Seoul' },
		{ value: { id: 'pek', name: 'Beijing', country: 'China' }, label: 'Beijing' },
		{ value: { id: 'sha', name: 'Shanghai', country: 'China' }, label: 'Shanghai' },
		{ value: { id: 'tpe', name: 'Taipei', country: 'Taiwan' }, label: 'Taipei' },
		{ value: { id: 'bkk', name: 'Bangkok', country: 'Thailand' }, label: 'Bangkok' },
		{
			value: { id: 'sgn', name: 'Ho Chi Minh City', country: 'Vietnam' },
			label: 'Ho Chi Minh City'
		},
		{ value: { id: 'sin', name: 'Singapore', country: 'Singapore' }, label: 'Singapore' },
		{ value: { id: 'mnl', name: 'Manila', country: 'Philippines' }, label: 'Manila' },
		{ value: { id: 'kul', name: 'Kuala Lumpur', country: 'Malaysia' }, label: 'Kuala Lumpur' }
	];

	let value = $state('');
	let selected = $state<AutoCompleteOption<City> | null>(null);

	function fuzzy(o: AutoCompleteOption<City>, q: string) {
		const a = o.label.toLowerCase();
		const b = o.value.country.toLowerCase();
		return a.includes(q) || b.includes(q);
	}

	let asyncQuery = $state('');
	let asyncOptions = $state<AutoCompleteOption<string>[]>([]);
	let asyncLoading = $state(false);
	let asyncToken = 0;

	async function onAsyncInput(q: string) {
		asyncQuery = q;
		if (q.trim().length < 2) {
			asyncOptions = [];
			asyncLoading = false;
			return;
		}
		const token = ++asyncToken;
		asyncLoading = true;
		await new Promise((r) => setTimeout(r, 400));
		if (token !== asyncToken) return;
		const generated = Array.from({ length: 5 }, (_, i) => ({
			value: `${q}-${i + 1}`,
			label: `${q.charAt(0).toUpperCase() + q.slice(1)} result ${i + 1}`
		}));
		asyncOptions = generated;
		asyncLoading = false;
	}

	let lockedValue = $state('Kyoto');
</script>

<svelte:head>
	<title>AutoComplete · Alus Components</title>
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
			<div class="hanko-seal">補</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">AutoComplete</h1>
				<p class="tracking-widest text-(--bamboo)">自動補完</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Combobox-pattern input with filtered suggestions. <code>role=combobox</code> + listbox,
			<code>aria-activedescendant</code> for keyboard nav. ArrowUp/Down move, Enter selects.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">City picker</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<AutoComplete
				options={cities}
				bind:value
				bind:selected
				placeholder="Type a city name…"
				aria-label="City"
				class="relative max-w-md"
				inputClass="w-full rounded border-2 border-(--indigo-dye)/20 bg-white px-4 py-3 text-(--ink) transition-colors focus:border-(--indigo-dye) focus:outline-none"
				listClass="z-50 max-h-64 overflow-auto rounded border-2 border-(--indigo-dye)/20 bg-white p-1 shadow-lg"
				optionClass="flex items-center gap-2 rounded px-3 py-2 text-sm text-(--ink) hover:bg-(--charcoal)/5 data-highlighted:bg-(--indigo-dye) data-highlighted:text-white"
				emptyClass="rounded px-3 py-2 text-sm text-(--charcoal)/50"
			>
				{#snippet option({ option: o })}
					<MapPin class="h-4 w-4" />
					<span class="flex-1">{o.label}</span>
					<span class="text-xs opacity-60">{o.value.country}</span>
				{/snippet}
			</AutoComplete>

			<p class="mt-4 text-sm text-(--charcoal)/60">
				Selected: <strong>{selected?.label ?? '—'}</strong>
				{#if selected}
					<span class="ml-2 text-xs opacity-70">({selected.value.country})</span>
				{/if}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Custom filter (also match country)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<AutoComplete
				options={cities}
				filter={fuzzy}
				placeholder="Try “japan” or “china”…"
				aria-label="Fuzzy"
				class="relative max-w-md"
				inputClass="w-full rounded border-2 border-(--indigo-dye)/20 bg-white px-4 py-3 text-(--ink) transition-colors focus:border-(--indigo-dye) focus:outline-none"
				listClass="z-50 max-h-64 overflow-auto rounded border-2 border-(--indigo-dye)/20 bg-white p-1 shadow-lg"
				optionClass="flex items-center justify-between rounded px-3 py-2 text-sm text-(--ink) hover:bg-(--charcoal)/5 data-highlighted:bg-(--indigo-dye) data-highlighted:text-white"
				emptyClass="rounded px-3 py-2 text-sm text-(--charcoal)/50"
			/>
			<p class="mt-3 text-xs text-(--charcoal)/60">
				<code>filter</code> prop receives the full option + lowercased query.
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">
			Async (min 2 chars, debounced via token)
		</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="relative max-w-md">
				<AutoComplete
					options={asyncOptions}
					minLength={2}
					value={asyncQuery}
					onInput={onAsyncInput}
					placeholder="Search remote…"
					aria-label="Async search"
					class="relative"
					inputClass="w-full rounded border-2 border-(--indigo-dye)/20 bg-white px-4 py-3 pr-10 text-(--ink) transition-colors focus:border-(--indigo-dye) focus:outline-none"
					listClass="z-50 max-h-64 overflow-auto rounded border-2 border-(--indigo-dye)/20 bg-white p-1 shadow-lg"
					optionClass="rounded px-3 py-2 text-sm text-(--ink) hover:bg-(--charcoal)/5 data-highlighted:bg-(--indigo-dye) data-highlighted:text-white"
					emptyClass="rounded px-3 py-2 text-sm text-(--charcoal)/50"
				>
					{#snippet empty({ query })}
						{#if asyncLoading}
							<span class="flex items-center gap-2 text-(--charcoal)/60">
								<CircleNotch class="h-3 w-3 animate-spin" />
								Searching…
							</span>
						{:else if query.trim().length < 2}
							<span class="text-(--charcoal)/50">Type at least 2 characters.</span>
						{:else}
							<span class="text-(--charcoal)/50">No matches for “{query}”.</span>
						{/if}
					{/snippet}
				</AutoComplete>
				<div
					class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-(--charcoal)/40"
				>
					{#if asyncLoading}
						<CircleNotch class="h-4 w-4 animate-spin" />
					{:else}
						<MagnifyingGlass class="h-4 w-4" />
					{/if}
				</div>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Disabled</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<AutoComplete
				options={cities}
				value={lockedValue}
				disabled
				aria-label="Disabled"
				class="relative max-w-md"
				inputClass="w-full rounded border-2 border-(--indigo-dye)/10 bg-(--charcoal)/5 px-4 py-3 text-(--charcoal)/60 cursor-not-allowed"
				listClass="hidden"
				optionClass=""
				emptyClass=""
			/>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'options', type: 'AutoCompleteOption<T>[]', default: '[]' },
			{ name: 'value', type: 'string', default: "''", description: 'Bindable input text' },
			{
				name: 'selected',
				type: 'AutoCompleteOption<T> | null',
				default: 'null',
				description: 'Bindable'
			},
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'minLength', type: 'number', default: '0' },
			{ name: 'maxResults', type: 'number', default: '50' },
			{
				name: 'filter',
				type: '(o, q) => boolean',
				default: 'label-contains',
				description: 'Custom filter'
			},
			{
				name: 'option',
				type: 'Snippet',
				default: 'undefined',
				description: 'Custom option renderer'
			},
			{ name: 'empty', type: 'Snippet<[{ query }]>', default: 'undefined' },
			{ name: 'onSelect', type: '(o) => void', default: 'undefined' },
			{ name: 'onInput', type: '(v: string) => void', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="combobox"</code> + <code class="rounded bg-(--cream) px-1">role="listbox"</code> pattern',
			'<code class="rounded bg-(--cream) px-1">aria-activedescendant</code> tracks the highlighted option without moving focus',
			'<code class="rounded bg-(--cream) px-1">aria-expanded</code> reflects open state',
			'ArrowUp/Down navigate, Enter selects, Escape closes, Home/End jump'
		]}
	/>
</main>
