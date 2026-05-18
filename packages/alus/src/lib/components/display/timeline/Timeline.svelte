<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		orientation?: 'vertical' | 'horizontal';
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		class: className = '',
		orientation = 'vertical',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }))
	);
</script>

<ol
	role="list"
	class={className}
	data-orientation={orientation}
	{...ariaAttrs}
>
	{#if children}{@render children()}{/if}
</ol>
