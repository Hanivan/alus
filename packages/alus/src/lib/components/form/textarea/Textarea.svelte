<script lang="ts">
	import { labelAttrs, validationAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { AriaBoolean } from '$types/index.js';

	interface Props {
		value?: string;
		placeholder?: string;
		class?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		name?: string;
		id?: string;
		rows?: number;
		cols?: number;
		minlength?: number;
		maxlength?: number;
		wrap?: 'hard' | 'soft' | 'off';
		autocomplete?: 'on' | 'off';
		resize?: 'none' | 'both' | 'horizontal' | 'vertical';
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: AriaBoolean;
		'aria-required'?: AriaBoolean;
		'aria-errormessage'?: string;
		tabindex?: number;
	}

	let {
		value = $bindable(''),
		placeholder = '',
		class: className = '',
		disabled = false,
		readonly = false,
		required = false,
		name,
		id,
		rows,
		cols,
		minlength,
		maxlength,
		wrap,
		autocomplete,
		resize,
		oninput,
		onchange,
		onfocus,
		onblur,
		onkeydown,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-required': ariaRequired,
		'aria-errormessage': ariaErrormessage,
		tabindex
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			validationAttrs({
				invalid: ariaInvalid === 'false' ? false : ariaInvalid === 'true' ? true : ariaInvalid,
				required:
					(ariaRequired === 'false' ? false : ariaRequired === 'true' ? true : ariaRequired) ??
					required,
				errormessage: ariaErrormessage
			})
		)
	);

	let style = $derived(resize ? `resize:${resize};` : undefined);
</script>

<textarea
	bind:value
	{placeholder}
	{disabled}
	{readonly}
	{required}
	{name}
	{id}
	{rows}
	{cols}
	{minlength}
	{maxlength}
	{wrap}
	{autocomplete}
	{style}
	class={className}
	{oninput}
	{onchange}
	{onfocus}
	{onblur}
	{onkeydown}
	{tabindex}
	{...ariaAttrs}
></textarea>
