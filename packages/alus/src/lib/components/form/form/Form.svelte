<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		action?: string;
		method?: 'get' | 'post' | 'dialog';
		enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
		target?: string;
		name?: string;
		id?: string;
		autocomplete?: 'on' | 'off';
		novalidate?: boolean;
		onsubmit?: (event: SubmitEvent) => void;
		onreset?: (event: Event) => void;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		class: className = '',
		action,
		method,
		enctype,
		target,
		name,
		id,
		autocomplete,
		novalidate = false,
		onsubmit,
		onreset,
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

<form
	{action}
	{method}
	{enctype}
	{target}
	{name}
	{id}
	{autocomplete}
	{novalidate}
	class={className}
	{onsubmit}
	{onreset}
	{...ariaAttrs}
>
	{#if children}{@render children()}{/if}
</form>
