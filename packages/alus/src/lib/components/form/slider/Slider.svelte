<script lang="ts">
	import {
		labelAttrs,
		validationAttrs,
		widgetAttrs,
		interactiveStateAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'children'> {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		required?: boolean;
		orientation?: 'horizontal' | 'vertical';
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-valuetext'?: string;
		onkeydown?: (event: KeyboardEvent) => void;
	}

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		required = false,
		class: className = '',
		orientation = 'horizontal',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-valuetext': ariaValuetext,
		onkeydown,
		...rest
	}: Props = $props();

	let pageStep = $derived(Math.max(1, Math.round((max - min) / 10)));

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled }),
			validationAttrs({ required }),
			widgetAttrs({
				orientation,
				valuenow: value,
				valuemin: min,
				valuemax: max,
				valuetext: ariaValuetext
			})
		)
	);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'PageUp') {
			e.preventDefault();
			value = Math.min(max, value + pageStep);
		} else if (e.key === 'PageDown') {
			e.preventDefault();
			value = Math.max(min, value - pageStep);
		}
		onkeydown?.(e);
	}
</script>

<input
	{...rest}
	type="range"
	{min}
	{max}
	{step}
	{disabled}
	{required}
	bind:value
	class={className}
	onkeydown={handleKeydown}
	{...ariaAttrs}
/>
