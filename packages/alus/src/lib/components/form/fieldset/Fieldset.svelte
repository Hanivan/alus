<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	type Props = Omit<SvelteHTMLElements['fieldset'], 'children'> & {
		children?: import('svelte').Snippet;
		legend?: import('svelte').Snippet;
		legendClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	};

	let {
		children,
		legend,
		class: className = '',
		legendClass = '',
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

<fieldset {...rest} class={className} {...ariaAttrs}>
	{#if legend}
		<legend class={legendClass}>{@render legend()}</legend>
	{/if}
	{#if children}{@render children()}{/if}
</fieldset>
