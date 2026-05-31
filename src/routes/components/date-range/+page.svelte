<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft } from 'phosphor-svelte';
	import { DateRange, type DateRangeValue } from 'alus-ui';
	import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { DateRange } from 'alus-ui';
	import type { DateValue } from '@internationalized/date';
	let start = $state<DateValue | null>(null);
	let end = $state<DateValue | null>(null);
<\/script>

<DateRange bind:start bind:end numberOfMonths={2} aria-label="Trip dates" />`;

	const tz = getLocalTimeZone();
	const now = today(tz);

	let start = $state<DateValue | null>(null);
	let end = $state<DateValue | null>(null);

	let start2 = $state<DateValue | null>(now);
	let end2 = $state<DateValue | null>(now.add({ days: 7 }));

	let start3 = $state<DateValue | null>(null);
	let end3 = $state<DateValue | null>(null);

	const dayClass =
		'h-9 w-9 rounded text-sm text-(--ink) hover:bg-(--charcoal)/10 ' +
		'data-out-month:text-(--charcoal)/30 ' +
		'data-today:font-bold data-today:text-(--vermilion) ' +
		'data-in-range:rounded-none data-in-range:bg-(--indigo-dye)/15 data-in-range:text-(--ink) ' +
		'data-range-start:bg-(--indigo-dye) data-range-start:text-white data-range-start:rounded-l-md data-range-start:rounded-r-none ' +
		'data-range-end:bg-(--indigo-dye) data-range-end:text-white data-range-end:rounded-r-md data-range-end:rounded-l-none ' +
		'disabled:opacity-30 disabled:hover:bg-transparent';

	const headerClass =
		'mb-3 flex items-center justify-between gap-1 [&_button]:rounded [&_button]:px-2 [&_button]:py-1 [&_button]:text-(--charcoal)/70 [&_button]:hover:bg-(--charcoal)/10 [&_[data-calendar-label]]:font-display [&_[data-calendar-label]]:flex-1 [&_[data-calendar-label]]:flex [&_[data-calendar-label]]:items-center [&_[data-calendar-label]]:justify-center [&_[data-calendar-label]]:gap-1';
	const gridClass =
		'grid grid-cols-7 gap-0.5 [&>[role=row]]:contents [&[data-calendar-months]]:grid-cols-3 [&[data-calendar-years]]:grid-cols-3';
	const weekdayClass = 'text-center text-xs uppercase tracking-wider text-(--charcoal)/50 py-1';
	const monthClass =
		'rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--charcoal)/10 data-current:bg-(--indigo-dye) data-current:text-white disabled:opacity-30';

	function fmt(d: DateValue | null) {
		return d
			? `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`
			: '—';
	}

	function range(r: DateRangeValue) {
		if (!r.start || !r.end) return '—';
		const days = r.end.compare(r.start) + 1;
		return `${days} day${days === 1 ? '' : 's'}`;
	}

	let lastChange = $state<DateRangeValue | null>(null);
</script>

<svelte:head>
	<title>DateRange · Alus Components</title>
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
			<div class="hanko-seal">範</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">DateRange</h1>
				<p class="tracking-widest text-(--bamboo)">期間選択</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Range selection. First click sets <strong>start</strong>, second sets <strong>end</strong> (auto-swaps
			if before start). Hover preview between. Third click restarts.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Single month</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DateRange
				bind:start
				bind:end
				onChange={(r) => (lastChange = r)}
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
			<p class="mt-4 text-sm text-(--charcoal)/60">
				Start: <strong>{fmt(start)}</strong> · End: <strong>{fmt(end)}</strong> · Span:
				<strong>{range({ start, end })}</strong>
			</p>
			{#if lastChange}
				<p class="mt-1 text-xs text-(--charcoal)/50">
					Last onChange: {fmt(lastChange.start)} → {fmt(lastChange.end)}
				</p>
			{/if}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Two months (preset)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DateRange
				bind:start={start2}
				bind:end={end2}
				numberOfMonths={2}
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				monthsClass="flex gap-6"
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
			<p class="mt-4 text-sm text-(--charcoal)/60">
				Start: <strong>{fmt(start2)}</strong> · End: <strong>{fmt(end2)}</strong> · Span:
				<strong>{range({ start: start2, end: end2 })}</strong>
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Bounded (today → +30 days)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DateRange
				bind:start={start3}
				bind:end={end3}
				min={now}
				max={now.add({ days: 30 })}
				numberOfMonths={2}
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				monthsClass="flex gap-6"
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'start', type: 'DateValue | null', default: 'null', description: 'Bindable' },
			{ name: 'end', type: 'DateValue | null', default: 'null', description: 'Bindable' },
			{ name: 'numberOfMonths', type: '1 | 2', default: '1' },
			{ name: 'min / max', type: 'DateValue', default: 'undefined' },
			{ name: 'locale', type: 'string', default: 'navigator.language' },
			{ name: 'timeZone', type: 'string', default: 'getLocalTimeZone()' },
			{ name: 'isDateDisabled', type: '(d) => boolean', default: 'undefined' },
			{ name: 'onChange', type: '(r: DateRangeValue) => void', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="group"</code> wraps both Calendars',
			'Each Calendar keeps its full grid + arrow-key navigation',
			'Day buttons get <code class="rounded bg-(--cream) px-1">data-range-start</code>, <code class="rounded bg-(--cream) px-1">data-range-end</code>, <code class="rounded bg-(--cream) px-1">data-in-range</code> for styling',
			'Hover preview between start and prospective end is announced via aria-selected'
		]}
	/>
</main>
