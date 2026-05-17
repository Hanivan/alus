<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		class?: string;
		// Accessibility attributes
		'aria-label'?: string;
		// Orientation
		orientation?: 'horizontal' | 'vertical';
	}

	let {
		class: className = '',
		'aria-label': ariaLabel,
		orientation = 'horizontal'
	}: Props = $props();

	// Build ARIA attributes using reusable utilities
	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(labelAttrs({ label: ariaLabel }), interactiveStateAttrs({}))
	);
</script>

{#if orientation === 'horizontal'}
	<hr class={className} aria-hidden="true" />
{:else}
	<span class={className} role="separator" aria-orientation="vertical" {...ariaAttrs}></span>
{/if}
