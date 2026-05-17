<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		legend?: import('svelte').Snippet;
		class?: string;
		legendClass?: string;
		disabled?: boolean;
		name?: string;
		id?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		legend,
		class: className = '',
		legendClass = '',
		disabled = false,
		name,
		id,
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

<fieldset {disabled} {name} {id} class={className} {...ariaAttrs}>
	{#if legend}
		<legend class={legendClass}>{@render legend()}</legend>
	{/if}
	{#if children}{@render children()}{/if}
</fieldset>
