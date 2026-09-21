<script lang="ts">
	import { labelAttrs, validationAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { AriaBoolean } from '$types/index.js';

	interface Props extends Omit<HTMLInputAttributes, 'children'> {
		value?: string;
		'aria-invalid'?: AriaBoolean;
		'aria-required'?: AriaBoolean;
		'aria-errormessage'?: string;
	}

	let {
		type = 'text',
		value = $bindable(),
		class: className = '',
		disabled = false,
		required = false,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-required': ariaRequired,
		'aria-errormessage': ariaErrormessage,
		...rest
	}: Props = $props();

	// Build ARIA attributes using reusable utilities
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
</script>

<input {...rest} {type} bind:value {disabled} {required} class={className} {...ariaAttrs} />
