<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	type Props = Omit<SvelteHTMLElements['ol'], 'children'> & {
		children?: import('svelte').Snippet;
		orientation?: 'vertical' | 'horizontal';
		'aria-label'?: string;
		'aria-labelledby'?: string;
	};

	let {
		children,
		class: className = '',
		orientation = 'vertical',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }))
	);
</script>

<ol {...rest} role="list" class={className} data-orientation={orientation} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</ol>
