<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft, Calendar as CalIcon, Lock } from 'phosphor-svelte';
	import { DatePicker } from 'alus-ui';
	import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { DatePicker } from 'alus-ui';
	import type { DateValue } from '@internationalized/date';
	let value = $state<DateValue | null>(null);
<\/script>

<DatePicker bind:value aria-label="Event date" placeholder="Pick a date…" />`;

	const tz = getLocalTimeZone();
	const now = today(tz);

	let value = $state<DateValue | null>(null);
	let bounded = $state<DateValue | null>(null);
	let futureOnly = $state<DateValue | null>(null);
	let pastOnly = $state<DateValue | null>(null);
	let required = $state<DateValue | null>(null);
	let locked = $state<DateValue | null>(now);
	let localized = $state<DateValue | null>(null);

	const minFuture = now.add({ days: 1 });
	const maxPast = now.subtract({ days: 1 });
	const boundedMin = now.subtract({ days: 7 });
	const boundedMax = now.add({ days: 14 });

	const inputClass =
		'inline-flex items-center gap-2 rounded border border-(--charcoal)/20 bg-white px-3 py-2 text-sm text-(--ink) data-placeholder:text-(--charcoal)/50';
	const popClass = 'z-50 rounded border border-(--charcoal)/15 bg-white p-3 shadow-lg';
	const calClass = 'text-sm text-(--ink)';
	const headerClass =
		'mb-3 flex items-center justify-between gap-1 [&_button]:rounded [&_button]:px-2 [&_button]:py-1 [&_button]:text-(--charcoal)/70 [&_button]:hover:bg-(--charcoal)/10 [&_[data-calendar-label]]:font-display [&_[data-calendar-label]]:flex-1 [&_[data-calendar-label]]:flex [&_[data-calendar-label]]:items-center [&_[data-calendar-label]]:justify-center [&_[data-calendar-label]]:gap-1';
	const gridClass =
		'grid grid-cols-7 gap-0.5 [&>[role=row]]:contents [&[data-calendar-months]]:grid-cols-3 [&[data-calendar-years]]:grid-cols-3';
	const weekdayClass = 'text-center text-xs uppercase tracking-wider text-(--charcoal)/50 py-1';
	const dayClass =
		'h-9 w-9 rounded text-sm text-(--ink) hover:bg-(--charcoal)/10 data-out-month:text-(--charcoal)/30 data-today:font-bold data-today:text-(--vermilion) data-selected:bg-(--indigo-dye) data-selected:text-white disabled:opacity-30 disabled:hover:bg-transparent';
	const monthClass =
		'rounded px-2 py-3 text-sm text-(--ink) hover:bg-(--charcoal)/10 data-current:bg-(--indigo-dye) data-current:text-white disabled:opacity-30 disabled:hover:bg-transparent';

	function fmt(v: DateValue | null) {
		return v
			? `${v.year}-${String(v.month).padStart(2, '0')}-${String(v.day).padStart(2, '0')}`
			: '—';
	}

	let submitted = $state(false);
</script>

<svelte:head>
	<title>DatePicker · Alus Components</title>
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
			<div class="hanko-seal">日</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">DatePicker</h1>
				<p class="tracking-widest text-(--bamboo)">日付選択</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Input button + popover Calendar. Floating-UI positioned, focus restoration, Escape to close.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Pick a date</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DatePicker
				bind:value
				aria-label="Event date"
				class="inline-block"
				{inputClass}
				popoverClass={popClass}
				calendarClass={calClass}
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
			<p class="mt-4 text-sm text-(--charcoal)/60">
				Selected: <strong>{fmt(value)}</strong>
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Bounded (±2 weeks from today)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DatePicker
				bind:value={bounded}
				min={boundedMin}
				max={boundedMax}
				aria-label="Bounded date"
				class="inline-block"
				{inputClass}
				popoverClass={popClass}
				calendarClass={calClass}
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
			<p class="mt-3 text-xs text-(--charcoal)/60">
				Range: {fmt(boundedMin)} – {fmt(boundedMax)}
			</p>
			<p class="mt-1 text-sm text-(--charcoal)/60">Selected: <strong>{fmt(bounded)}</strong></p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Future-only (min = tomorrow)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DatePicker
				bind:value={futureOnly}
				min={minFuture}
				placeholder="Pick a future date…"
				aria-label="Future date"
				class="inline-block"
				{inputClass}
				popoverClass={popClass}
				calendarClass={calClass}
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Past-only (max = yesterday)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DatePicker
				bind:value={pastOnly}
				max={maxPast}
				placeholder="Pick a past date…"
				aria-label="Past date"
				class="inline-block"
				{inputClass}
				popoverClass={popClass}
				calendarClass={calClass}
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Japanese locale (long format)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<DatePicker
				bind:value={localized}
				locale="ja-JP"
				dateOptions={{ year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }}
				placeholder="日付を選択…"
				aria-label="日付"
				class="inline-block"
				{inputClass}
				popoverClass={popClass}
				calendarClass={calClass}
				{headerClass}
				{gridClass}
				{weekdayClass}
				{dayClass}
				{monthClass}
				yearClass={monthClass}
			/>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Required (in form)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<form
				onsubmit={(e) => {
					e.preventDefault();
					submitted = true;
				}}
				class="flex flex-col items-start gap-3"
			>
				<DatePicker
					bind:value={required}
					required
					placeholder="Required date…"
					aria-label="Required date"
					class="inline-block"
					inputClass="inline-flex items-center gap-2 rounded border bg-white px-3 py-2 text-sm text-(--ink) data-placeholder:text-(--charcoal)/50 border-(--charcoal)/20 data-required:border-(--indigo-dye)/40"
					popoverClass={popClass}
					calendarClass={calClass}
					{headerClass}
					{gridClass}
					{weekdayClass}
					{dayClass}
					{monthClass}
					yearClass={monthClass}
				/>
				<button type="submit" class="rounded bg-(--indigo-dye) px-3 py-1.5 text-sm text-white">
					Submit
				</button>
				{#if submitted}
					<p class="text-sm text-(--matcha)">Submitted: {fmt(required)}</p>
				{/if}
			</form>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Disabled</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="inline-flex items-center gap-3">
				<DatePicker
					bind:value={locked}
					disabled
					aria-label="Locked date"
					class="inline-block"
					inputClass="inline-flex items-center gap-2 rounded border border-(--charcoal)/15 bg-(--charcoal)/5 px-3 py-2 text-sm text-(--charcoal)/50 cursor-not-allowed"
					popoverClass={popClass}
					calendarClass={calClass}
					{headerClass}
					{gridClass}
					{weekdayClass}
					{dayClass}
					{monthClass}
					yearClass={monthClass}
				/>
				<Lock class="h-4 w-4 text-(--charcoal)/40" />
				<CalIcon class="h-4 w-4 text-(--charcoal)/40" />
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'DateValue | null', default: 'null', description: 'Bindable' },
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'min / max', type: 'DateValue', default: 'undefined' },
			{ name: 'locale', type: 'string', default: 'navigator.language' },
			{ name: 'timeZone', type: 'string', default: 'getLocalTimeZone()' },
			{
				name: 'dateOptions',
				type: 'Intl.DateTimeFormatOptions',
				default: '{ year, month: short, day }'
			},
			{ name: 'placeholder', type: 'string', default: "'Select date…'" },
			{ name: 'closeOnSelect', type: 'boolean', default: 'true' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'isDateDisabled', type: '(d) => boolean', default: 'undefined' },
			{ name: 'onSelect', type: '(d: DateValue) => void', default: 'undefined' }
		]}
		a11y={[
			'Trigger uses <code class="rounded bg-(--cream) px-1">aria-haspopup="dialog"</code> + <code class="rounded bg-(--cream) px-1">aria-expanded</code> + <code class="rounded bg-(--cream) px-1">aria-controls</code>',
			'Popover is <code class="rounded bg-(--cream) px-1">role="dialog"</code> with accessible label',
			'Escape closes and restores focus to the trigger',
			'Outside click closes; Floating-UI keeps popover inside the viewport',
			'Hosted Calendar carries its full grid + keyboard support'
		]}
	/>
</main>
