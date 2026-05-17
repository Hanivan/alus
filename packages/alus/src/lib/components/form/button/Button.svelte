<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type {
		ButtonType,
		FormEncType,
		FormMethod,
		FormTarget,
		AriaBoolean,
		AriaTristate,
		AriaHaspopup
	} from '$types/index.js';

	interface Props {
		onclick?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
		class?: string;
		type?: ButtonType;
		disabled?: boolean;
		id?: string;
		// Accessibility attributes
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-pressed'?: AriaTristate;
		'aria-expanded'?: AriaBoolean;
		'aria-controls'?: string;
		'aria-haspopup'?: AriaHaspopup;
		tabindex?: number;
		// Form attributes
		name?: string;
		value?: string;
		form?: string;
		formaction?: string;
		formenctype?: FormEncType;
		formmethod?: FormMethod;
		formnovalidate?: boolean;
		formtarget?: FormTarget;
	}

	let {
		onclick,
		children,
		class: className = '',
		type = 'button',
		disabled = false,
		id,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-pressed': ariaPressed,
		'aria-expanded': ariaExpanded,
		'aria-controls': ariaControls,
		'aria-haspopup': ariaHaspopup,
		tabindex,
		name,
		value,
		form,
		formaction,
		formenctype,
		formmethod,
		formnovalidate,
		formtarget
	}: Props = $props();

	// Build ARIA attributes using reusable utilities
	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({
				pressed: ariaPressed === 'false' ? false : ariaPressed === 'true' ? true : ariaPressed,
				expanded: ariaExpanded === 'false' ? false : ariaExpanded === 'true' ? true : ariaExpanded,
				disabled
			}),
			widgetAttrs({ controls: ariaControls, haspopup: ariaHaspopup })
		)
	);
</script>

<button
	{type}
	{disabled}
	{id}
	{name}
	{value}
	{form}
	{formaction}
	{formenctype}
	{formmethod}
	{formnovalidate}
	{formtarget}
	class={className}
	{onclick}
	{tabindex}
	{...ariaAttrs}
>
	{#if children}
		{@render children()}
	{/if}
</button>
