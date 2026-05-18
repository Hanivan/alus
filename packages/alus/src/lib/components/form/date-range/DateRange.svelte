<script lang="ts" module>
	import {
		type DateValue,
		getLocalTimeZone,
		isSameDay,
		today as iToday
	} from '@internationalized/date';

	export interface DateRangeValue {
		start: DateValue | null;
		end: DateValue | null;
	}
</script>

<script lang="ts">
	import Calendar, { type CalendarDay, type CalendarView } from '../calendar/Calendar.svelte';

	interface Props {
		start?: DateValue | null;
		end?: DateValue | null;
		viewDate?: DateValue;
		view?: CalendarView;
		min?: DateValue;
		max?: DateValue;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		locale?: string;
		timeZone?: string;
		disabled?: boolean;
		numberOfMonths?: 1 | 2;
		isDateDisabled?: (date: DateValue) => boolean;
		class?: string;
		monthsClass?: string;
		calendarClass?: string;
		headerClass?: string;
		gridClass?: string;
		weekdayClass?: string;
		dayClass?: string;
		monthClass?: string;
		yearClass?: string;
		'aria-label'?: string;
		onChange?: (range: DateRangeValue) => void;
	}

	let {
		start = $bindable(null),
		end = $bindable(null),
		viewDate = $bindable(iToday(getLocalTimeZone())),
		view = $bindable('days'),
		min,
		max,
		weekStartsOn,
		locale,
		timeZone = getLocalTimeZone(),
		disabled = false,
		numberOfMonths = 1,
		isDateDisabled,
		class: className = '',
		monthsClass = '',
		calendarClass = '',
		headerClass = '',
		gridClass = '',
		weekdayClass = '',
		dayClass = '',
		monthClass = '',
		yearClass = '',
		'aria-label': ariaLabel = 'Date range',
		onChange
	}: Props = $props();

	let hovered = $state<DateValue | null>(null);

	const secondViewDate = $derived(viewDate.add({ months: 1 }));
	let secondView = $state<CalendarView>('days');

	function pick(d: DateValue) {
		if (!start || (start && end)) {
			start = d;
			end = null;
			onChange?.({ start, end });
			return;
		}
		if (d.compare(start) < 0) {
			end = start;
			start = d;
		} else {
			end = d;
		}
		onChange?.({ start, end });
	}

	function dayAttrs(d: CalendarDay): Record<string, string | undefined> {
		const s = !!start && isSameDay(d.date, start);
		const e = !!end && isSameDay(d.date, end);
		const upper = end ?? hovered;
		let between = false;
		if (start && upper && !s && !e) {
			const [lo, hi] = upper.compare(start) < 0 ? [upper, start] : [start, upper];
			between = d.date.compare(lo) >= 0 && d.date.compare(hi) <= 0;
		}
		return {
			'data-range-start': s ? '' : undefined,
			'data-range-end': e ? '' : undefined,
			'data-in-range': between ? '' : undefined
		};
	}

	function onHover(d: DateValue) {
		hovered = d;
	}
</script>

<div class={className} role="group" aria-label={ariaLabel} onpointerleave={() => (hovered = null)}>
	<div class={monthsClass}>
		<Calendar
			value={null}
			bind:viewDate
			bind:view
			{min}
			{max}
			{weekStartsOn}
			{locale}
			{timeZone}
			{disabled}
			{isDateDisabled}
			dayDataAttrs={dayAttrs}
			onDayHover={onHover}
			onSelect={pick}
			class={calendarClass}
			{headerClass}
			{gridClass}
			{weekdayClass}
			{dayClass}
			{monthClass}
			{yearClass}
		/>

		{#if numberOfMonths === 2}
			<Calendar
				value={null}
				viewDate={secondViewDate}
				bind:view={secondView}
				{min}
				{max}
				{weekStartsOn}
				{locale}
				{timeZone}
				{disabled}
				{isDateDisabled}
				dayDataAttrs={dayAttrs}
				onDayHover={onHover}
				onSelect={pick}
				class={calendarClass}
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				{yearClass}
			/>
		{/if}
	</div>
</div>
