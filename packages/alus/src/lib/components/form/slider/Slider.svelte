<script lang="ts">
	import {
		labelAttrs,
		validationAttrs,
		widgetAttrs,
		interactiveStateAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';

	interface Props {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		id?: string;
		class?: string;
		orientation?: 'horizontal' | 'vertical';
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-valuetext'?: string;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		onkeydown?: (event: KeyboardEvent) => void;
	}

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		required = false,
		name,
		id,
		class: className = '',
		orientation = 'horizontal',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-valuetext': ariaValuetext,
		oninput,
		onchange,
		onkeydown
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
	type="range"
	{id}
	{name}
	{min}
	{max}
	{step}
	{disabled}
	{required}
	bind:value
	class={className}
	{oninput}
	{onchange}
	onkeydown={handleKeydown}
	{...ariaAttrs}
/>
