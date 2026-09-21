<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['span'], 'children'> & {
		children?: import('svelte').Snippet;
		// Accessibility attributes
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		// State
		disabled?: boolean;
		removable?: boolean;
		// Events
		onremove?: (event: MouseEvent) => void;
	};

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		disabled = false,
		removable = false,
		onremove,
		...rest
	}: Props = $props();

	// Build ARIA attributes using reusable utilities
	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled })
		)
	);
</script>

<span {...rest} class={className} data-removable={removable ? '' : undefined} {...ariaAttrs}>
	{#if children}
		{@render children()}
	{/if}
	{#if removable}
		<button type="button" aria-label="Remove" {disabled} onclick={onremove} class="remove-button">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<line x1="18" y1="6" x2="6" y2="18"></line>
				<line x1="6" y1="6" x2="18" y2="18"></line>
			</svg>
		</button>
	{/if}
</span>
