<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Calendar } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Calendar } from 'alus';
	import { type DateValue, today, getLocalTimeZone } from '@internationalized/date';
	let value = $state<DateValue | null>(null);
<\/script>

<Calendar bind:value min={today(getLocalTimeZone())} aria-label="Event date" />`;
	import {
		type DateValue,
		getLocalTimeZone,
		today,
		isSameDay,
		CalendarDate
	} from '@internationalized/date';

	const tz = getLocalTimeZone();
	const now = today(tz);

	let value = $state<DateValue | null>(null);
	let viewDate = $state<DateValue>(now);

	const max = now.add({ months: 3 });

	function isWeekend(d: DateValue) {
		const js = d.toDate(tz);
		const dow = js.getDay();
		return dow === 0 || dow === 6;
	}

	const locales = [
		{ id: 'en-US', label: 'English (US)' },
		{ id: 'ja-JP', label: '日本語' },
		{ id: 'ar-SA', label: 'العربية (RTL)' },
		{ id: 'fr-FR', label: 'Français' },
		{ id: 'de-DE', label: 'Deutsch' }
	];
	let locale = $state('en-US');
	const isRTL = $derived(locale.startsWith('ar') || locale.startsWith('he'));

	const holidays = [
		new CalendarDate(now.year, 1, 1),
		new CalendarDate(now.year, 5, 5),
		new CalendarDate(now.year, 7, 4),
		new CalendarDate(now.year, 12, 25)
	];
	let withHolidays = $state<DateValue | null>(null);

	function isHoliday(d: DateValue) {
		return holidays.some((h) => isSameDay(h, d));
	}

	let multiRange = $state<DateValue[]>([]);
	function toggleRange(d: DateValue) {
		const idx = multiRange.findIndex((x) => isSameDay(x, d));
		if (idx >= 0) multiRange = multiRange.filter((_, i) => i !== idx);
		else multiRange = [...multiRange, d];
	}

	const baseHeader =
		'mb-3 flex items-center justify-between gap-1 [&_button]:rounded [&_button]:px-2 [&_button]:py-1 [&_button]:text-(--charcoal)/70 [&_button]:hover:bg-(--charcoal)/10 [&_[data-calendar-label]]:font-display [&_[data-calendar-label]]:flex-1 [&_[data-calendar-label]]:flex [&_[data-calendar-label]]:items-center [&_[data-calendar-label]]:justify-center [&_[data-calendar-label]]:gap-1';
	const baseGrid =
		'grid grid-cols-7 gap-0.5 [&>[role=row]]:contents [&[data-calendar-months]]:grid-cols-3 [&[data-calendar-years]]:grid-cols-3';
	const baseWeekday = 'text-center text-xs uppercase tracking-wider text-(--charcoal)/50 py-1';
	const baseDay =
		'h-9 w-9 rounded text-sm text-(--ink) hover:bg-(--charcoal)/10 data-out-month:text-(--charcoal)/30 data-today:font-bold data-today:text-(--vermilion) data-selected:bg-(--indigo-dye) data-selected:text-white disabled:opacity-30 disabled:hover:bg-transparent';
	const baseMonth =
		'rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--charcoal)/10 data-current:bg-(--indigo-dye) data-current:text-white disabled:opacity-30 disabled:hover:bg-transparent';
	const baseYear = baseMonth;
</script>

<svelte:head>
	<title>Calendar · Alus Components</title>
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
			<div class="hanko-seal">暦</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Calendar</h1>
				<p class="tracking-widest text-(--bamboo)">暦表</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Month grid powered by <code>@internationalized/date</code> — timezone-aware
			<code>DateValue</code>, locale-correct weekdays, supports non-Gregorian calendars.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Basic (max = +3 months)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Calendar
				bind:value
				bind:viewDate
				{max}
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				headerClass={baseHeader}
				gridClass={baseGrid}
				weekdayClass={baseWeekday}
				dayClass={baseDay}
				monthClass={baseMonth}
				yearClass={baseYear}
			/>
			<p class="mt-4 text-sm text-(--charcoal)/60">
				Selected:
				<strong>
					{value
						? `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}`
						: '—'}
				</strong>
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Weekdays only (custom isDateDisabled)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Calendar
				value={null}
				isDateDisabled={isWeekend}
				weekStartsOn={1}
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				headerClass={baseHeader}
				gridClass={baseGrid}
				weekdayClass={baseWeekday}
				dayClass={baseDay}
				monthClass={baseMonth}
				yearClass={baseYear}
			/>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Locale switcher</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="mb-4 flex flex-wrap items-center gap-2">
				{#each locales as l (l.id)}
					<button
						type="button"
						onclick={() => (locale = l.id)}
						class="rounded border px-2.5 py-1 text-xs {locale === l.id
							? 'border-(--indigo-dye) bg-(--indigo-dye) text-white'
							: 'border-(--charcoal)/20 text-(--ink) hover:bg-(--charcoal)/5'}"
					>
						{l.label}
					</button>
				{/each}
			</div>
			<div dir={isRTL ? 'rtl' : 'ltr'}>
				<Calendar
					value={null}
					{locale}
					class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
					headerClass={baseHeader}
					gridClass={baseGrid}
					weekdayClass={baseWeekday}
					dayClass={baseDay}
					monthClass={baseMonth}
					yearClass={baseYear}
				/>
			</div>
			<p class="mt-3 text-xs text-(--charcoal)/60">
				Weekday order + month/year labels follow the locale. RTL locales mirror layout via parent
				<code>dir</code> attr.
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Custom day snippet (holidays)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Calendar
				bind:value={withHolidays}
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				headerClass={baseHeader}
				gridClass={baseGrid}
				weekdayClass={baseWeekday}
				dayClass={baseDay}
				monthClass={baseMonth}
				yearClass={baseYear}
			>
				{#snippet day({ day: d })}
					<span class="relative inline-flex h-full w-full items-center justify-center">
						{d.date.day}
						{#if isHoliday(d.date) && d.inMonth}
							<span
								class="absolute top-0.5 right-0.5 h-1.5 w-1.5 rounded-full bg-(--vermilion)"
								aria-label="Holiday"
							></span>
						{/if}
					</span>
				{/snippet}
			</Calendar>
			<p class="mt-3 text-xs text-(--charcoal)/60">
				Red dot marks Jan 1, May 5, Jul 4, Dec 25 — rendered via the <code>day</code> snippet without
				touching component internals.
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Multi-select (external state)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Calendar
				value={null}
				onSelect={toggleRange}
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				headerClass={baseHeader}
				gridClass={baseGrid}
				weekdayClass={baseWeekday}
				dayClass={baseDay}
				monthClass={baseMonth}
				yearClass={baseYear}
			>
				{#snippet day({ day: d })}
					<span
						class="flex h-full w-full items-center justify-center rounded {multiRange.some((x) =>
							isSameDay(x, d.date)
						) && d.inMonth
							? 'bg-(--matcha)/20 font-bold text-(--matcha)'
							: ''}"
					>
						{d.date.day}
					</span>
				{/snippet}
			</Calendar>
			<p class="mt-3 text-sm text-(--charcoal)/60">
				Selected: <strong>{multiRange.length}</strong> dates
				{#if multiRange.length}
					<button
						type="button"
						onclick={() => (multiRange = [])}
						class="ml-2 text-xs text-(--vermilion) underline">clear</button
					>
				{/if}
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'DateValue | null', default: 'null', description: 'Bindable' },
			{
				name: 'viewDate',
				type: 'DateValue',
				default: 'today(tz)',
				description: 'Bindable, controls visible month'
			},
			{
				name: 'view',
				type: "'days' | 'months' | 'years'",
				default: "'days'",
				description: 'Bindable'
			},
			{ name: 'min / max', type: 'DateValue', default: 'undefined' },
			{ name: 'locale', type: 'string', default: 'navigator.language' },
			{ name: 'timeZone', type: 'string', default: 'getLocalTimeZone()' },
			{ name: 'weekStartsOn', type: '0..6', default: 'locale default' },
			{ name: 'isDateDisabled', type: '(d: DateValue) => boolean', default: 'undefined' },
			{
				name: 'dayDataAttrs',
				type: '(d: CalendarDay) => Record<string, string?>',
				default: 'undefined'
			},
			{ name: 'onDayHover', type: '(d: DateValue) => void', default: 'undefined' },
			{ name: 'day', type: 'Snippet<[{ day: CalendarDay }]>', default: 'undefined' },
			{ name: 'onSelect', type: '(d: DateValue) => void', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="grid"</code> + <code class="rounded bg-(--cream) px-1">role="gridcell"</code> + <code class="rounded bg-(--cream) px-1">aria-selected</code>',
			'Arrow keys move day-by-day, Home/End jump to week edges',
			'PageUp/PageDown jump months; Shift+PageUp/PageDown jump years',
			'Enter/Space selects, <code class="rounded bg-(--cream) px-1">aria-current="date"</code> marks today',
			'Locale-aware weekday order and month/year formatting via Intl'
		]}
	/>
</main>
