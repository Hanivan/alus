<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<table class={className} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</table>
