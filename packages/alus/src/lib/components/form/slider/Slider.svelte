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
		onchange
	}: Props = $props();

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
	{...ariaAttrs}
/>
