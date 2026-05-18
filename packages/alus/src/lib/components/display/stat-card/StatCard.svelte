<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	type Trend = 'up' | 'down' | 'flat';

	interface Props {
		label: string;
		value: string | number;
		valueClass?: string;
		labelClass?: string;
		hint?: string;
		change?: string | number;
		trend?: Trend;
		icon?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		change_snippet?: import('svelte').Snippet<[{ trend: Trend; change: string | number }]>;
		class?: string;
		hintClass?: string;
		changeClass?: string;
		'aria-label'?: string;
		'aria-describedby'?: string;
	}

	let {
		label,
		value,
		valueClass = '',
		labelClass = '',
		hint,
		change,
		trend,
		icon,
		actions,
		change_snippet,
		class: className = '',
		hintClass = '',
		changeClass = '',
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby
	}: Props = $props();

	const labelId = generateCounterId('stat-label');
	const valueId = generateCounterId('stat-value');

	const trendText = $derived(
		trend === 'up' ? ' increased' : trend === 'down' ? ' decreased' : ''
	);
	const inferredLabel = $derived(`${label}: ${value}${trendText}`);
</script>

<div
	role="group"
	class={className}
	data-trend={trend}
	{...mergeAttrs(
		labelAttrs({
			label: ariaLabel,
			labelledby: labelId,
			describedby: ariaDescribedby ?? valueId
		})
	)}
>
	{#if icon}{@render icon()}{/if}
	<div>
		<div id={labelId} class={labelClass}>{label}</div>
		<div id={valueId} class={valueClass} {...labelAttrs({ label: inferredLabel })}>{value}</div>
		{#if change !== undefined}
			{#if change_snippet}
				{@render change_snippet({ trend: trend ?? 'flat', change })}
			{:else}
				<div class={changeClass} data-trend={trend}>{change}</div>
			{/if}
		{/if}
		{#if hint}<div class={hintClass}>{hint}</div>{/if}
	</div>
	{#if actions}{@render actions()}{/if}
</div>
