<script lang="ts">
	import { labelAttrs, validationAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { AriaBoolean } from '$types/index.js';

	interface Props extends Omit<HTMLTextareaAttributes, 'children'> {
		value?: string;
		resize?: 'none' | 'both' | 'horizontal' | 'vertical';
		style?: string;
		required?: boolean;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: AriaBoolean;
		'aria-required'?: AriaBoolean;
		'aria-errormessage'?: string;
	}

	let {
		value = $bindable(''),
		class: className = '',
		required = false,
		resize,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-required': ariaRequired,
		'aria-errormessage': ariaErrormessage,
		style: extraStyle = '',
		...rest
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

	// The host writes its own `style`, so a consumer's `style` must be appended rather than
	// dropped: `{...rest}` goes first, which would otherwise discard it silently.
	//
	// `|| undefined`, not the bare template: `resize` is optional and `extraStyle` defaults to
	// `''`, so the bare template yields `''` for `<Textarea />` — and Svelte's `set_style`
	// assigns `cssText = ''` rather than removing the attribute, emitting `style=""` where HEAD
	// emitted none. Returning `undefined` keeps a no-op render byte-identical to before.
	const style = $derived(`${resize ? `resize:${resize};` : ''}${extraStyle}` || undefined);
</script>

<textarea {...rest} bind:value {required} {style} class={className} {...ariaAttrs}></textarea>
