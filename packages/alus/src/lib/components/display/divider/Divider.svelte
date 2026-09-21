<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	// Two branches with different host elements (`hr` / `span`), so a single element type
	// cannot describe the host — `HTMLAttributes<HTMLElement>` is the shared base.
	type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		// Accessibility attributes
		'aria-label'?: string;
		// Orientation
		orientation?: 'horizontal' | 'vertical';
	};

	let {
		class: className = '',
		'aria-label': ariaLabel,
		orientation = 'horizontal',
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(labelAttrs({ label: ariaLabel }), widgetAttrs({ orientation: 'vertical' }))
	);
</script>

{#if orientation === 'horizontal'}
	<hr {...rest} class={className} aria-hidden="true" />
{:else}
	<span {...rest} class={className} role="separator" {...ariaAttrs}></span>
{/if}
