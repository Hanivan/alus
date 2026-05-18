<script lang="ts">
	import { CaretLeft, MapPin } from 'phosphor-svelte';
	import { AutoComplete, type AutoCompleteOption } from 'alus';

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
		{ value: { id: 'sgn', name: 'Ho Chi Minh City', country: 'Vietnam' }, label: 'Ho Chi Minh City' },
		{ value: { id: 'sin', name: 'Singapore', country: 'Singapore' }, label: 'Singapore' },
		{ value: { id: 'mnl', name: 'Manila', country: 'Philippines' }, label: 'Manila' },
		{ value: { id: 'kul', name: 'Kuala Lumpur', country: 'Malaysia' }, label: 'Kuala Lumpur' }
	];

	let value = $state('');
	let selected = $state<AutoCompleteOption<City> | null>(null);
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
				inputClass="w-full rounded border border-(--charcoal)/20 bg-white px-3 py-2 text-(--ink) outline-none focus:border-(--indigo-dye)"
				listClass="z-50 max-h-64 overflow-auto rounded border border-(--charcoal)/15 bg-white p-1 shadow-lg"
				optionClass="flex items-center gap-2 rounded px-3 py-1.5 text-sm text-(--ink) hover:bg-(--cream) data-[highlighted]:bg-(--indigo-dye) data-[highlighted]:text-white"
				emptyClass="rounded px-3 py-1.5 text-sm text-(--charcoal)/50"
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
</main>
