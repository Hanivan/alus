<script lang="ts" module>
	import {
		CalendarDate,
		DateFormatter,
		getDayOfWeek,
		getLocalTimeZone,
		isSameDay,
		isToday as iIsToday,
		startOfMonth,
		startOfWeek,
		today as iToday,
		type DateValue
	} from '@internationalized/date';

	export interface CalendarDay {
		date: DateValue;
		jsDate: Date;
		inMonth: boolean;
		isToday: boolean;
		isSelected: boolean;
		isDisabled: boolean;
	}

	export type CalendarView = 'days' | 'months' | 'years';

	export { CalendarDate, type DateValue };

	function isoOf(d: DateValue) {
		return `${d.year}-${d.month}-${d.day}`;
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		value?: DateValue | null;
		viewDate?: DateValue;
		view?: CalendarView;
		min?: DateValue;
		max?: DateValue;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		locale?: string;
		timeZone?: string;
		disabled?: boolean;
		isDateDisabled?: (date: DateValue) => boolean;
		dayDataAttrs?: (day: CalendarDay) => Record<string, string | undefined>;
		onDayHover?: (date: DateValue) => void;
		class?: string;
		headerClass?: string;
		gridClass?: string;
		weekdayClass?: string;
		dayClass?: string;
		monthClass?: string;
		yearClass?: string;
		'aria-label'?: string;
		day?: import('svelte').Snippet<[{ day: CalendarDay }]>;
		onSelect?: (date: DateValue) => void;
		onViewChange?: (viewDate: DateValue) => void;
	}

	let {
		value = $bindable(null),
		viewDate = $bindable(iToday(getLocalTimeZone())),
		view = $bindable('days'),
		min,
		max,
		weekStartsOn,
		locale,
		timeZone = getLocalTimeZone(),
		disabled = false,
		isDateDisabled,
		dayDataAttrs,
		onDayHover,
		class: className = '',
		headerClass = '',
		gridClass = '',
		weekdayClass = '',
		dayClass = '',
		monthClass = '',
		yearClass = '',
		'aria-label': ariaLabel = 'Calendar',
		day,
		onSelect,
		onViewChange
	}: Props = $props();

	const gridId = generateCounterId('calendar-grid');

	const resolvedLocale = $derived(
		locale ?? (typeof navigator !== 'undefined' ? navigator.language : 'en-US')
	);

	const monthYearFormatter = $derived(
		new DateFormatter(resolvedLocale, { month: 'long', year: 'numeric' })
	);
	const monthOnlyFormatter = $derived(new DateFormatter(resolvedLocale, { month: 'long' }));
	const yearOnlyFormatter = $derived(new DateFormatter(resolvedLocale, { year: 'numeric' }));
	const monthShortFormatter = $derived(new DateFormatter(resolvedLocale, { month: 'short' }));
	const weekdayFormatter = $derived(new DateFormatter(resolvedLocale, { weekday: 'short' }));

	const weekdays = $derived.by(() => {
		const out: string[] = [];
		const ref = new CalendarDate(2024, 1, 7);
		const base =
			weekStartsOn !== undefined
				? ref.subtract({ days: getDayOfWeek(ref, resolvedLocale) }).add({ days: weekStartsOn })
				: startOfWeek(ref, resolvedLocale);
		for (let i = 0; i < 7; i++) {
			out.push(weekdayFormatter.format(base.add({ days: i }).toDate(timeZone)));
		}
		return out;
	});

	function withinBounds(d: DateValue) {
		if (min && d.compare(min) < 0) return false;
		if (max && d.compare(max) > 0) return false;
		return true;
	}

	function isDisabled(d: DateValue) {
		if (disabled) return true;
		if (!withinBounds(d)) return true;
		if (isDateDisabled?.(d)) return true;
		return false;
	}

	const days = $derived.by(() => {
		const monthStart = startOfMonth(viewDate);
		const firstCell =
			weekStartsOn !== undefined
				? monthStart.subtract({
						days: (getDayOfWeek(monthStart, resolvedLocale) - weekStartsOn + 7) % 7
					})
				: startOfWeek(monthStart, resolvedLocale);
		const out: CalendarDay[] = [];
		for (let i = 0; i < 42; i++) {
			const d = firstCell.add({ days: i });
			out.push({
				date: d,
				jsDate: d.toDate(timeZone),
				inMonth: d.month === viewDate.month && d.year === viewDate.year,
				isToday: iIsToday(d, timeZone),
				isSelected: value ? isSameDay(d, value) : false,
				isDisabled: isDisabled(d)
			});
		}
		return out;
	});

	const months = $derived.by(() => {
		const out: { date: DateValue; label: string; isCurrent: boolean; isDisabled: boolean }[] = [];
		for (let m = 1; m <= 12; m++) {
			const d = viewDate.set({ month: m, day: 1 });
			const monthEnd = d.set({ day: d.calendar.getDaysInMonth(d) });
			const outOfRange =
				disabled ||
				(min && monthEnd.compare(min) < 0) ||
				(max && d.compare(max) > 0);
			out.push({
				date: d,
				label: monthShortFormatter.format(d.toDate(timeZone)),
				isCurrent: d.month === viewDate.month && d.year === viewDate.year,
				isDisabled: !!outOfRange
			});
		}
		return out;
	});

	const yearRange = $derived.by(() => {
		const base = viewDate.year - ((viewDate.year - 1) % 12);
		return { start: base, end: base + 11 };
	});

	const years = $derived.by(() => {
		const out: { date: DateValue; label: string; isCurrent: boolean; isDisabled: boolean }[] = [];
		for (let y = yearRange.start; y <= yearRange.end; y++) {
			const d = viewDate.set({ year: y, month: 1, day: 1 });
			const yearEnd = viewDate.set({ year: y, month: 12, day: 1 });
			const yearEndDay = yearEnd.set({ day: yearEnd.calendar.getDaysInMonth(yearEnd) });
			const outOfRange =
				disabled ||
				(min && yearEndDay.compare(min) < 0) ||
				(max && d.compare(max) > 0);
			out.push({
				date: d,
				label: yearOnlyFormatter.format(d.toDate(timeZone)),
				isCurrent: y === viewDate.year,
				isDisabled: !!outOfRange
			});
		}
		return out;
	});

	function setView(d: DateValue) {
		viewDate = d;
		onViewChange?.(d);
	}

	function setMode(m: CalendarView) {
		view = m;
	}

	function pickMonth(d: DateValue) {
		setView(d);
		setMode('days');
	}

	function pickYear(d: DateValue) {
		setView(d);
		setMode('months');
	}

	function navPrev() {
		if (view === 'days') setView(viewDate.subtract({ months: 1 }));
		else if (view === 'months') setView(viewDate.subtract({ years: 1 }));
		else setView(viewDate.subtract({ years: 12 }));
	}

	function navNext() {
		if (view === 'days') setView(viewDate.add({ months: 1 }));
		else if (view === 'months') setView(viewDate.add({ years: 1 }));
		else setView(viewDate.add({ years: 12 }));
	}

	function select(d: DateValue) {
		if (isDisabled(d)) return;
		value = d;
		if (d.month !== viewDate.month || d.year !== viewDate.year) setView(d);
		onSelect?.(d);
	}

	function focusDate(d: DateValue) {
		if (d.month !== viewDate.month || d.year !== viewDate.year) setView(d);
		queueMicrotask(() => {
			const el = document.querySelector<HTMLButtonElement>(
				`[data-calendar="${gridId}"] [data-day-iso="${isoOf(d)}"]`
			);
			el?.focus();
		});
	}

	function onDayKey(e: KeyboardEvent, d: DateValue) {
		let next: DateValue | null = null;
		switch (e.key) {
			case 'ArrowLeft':
				next = d.subtract({ days: 1 });
				break;
			case 'ArrowRight':
				next = d.add({ days: 1 });
				break;
			case 'ArrowUp':
				next = d.subtract({ days: 7 });
				break;
			case 'ArrowDown':
				next = d.add({ days: 7 });
				break;
			case 'Home': {
				const dow = getDayOfWeek(d, resolvedLocale);
				const start = weekStartsOn !== undefined ? weekStartsOn : 0;
				next = d.subtract({ days: (dow - start + 7) % 7 });
				break;
			}
			case 'End': {
				const dow = getDayOfWeek(d, resolvedLocale);
				const start = weekStartsOn !== undefined ? weekStartsOn : 0;
				next = d.add({ days: 6 - ((dow - start + 7) % 7) });
				break;
			}
			case 'PageUp':
				next = e.shiftKey ? d.subtract({ years: 1 }) : d.subtract({ months: 1 });
				break;
			case 'PageDown':
				next = e.shiftKey ? d.add({ years: 1 }) : d.add({ months: 1 });
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				select(d);
				return;
			default:
				return;
		}
		e.preventDefault();
		if (next) focusDate(next);
	}

	const tabbableIso = $derived.by(() => {
		const inMonth = days.filter((x) => x.inMonth && !x.isDisabled);
		if (value) {
			const sel = inMonth.find((x) => x.isSelected);
			if (sel) return isoOf(sel.date);
		}
		const t = inMonth.find((x) => x.isToday);
		if (t) return isoOf(t.date);
		return inMonth[0] ? isoOf(inMonth[0].date) : null;
	});

	const dayLabel = $derived(monthYearFormatter.format(viewDate.toDate(timeZone)));
	const monthLabel = $derived(yearOnlyFormatter.format(viewDate.toDate(timeZone)));
	const yearLabel = $derived(`${yearRange.start} – ${yearRange.end}`);

	const headerLabel = $derived(
		view === 'days' ? dayLabel : view === 'months' ? monthLabel : yearLabel
	);

	const monthOnlyLabel = $derived(monthOnlyFormatter.format(viewDate.toDate(timeZone)));
	const yearLabelText = $derived(yearOnlyFormatter.format(viewDate.toDate(timeZone)));
</script>

<div class={className} role="group" aria-label={ariaLabel} data-view={view}>
	<div class={headerClass}>
		<button
			type="button"
			aria-label={view === 'days'
				? 'Previous month'
				: view === 'months'
					? 'Previous year'
					: 'Previous 12 years'}
			onclick={navPrev}>‹</button
		>
		{#if view === 'days'}
			<div data-calendar-label>
				<button
					type="button"
					aria-label="Choose month"
					data-calendar-mode-trigger="months"
					onclick={() => setMode('months')}
				>
					{monthOnlyLabel}
				</button>
				<button
					type="button"
					aria-label="Choose year"
					data-calendar-mode-trigger="years"
					onclick={() => setMode('years')}
				>
					{yearLabelText}
				</button>
			</div>
		{:else if view === 'months'}
			<button
				type="button"
				aria-live="polite"
				data-calendar-label
				data-calendar-mode-trigger="years"
				onclick={() => setMode('years')}
			>
				{headerLabel}
			</button>
		{:else}
			<div aria-live="polite" data-calendar-label>{headerLabel}</div>
		{/if}
		<button
			type="button"
			aria-label={view === 'days'
				? 'Next month'
				: view === 'months'
					? 'Next year'
					: 'Next 12 years'}
			onclick={navNext}>›</button
		>
	</div>

	{#if view === 'days'}
		<div role="grid" aria-label={ariaLabel} data-calendar={gridId} class={gridClass}>
			<div role="row">
				{#each weekdays as wd}
					<div role="columnheader" aria-label={wd} class={weekdayClass}>{wd}</div>
				{/each}
			</div>

			{#each Array.from({ length: 6 }, (_, w) => w) as w (w)}
				<div role="row">
					{#each days.slice(w * 7, w * 7 + 7) as cd (isoOf(cd.date))}
						<div role="gridcell" aria-selected={cd.isSelected}>
							<button
								type="button"
								tabindex={tabbableIso === isoOf(cd.date) ? 0 : -1}
								disabled={cd.isDisabled}
								aria-label={cd.jsDate.toDateString()}
								aria-current={cd.isToday ? 'date' : undefined}
								data-day-iso={isoOf(cd.date)}
								data-in-month={cd.inMonth ? '' : undefined}
								data-out-month={!cd.inMonth ? '' : undefined}
								data-today={cd.isToday ? '' : undefined}
								data-selected={cd.isSelected ? '' : undefined}
								{...(dayDataAttrs?.(cd) ?? {})}
								class={dayClass}
								onclick={() => select(cd.date)}
								onkeydown={(e) => onDayKey(e, cd.date)}
								onpointerenter={() => onDayHover?.(cd.date)}
							>
								{#if day}
									{@render day({ day: cd })}
								{:else}
									{cd.date.day}
								{/if}
							</button>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	{:else if view === 'months'}
		<div role="grid" aria-label={`${ariaLabel} months`} class={gridClass} data-calendar-months>
			{#each months as m (m.date.month)}
				<button
					type="button"
					disabled={m.isDisabled}
					data-current={m.isCurrent ? '' : undefined}
					class={monthClass}
					onclick={() => pickMonth(m.date)}
				>
					{m.label}
				</button>
			{/each}
		</div>
	{:else}
		<div role="grid" aria-label={`${ariaLabel} years`} class={gridClass} data-calendar-years>
			{#each years as y (y.date.year)}
				<button
					type="button"
					disabled={y.isDisabled}
					data-current={y.isCurrent ? '' : undefined}
					class={yearClass}
					onclick={() => pickYear(y.date)}
				>
					{y.label}
				</button>
			{/each}
		</div>
	{/if}
</div>
