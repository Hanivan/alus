<script lang="ts">
	import { CaretLeft, Lock, WarningCircle, CheckCircle } from 'phosphor-svelte';
	import { TimePicker, type Time } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { TimePicker, type Time } from 'alus';
	let t = $state<Time | null>({ hour: 9, minute: 30 });
<\/script>

<TimePicker bind:value={t} hour12 showSeconds={false} aria-label="Meeting time" />`;

	let t1 = $state<Time | null>({ hour: 9, minute: 30 });
	let t2 = $state<Time | null>({ hour: 14, minute: 0 });
	let t3 = $state<Time | null>({ hour: 23, minute: 59, second: 30 });

	let locked = $state<Time | null>({ hour: 12, minute: 0 });

	let appt = $state<Time | null>({ hour: 7, minute: 0 });
	const businessOpen = 9;
	const businessClose = 17;
	const outOfHours = $derived(!!appt && (appt.hour < businessOpen || appt.hour >= businessClose));

	let required = $state<Time | null>(null);
	let submitted = $state(false);
</script>

<svelte:head>
	<title>TimePicker · Alus Components</title>
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
			<div class="hanko-seal">時</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">TimePicker</h1>
				<p class="tracking-widest text-(--bamboo)">時刻選択</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Hour / minute (/ second) numeric inputs with ArrowUp/Down to step. Optional
			<code>hour12</code> AM/PM toggle.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">24-hour</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<TimePicker
				bind:value={t1}
				aria-label="Meeting time"
				class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 bg-white px-2 py-1.5 text-(--ink)"
				fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
				separatorClass="text-(--charcoal)/40"
			/>
			<p class="mt-3 text-sm text-(--charcoal)/60">
				Value: {t1 ? `${t1.hour}:${String(t1.minute).padStart(2, '0')}` : '—'}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">12-hour (AM/PM)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<TimePicker
				bind:value={t2}
				hour12
				aria-label="Meeting time (12h)"
				class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 bg-white px-2 py-1.5 text-(--ink)"
				fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
				separatorClass="text-(--charcoal)/40"
				periodClass="ml-1 rounded border border-(--charcoal)/20 px-2 py-0.5 text-xs text-(--ink) aria-pressed:border-(--indigo-dye) aria-pressed:bg-(--indigo-dye) aria-pressed:text-white"
			/>
			<p class="mt-3 text-sm text-(--charcoal)/60">
				Value: {t2 ? `${t2.hour}:${String(t2.minute).padStart(2, '0')}` : '—'}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">With seconds (step=5)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<TimePicker
				bind:value={t3}
				showSeconds
				step={5}
				aria-label="Precise time"
				class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 bg-white px-2 py-1.5 text-(--ink)"
				fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
				separatorClass="text-(--charcoal)/40"
			/>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Disabled</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="inline-flex items-center gap-3">
				<TimePicker
					bind:value={locked}
					disabled
					aria-label="Locked time"
					class="inline-flex items-center gap-1 rounded border border-(--charcoal)/15 bg-(--charcoal)/5 px-2 py-1.5 text-(--charcoal)/50"
					fieldClass="w-10 bg-transparent text-center text-sm outline-none cursor-not-allowed"
					separatorClass="text-(--charcoal)/30"
				/>
				<Lock class="h-4 w-4 text-(--charcoal)/40" />
			</div>
			<p class="mt-3 text-xs text-(--charcoal)/60">
				ArrowUp/Down + typing are blocked. <code>aria-disabled</code> on group.
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">
			Business hours validation (9:00 – 17:00)
		</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<TimePicker
				bind:value={appt}
				aria-label="Appointment time"
				aria-describedby="appt-help"
				class="inline-flex items-center gap-1 rounded border bg-white px-2 py-1.5 text-(--ink) {outOfHours
					? 'border-(--vermilion)/60'
					: 'border-(--matcha)/40'}"
				fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
				separatorClass="text-(--charcoal)/40"
			/>
			<p
				id="appt-help"
				class="mt-3 inline-flex items-center gap-1.5 text-sm {outOfHours
					? 'text-(--vermilion)'
					: 'text-(--matcha)'}"
			>
				{#if outOfHours}
					<WarningCircle class="h-4 w-4" />
					Outside business hours (9:00 – 17:00).
				{:else}
					<CheckCircle class="h-4 w-4" />
					Within business hours.
				{/if}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Required field</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<form
				onsubmit={(e) => {
					e.preventDefault();
					submitted = true;
				}}
				class="inline-flex flex-col items-start gap-3"
			>
				<TimePicker
					bind:value={required}
					required
					aria-label="Departure time"
					class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 bg-white px-2 py-1.5 text-(--ink) data-required:border-(--indigo-dye)/40"
					fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
					separatorClass="text-(--charcoal)/40"
				/>
				<button type="submit" class="rounded bg-(--indigo-dye) px-3 py-1.5 text-sm text-white">
					Submit
				</button>
				{#if submitted}
					<p class="text-sm text-(--matcha)">
						Submitted: {required
							? `${required.hour}:${String(required.minute).padStart(2, '0')}`
							: '(empty)'}
					</p>
				{/if}
			</form>
			<p class="mt-3 text-xs text-(--charcoal)/60">
				<code>data-required</code> hook lets you style required state without aria-required noise.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'value',
				type: 'Time | null',
				default: 'null',
				description: 'Bindable { hour, minute, second? }'
			},
			{ name: 'hour12', type: 'boolean', default: 'false' },
			{ name: 'showSeconds', type: 'boolean', default: 'false' },
			{ name: 'step', type: 'number', default: '1', description: 'Default step for all fields' },
			{ name: 'minuteStep', type: 'number', default: 'step' },
			{ name: 'secondStep', type: 'number', default: 'step' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'onChange', type: '(t: Time) => void', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="group"</code> with <code class="rounded bg-(--cream) px-1">aria-label</code>',
			'Each segment has its own <code class="rounded bg-(--cream) px-1">aria-label</code> (Hour / Minute / Second)',
			'ArrowUp/Down step by configured amount; values wrap at boundaries',
			'AM/PM toggle uses <code class="rounded bg-(--cream) px-1">aria-pressed</code>',
			'<code class="rounded bg-(--cream) px-1">aria-disabled</code> propagates to the group'
		]}
	/>
</main>
