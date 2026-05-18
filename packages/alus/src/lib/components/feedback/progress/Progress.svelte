<script lang="ts">
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ percent: number; indeterminate: boolean }]>;
		value?: number;
		max?: number;
		min?: number;
		indeterminate?: boolean;
		class?: string;
		indicatorClass?: string;
		id?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		value = 0,
		max = 100,
		min = 0,
		indeterminate = false,
		class: className = '',
		indicatorClass = '',
		id,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby
	}: Props = $props();

	let percent = $derived(
		indeterminate ? 0 : Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))
	);

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			widgetAttrs({
				valuemin: min,
				valuemax: max,
				valuenow: indeterminate ? undefined : value
			})
		)
	);
</script>

<div
	{id}
	role="progressbar"
	class={className}
	data-state={indeterminate ? 'indeterminate' : 'loading'}
	{...ariaAttrs}
>
	{#if children}
		{@render children({ percent, indeterminate })}
	{:else}
		<div
			class={indicatorClass}
			style:width={indeterminate ? '100%' : `${percent}%`}
			data-state={indeterminate ? 'indeterminate' : 'loading'}
		></div>
	{/if}
</div>
