<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { AriaLive } from '$types/index.js';

	type Props = Omit<SvelteHTMLElements['span'], 'children'> & {
		children?: import('svelte').Snippet;
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
	};

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-live': ariaLive,
		'aria-hidden': ariaHidden,
		variant = 'default',
		disabled = false,
		...rest
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
	{...rest}
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
