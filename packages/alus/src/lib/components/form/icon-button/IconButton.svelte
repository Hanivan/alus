<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet;
		'aria-label': string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-pressed'?: boolean;
		'aria-expanded'?: boolean;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		style?: string;
	}

	let {
		children,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-pressed': ariaPressed,
		'aria-expanded': ariaExpanded,
		type = 'button',
		disabled = false,
		class: className = '',
		style,
		...rest
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled, pressed: ariaPressed, expanded: ariaExpanded })
		)
	);
</script>

<button {...rest} {type} {disabled} class={className} {style} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</button>
