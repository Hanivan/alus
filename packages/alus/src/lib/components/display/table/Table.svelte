<script lang="ts">
	import type { HTMLTableAttributes } from 'svelte/elements';
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props extends Omit<HTMLTableAttributes, 'children'> {
		children?: import('svelte').Snippet;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<table {...rest} class={className} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</table>
