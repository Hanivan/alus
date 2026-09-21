<script lang="ts">
	import {
		labelAttrs,
		interactiveStateAttrs,
		validationAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { AriaBoolean } from '$types/index.js';

	interface Props extends Omit<HTMLInputAttributes, 'children'> {
		children?: import('svelte').Snippet;
		disabled?: boolean;
		indeterminate?: boolean;
		required?: boolean;
		checked?: boolean;
		// Accessibility attributes
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: AriaBoolean;
	}

	let {
		children,
		class: className = '',
		disabled = false,
		indeterminate = false,
		required = false,
		checked = $bindable(),
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		...rest
	}: Props = $props();

	let checkbox = $state<HTMLInputElement>();

	// Build ARIA attributes
	let ariaAttrs: Record<string, string | boolean> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({
				disabled,
				checked: indeterminate ? 'mixed' : undefined
			}),
			validationAttrs({
				invalid: ariaInvalid === 'false' ? false : ariaInvalid === 'true' ? true : ariaInvalid,
				required
			})
		)
	);

	// Handle indeterminate state
	$effect(() => {
		if (checkbox) {
			checkbox.indeterminate = indeterminate;
		}
	});
</script>

<input
	{...rest}
	bind:this={checkbox}
	type="checkbox"
	bind:checked
	{disabled}
	{required}
	class={className}
	{...ariaAttrs}
/>

{#if children}
	{@render children()}
{/if}
