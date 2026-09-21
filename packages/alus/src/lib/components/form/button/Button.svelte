<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { AriaBoolean, AriaTristate, AriaHaspopup } from '$types/index.js';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet;
		'aria-pressed'?: AriaTristate;
		'aria-expanded'?: AriaBoolean;
		'aria-controls'?: string;
		'aria-haspopup'?: AriaHaspopup;
	}

	let {
		children,
		class: className = '',
		type = 'button',
		disabled = false,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-pressed': ariaPressed,
		'aria-expanded': ariaExpanded,
		'aria-controls': ariaControls,
		'aria-haspopup': ariaHaspopup,
		...rest
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

<button {...rest} {type} {disabled} class={className} {...ariaAttrs}>
	{#if children}
		{@render children()}
	{/if}
</button>
