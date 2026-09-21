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
		value?: string;
		// `bind:group` is a Svelte binding, not an attribute. `svelte/elements` *does* declare
		// `group?: any` on HTMLInputAttributes (elements.d.ts:1098), so this is not a rule-6
		// collision — `any` absorbs `unknown` either way. It is declared here because the
		// component needs the prop, not because the native surface lacks the name.
		group?: unknown;
		disabled?: boolean;
		required?: boolean;
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
		required = false,
		value = '',
		group = $bindable(),
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		...rest
	}: Props = $props();

	let radio = $state<HTMLInputElement>();

	// Build ARIA attributes
	let ariaAttrs: Record<string, string | boolean> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({
				disabled
			}),
			validationAttrs({
				invalid: ariaInvalid === 'false' ? false : ariaInvalid === 'true' ? true : ariaInvalid,
				required
			})
		)
	);
</script>

<input
	{...rest}
	bind:this={radio}
	type="radio"
	bind:group
	{disabled}
	{required}
	{value}
	class={className}
	{...ariaAttrs}
/>

{#if children}
	{@render children()}
{/if}
