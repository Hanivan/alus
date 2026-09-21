<script lang="ts">
	import type { HTMLFormAttributes } from 'svelte/elements';
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props extends Omit<HTMLFormAttributes, 'children'> {
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

<form {...rest} class={className} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</form>
