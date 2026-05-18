<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Calendar } from 'alus';
	import {
		type DateValue,
		getLocalTimeZone,
		today,
		isSameDay
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
				headerClass="mb-3 flex items-center justify-between gap-1 [&_button]:rounded [&_button]:px-2 [&_button]:py-1 [&_button]:text-(--charcoal)/70 [&_button]:hover:bg-(--cream) [&_[data-calendar-label]]:font-display [&_[data-calendar-label]]:flex-1 [&_[data-calendar-label]]:flex [&_[data-calendar-label]]:items-center [&_[data-calendar-label]]:justify-center [&_[data-calendar-label]]:gap-1"
				gridClass="grid grid-cols-7 gap-0.5 [&>[role=row]]:contents [&[data-calendar-months]]:grid-cols-3 [&[data-calendar-years]]:grid-cols-3"
				weekdayClass="text-center text-xs uppercase tracking-wider text-(--charcoal)/50 py-1"
				dayClass="h-9 w-9 rounded text-sm text-(--ink) hover:bg-(--cream) data-[out-month]:text-(--charcoal)/30 data-[today]:font-bold data-[today]:text-(--vermilion) data-[selected]:bg-(--indigo-dye) data-[selected]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
				monthClass="rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--cream) data-[current]:bg-(--indigo-dye) data-[current]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
				yearClass="rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--cream) data-[current]:bg-(--indigo-dye) data-[current]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
			/>
			<p class="mt-4 text-sm text-(--charcoal)/60">
				Selected:
				<strong>
					{value ? `${value.year}-${String(value.month).padStart(2, '0')}-${String(value.day).padStart(2, '0')}` : '—'}
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
				headerClass="mb-3 flex items-center justify-between gap-1 [&_button]:rounded [&_button]:px-2 [&_button]:py-1 [&_button]:text-(--charcoal)/70 [&_button]:hover:bg-(--cream) [&_[data-calendar-label]]:font-display [&_[data-calendar-label]]:flex-1 [&_[data-calendar-label]]:flex [&_[data-calendar-label]]:items-center [&_[data-calendar-label]]:justify-center [&_[data-calendar-label]]:gap-1"
				gridClass="grid grid-cols-7 gap-0.5 [&>[role=row]]:contents [&[data-calendar-months]]:grid-cols-3 [&[data-calendar-years]]:grid-cols-3"
				weekdayClass="text-center text-xs uppercase tracking-wider text-(--charcoal)/50 py-1"
				dayClass="h-9 w-9 rounded text-sm text-(--ink) hover:bg-(--cream) data-[out-month]:text-(--charcoal)/30 data-[today]:font-bold data-[today]:text-(--vermilion) data-[selected]:bg-(--indigo-dye) data-[selected]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
				monthClass="rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--cream) data-[current]:bg-(--indigo-dye) data-[current]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
				yearClass="rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--cream) data-[current]:bg-(--indigo-dye) data-[current]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
			/>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Japanese locale</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Calendar
				value={null}
				locale="ja-JP"
				class="inline-block rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink)"
				headerClass="mb-3 flex items-center justify-between gap-1 [&_button]:rounded [&_button]:px-2 [&_button]:py-1 [&_button]:text-(--charcoal)/70 [&_button]:hover:bg-(--cream) [&_[data-calendar-label]]:font-display [&_[data-calendar-label]]:flex-1 [&_[data-calendar-label]]:flex [&_[data-calendar-label]]:items-center [&_[data-calendar-label]]:justify-center [&_[data-calendar-label]]:gap-1"
				gridClass="grid grid-cols-7 gap-0.5 [&>[role=row]]:contents [&[data-calendar-months]]:grid-cols-3 [&[data-calendar-years]]:grid-cols-3"
				weekdayClass="text-center text-xs uppercase tracking-wider text-(--charcoal)/50 py-1"
				dayClass="h-9 w-9 rounded text-sm text-(--ink) hover:bg-(--cream) data-[out-month]:text-(--charcoal)/30 data-[today]:font-bold data-[today]:text-(--vermilion) data-[selected]:bg-(--indigo-dye) data-[selected]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
				monthClass="rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--cream) data-[current]:bg-(--indigo-dye) data-[current]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
				yearClass="rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--cream) data-[current]:bg-(--indigo-dye) data-[current]:text-white disabled:opacity-30 disabled:hover:bg-transparent"
			/>
		</div>
	</section>
</main>
