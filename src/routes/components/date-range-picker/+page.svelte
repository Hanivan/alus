<script lang="ts">
	import { CaretLeft, CalendarBlank } from 'phosphor-svelte';
	import { DateRangePicker } from 'alus-ui';
	import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { DateRangePicker } from 'alus-ui';
	import type { DateValue } from '@internationalized/date';
	let start = $state<DateValue | null>(null);
	let end = $state<DateValue | null>(null);
<\/script>

<DateRangePicker bind:start bind:end placeholder="Pick dates…" aria-label="Trip dates" />`;

	const tz = getLocalTimeZone();
	const now = today(tz);

	let start = $state<DateValue | null>(null);
	let end = $state<DateValue | null>(null);

	let start2 = $state<DateValue | null>(null);
	let end2 = $state<DateValue | null>(null);

	function fmt(d: DateValue | null) {
		return d
			? `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
			: '—';
	}

	const inputClass =
		'inline-flex items-center gap-2 rounded border-2 border-(--indigo-dye)/20 bg-white px-3 py-2 text-sm text-(--ink) transition-colors focus:border-(--indigo-dye) data-placeholder:text-(--charcoal)/50';
	const popClass = 'z-50 rounded border-2 border-(--indigo-dye)/20 bg-white p-3 shadow-lg';
	const calClass = 'text-sm text-(--ink)';
	const headerClass =
		'mb-3 flex items-center justify-between gap-1 [&_button]:rounded [&_button]:px-2 [&_button]:py-1 [&_button]:text-(--charcoal)/70 [&_button]:hover:bg-(--charcoal)/10 [&_[data-calendar-label]]:font-display [&_[data-calendar-label]]:flex-1 [&_[data-calendar-label]]:flex [&_[data-calendar-label]]:items-center [&_[data-calendar-label]]:justify-center [&_[data-calendar-label]]:gap-1';
	const gridClass =
		'grid grid-cols-7 gap-0.5 [&>[role=row]]:contents [&[data-calendar-months]]:grid-cols-3 [&[data-calendar-years]]:grid-cols-3';
	const weekdayClass = 'text-center text-xs uppercase tracking-wider text-(--charcoal)/50 py-1';
	const dayClass =
		'h-9 w-9 rounded text-sm text-(--ink) hover:bg-(--charcoal)/10 ' +
		'data-out-month:text-(--charcoal)/30 ' +
		'data-today:font-bold data-today:text-(--vermilion) ' +
		'data-in-range:rounded-none data-in-range:bg-(--indigo-dye)/15 data-in-range:text-(--ink) ' +
		'data-range-start:bg-(--indigo-dye) data-range-start:text-white data-range-start:rounded-l-md data-range-start:rounded-r-none ' +
		'data-range-end:bg-(--indigo-dye) data-range-end:text-white data-range-end:rounded-r-md data-range-end:rounded-l-none ' +
		'disabled:opacity-30 disabled:hover:bg-transparent';
	const monthClass =
		'rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--charcoal)/10 data-current:bg-(--indigo-dye) data-current:text-white disabled:opacity-30';
</script>

<svelte:head>
	<title>DateRangePicker · Alus Components</title>
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
			<div class="hanko-seal">期</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">DateRangePicker</h1>
				<p class="tracking-widest text-(--bamboo)">期間ピッカー</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Button trigger + popover with two-month <code>DateRange</code>. Auto-closes after end-date is
			picked.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Two-month popover</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DateRangePicker
				bind:start
				bind:end
				aria-label="Trip dates"
				class="inline-block"
				{inputClass}
				popoverClass={popClass}
				rangeClass={calClass}
				monthsClass="flex gap-6"
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
			<p class="mt-4 text-sm text-(--charcoal)/60">
				Start: <strong>{fmt(start)}</strong> · End: <strong>{fmt(end)}</strong>
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Single-month, ja-JP locale</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DateRangePicker
				bind:start={start2}
				bind:end={end2}
				numberOfMonths={1}
				locale="ja-JP"
				dateOptions={{ year: 'numeric', month: 'short', day: 'numeric' }}
				placeholder="期間を選択…"
				aria-label="期間"
				class="inline-block"
				{inputClass}
				popoverClass={popClass}
				rangeClass={calClass}
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
			<p class="mt-3 inline-flex items-center gap-1 text-xs text-(--charcoal)/60">
				<CalendarBlank class="h-3 w-3" /> Min: today, no max.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'start / end', type: 'DateValue | null', default: 'null', description: 'Bindable' },
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'numberOfMonths', type: '1 | 2', default: '2' },
			{ name: 'min / max', type: 'DateValue', default: 'undefined' },
			{ name: 'locale', type: 'string', default: 'navigator.language' },
			{ name: 'separator', type: 'string', default: "'–'" },
			{ name: 'closeOnSelect', type: 'boolean', default: 'true' },
			{ name: 'placeholder', type: 'string', default: "'Select range…'" },
			{ name: 'onChange', type: '(r: DateRangeValue) => void', default: 'undefined' }
		]}
		a11y={[
			'Trigger button advertises a dialog popover (<code class="rounded bg-(--cream) px-1">aria-haspopup="dialog"</code>)',
			'Auto-closes once both start and end are picked',
			'Escape closes and returns focus to the trigger',
			'Embedded DateRange retains its full keyboard contract'
		]}
	/>
</main>
