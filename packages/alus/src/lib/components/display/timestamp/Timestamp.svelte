<script lang="ts">
	type Mode = 'absolute' | 'relative' | 'both';
	type Style = 'long' | 'short' | 'narrow';

	interface Props {
		value: Date | string | number;
		mode?: Mode;
		relativeStyle?: Style;
		updateInterval?: number;
		locale?: string;
		dateOptions?: Intl.DateTimeFormatOptions;
		separator?: string;
		class?: string;
		'aria-label'?: string;
	}

	let {
		value,
		mode = 'relative',
		relativeStyle = 'long',
		updateInterval = 30000,
		locale,
		dateOptions = { dateStyle: 'medium', timeStyle: 'short' },
		separator = ' · ',
		class: className = '',
		'aria-label': ariaLabel
	}: Props = $props();

	let now = $state(Date.now());
	const date = $derived(value instanceof Date ? value : new Date(value));

	$effect(() => {
		if (mode === 'absolute') return;
		const id = setInterval(() => {
			now = Date.now();
		}, updateInterval);
		return () => clearInterval(id);
	});

	const absolute = $derived(new Intl.DateTimeFormat(locale, dateOptions).format(date));

	const relative = $derived.by(() => {
		const diffMs = date.getTime() - now;
		const abs = Math.abs(diffMs);
		const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto', style: relativeStyle });
		const units: [Intl.RelativeTimeFormatUnit, number][] = [
			['year', 365 * 24 * 3600 * 1000],
			['month', 30 * 24 * 3600 * 1000],
			['week', 7 * 24 * 3600 * 1000],
			['day', 24 * 3600 * 1000],
			['hour', 3600 * 1000],
			['minute', 60 * 1000],
			['second', 1000]
		];
		if (abs < units[units.length - 1][1]) return rtf.format(0, 'second');
		for (const [unit, ms] of units) {
			if (abs >= ms) return rtf.format(Math.round(diffMs / ms), unit);
		}
		return rtf.format(0, 'second');
	});

	const text = $derived(
		mode === 'absolute'
			? absolute
			: mode === 'relative'
				? relative
				: `${relative}${separator}${absolute}`
	);

	const iso = $derived(date.toISOString());
</script>

<time datetime={iso} title={absolute} class={className} aria-label={ariaLabel ?? text}>
	{text}
</time>
