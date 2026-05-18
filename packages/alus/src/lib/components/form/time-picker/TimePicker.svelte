<script lang="ts" module>
	export interface Time {
		hour: number;
		minute: number;
		second?: number;
	}

	function pad(n: number) {
		return n.toString().padStart(2, '0');
	}

	function clamp(n: number, lo: number, hi: number) {
		return Math.min(hi, Math.max(lo, n));
	}
</script>

<script lang="ts">
	import {
		labelAttrs,
		validationAttrs,
		interactiveStateAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';

	interface Props {
		value?: Time | null;
		hour12?: boolean;
		showSeconds?: boolean;
		step?: number;
		minuteStep?: number;
		secondStep?: number;
		disabled?: boolean;
		required?: boolean;
		class?: string;
		fieldClass?: string;
		separatorClass?: string;
		periodClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		onChange?: (value: Time) => void;
	}

	let {
		value = $bindable(null),
		hour12 = false,
		showSeconds = false,
		step = 1,
		minuteStep,
		secondStep,
		disabled = false,
		required = false,
		class: className = '',
		fieldClass = '',
		separatorClass = '',
		periodClass = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		onChange
	}: Props = $props();

	const mStep = $derived(minuteStep ?? step);
	const sStep = $derived(secondStep ?? step);

	const cur = $derived<Time>(value ?? { hour: 0, minute: 0, second: 0 });

	const hourDisplay = $derived.by(() => {
		if (!hour12) return pad(cur.hour);
		const h = cur.hour % 12;
		return pad(h === 0 ? 12 : h);
	});

	const period = $derived(cur.hour >= 12 ? 'PM' : 'AM');

	function emit(next: Time) {
		value = next;
		onChange?.(next);
	}

	function setHour(h: number) {
		emit({ ...cur, hour: clamp(h, 0, 23) });
	}

	function setMinute(m: number) {
		emit({ ...cur, minute: clamp(m, 0, 59) });
	}

	function setSecond(s: number) {
		emit({ ...cur, second: clamp(s, 0, 59) });
	}

	function togglePeriod() {
		setHour((cur.hour + 12) % 24);
	}

	function onHourInput(e: Event) {
		const raw = parseInt((e.target as HTMLInputElement).value || '0', 10);
		if (isNaN(raw)) return;
		if (hour12) {
			const base = clamp(raw, 1, 12) % 12;
			setHour(period === 'PM' ? base + 12 : base);
		} else {
			setHour(raw);
		}
	}

	function onMinuteInput(e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value || '0', 10);
		if (!isNaN(v)) setMinute(v);
	}

	function onSecondInput(e: Event) {
		const v = parseInt((e.target as HTMLInputElement).value || '0', 10);
		if (!isNaN(v)) setSecond(v);
	}

	function onHourKey(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHour(cur.hour + 1 > 23 ? 0 : cur.hour + 1);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHour(cur.hour - 1 < 0 ? 23 : cur.hour - 1);
		}
	}

	function onMinuteKey(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setMinute(cur.minute + mStep > 59 ? 0 : cur.minute + mStep);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			setMinute(cur.minute - mStep < 0 ? 59 : cur.minute - mStep);
		}
	}

	function onSecondKey(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setSecond((cur.second ?? 0) + sStep > 59 ? 0 : (cur.second ?? 0) + sStep);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			setSecond((cur.second ?? 0) - sStep < 0 ? 59 : (cur.second ?? 0) - sStep);
		}
	}

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled }),
			validationAttrs({ required })
		)
	);
</script>

<div class={className} role="group" data-required={required || undefined} {...ariaAttrs}>
	<input
		type="text"
		inputmode="numeric"
		maxlength="2"
		aria-label="Hour"
		{disabled}
		value={hourDisplay}
		class={fieldClass}
		oninput={onHourInput}
		onkeydown={onHourKey}
	/>
	<span class={separatorClass} aria-hidden="true">:</span>
	<input
		type="text"
		inputmode="numeric"
		maxlength="2"
		aria-label="Minute"
		{disabled}
		value={pad(cur.minute)}
		class={fieldClass}
		oninput={onMinuteInput}
		onkeydown={onMinuteKey}
	/>
	{#if showSeconds}
		<span class={separatorClass} aria-hidden="true">:</span>
		<input
			type="text"
			inputmode="numeric"
			maxlength="2"
			aria-label="Second"
			{disabled}
			value={pad(cur.second ?? 0)}
			class={fieldClass}
			oninput={onSecondInput}
			onkeydown={onSecondKey}
		/>
	{/if}
	{#if hour12}
		<button
			type="button"
			class={periodClass}
			{disabled}
			onclick={togglePeriod}
			{...mergeAttrs(
				labelAttrs({ label: `Toggle period, currently ${period}` }),
				interactiveStateAttrs({ pressed: period === 'PM' })
			)}
		>
			{period}
		</button>
	{/if}
</div>
