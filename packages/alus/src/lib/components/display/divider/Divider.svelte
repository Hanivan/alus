<script lang="ts">
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

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

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(labelAttrs({ label: ariaLabel }), widgetAttrs({ orientation: 'vertical' }))
	);
</script>

{#if orientation === 'horizontal'}
	<hr class={className} aria-hidden="true" />
{:else}
	<span class={className} role="separator" {...ariaAttrs}></span>
{/if}
