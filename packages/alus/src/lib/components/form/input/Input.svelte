<script lang="ts">
	import { labelAttrs, validationAttrs, mergeAttrs } from '../../../utils/a11y/index.js';
	import type {
		InputType,
		InputMode,
		AutocompleteValue,
		AriaBoolean
	} from '../../../types/index.js';

	interface Props {
		type?: InputType;
		placeholder?: string;
		value?: string;
		class?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		name?: string;
		id?: string;
		min?: number | string;
		max?: number | string;
		step?: number | string;
		pattern?: string;
		minlength?: number;
		maxlength?: number;
		autocomplete?: AutocompleteValue;
		inputmode?: InputMode;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		onkeyup?: (event: KeyboardEvent) => void;
		// Accessibility attributes
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: AriaBoolean;
		'aria-required'?: AriaBoolean;
		'aria-errormessage'?: string;
		tabindex?: number;
	}

	let {
		type = 'text',
		placeholder = '',
		value = $bindable(),
		class: className = '',
		disabled = false,
		readonly = false,
		required = false,
		name,
		id,
		min,
		max,
		step,
		pattern,
		minlength,
		maxlength,
		autocomplete,
		inputmode,
		oninput,
		onchange,
		onfocus,
		onblur,
		onkeydown,
		onkeyup,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-required': ariaRequired,
		'aria-errormessage': ariaErrormessage,
		tabindex
	}: Props = $props();

	// Build ARIA attributes using reusable utilities
	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			validationAttrs({
				invalid: ariaInvalid === 'false' ? false : ariaInvalid === 'true' ? true : ariaInvalid,
				required: (ariaRequired === 'false' ? false : ariaRequired === 'true' ? true : ariaRequired) ?? required,
				errormessage: ariaErrormessage
			})
		)
	);
</script>

<input
	{type}
	{placeholder}
	bind:value
	{disabled}
	{readonly}
	{required}
	{name}
	{id}
	{min}
	{max}
	{step}
	{pattern}
	{minlength}
	{maxlength}
	{autocomplete}
	{inputmode}
	class={className}
	{oninput}
	{onchange}
	{onfocus}
	{onblur}
	{onkeydown}
	{onkeyup}
	tabindex={tabindex}
	{...ariaAttrs}
/>
