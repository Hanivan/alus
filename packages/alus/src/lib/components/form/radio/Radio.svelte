<script lang="ts">
	import {
		labelAttrs,
		interactiveStateAttrs,
		validationAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';
	import type { AriaBoolean } from '$types/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		id?: string;
		name?: string;
		value?: string;
		form?: string;
		group?: unknown;
		// Accessibility attributes
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: AriaBoolean;
		onchange?: (event: Event) => void;
		oninput?: (event: Event) => void;
	}

	let {
		children,
		class: className = '',
		disabled = false,
		required = false,
		readonly = false,
		id,
		name,
		value = '',
		form,
		group = $bindable(),
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		onchange,
		oninput
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
	bind:this={radio}
	type="radio"
	bind:group
	{id}
	{disabled}
	{required}
	{readonly}
	{name}
	{value}
	{form}
	class={className}
	{onchange}
	{oninput}
	{...ariaAttrs}
/>

{#if children}
	{@render children()}
{/if}
