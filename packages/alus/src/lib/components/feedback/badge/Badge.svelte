<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { AriaLive } from '$types/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		// Accessibility attributes
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-live'?: AriaLive;
		'aria-hidden'?: boolean;
		// Appearance
		variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
		// State
		disabled?: boolean;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-live': ariaLive,
		'aria-hidden': ariaHidden,
		variant = 'default',
		disabled = false
	}: Props = $props();

	// Build ARIA attributes using reusable utilities
	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled }),
			widgetAttrs({ live: ariaLive })
		)
	);
</script>

<span
	class={className}
	data-variant={variant}
	data-disabled={disabled ? '' : undefined}
	aria-hidden={ariaHidden}
	{...ariaAttrs}
>
	{#if children}
		{@render children()}
	{/if}
</span>
