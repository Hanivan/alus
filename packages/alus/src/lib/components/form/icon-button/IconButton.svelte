<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		'aria-label': string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-pressed'?: boolean;
		'aria-expanded'?: boolean;
		'aria-controls'?: string;
		'aria-haspopup'?: boolean | 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		class?: string;
		style?: string;
		onclick?: (e: MouseEvent) => void;
		onkeydown?: (e: KeyboardEvent) => void;
	}

	let {
		children,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-pressed': ariaPressed,
		'aria-expanded': ariaExpanded,
		'aria-controls': ariaControls,
		'aria-haspopup': ariaHaspopup,
		type = 'button',
		disabled = false,
		class: className = '',
		style,
		onclick,
		onkeydown
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled, pressed: ariaPressed, expanded: ariaExpanded })
		)
	);
</script>

<button
	{type}
	{disabled}
	class={className}
	{style}
	aria-controls={ariaControls}
	aria-haspopup={ariaHaspopup}
	{onclick}
	{onkeydown}
	{...ariaAttrs}
>
	{#if children}{@render children()}{/if}
</button>
