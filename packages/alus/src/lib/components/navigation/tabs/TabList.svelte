<script lang="ts">
	import { getTabsContext, TAB_LIST_ATTR } from './context.js';
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props = $props();

	const ctx = getTabsContext();
	const listAttr: Record<string, string> = { [TAB_LIST_ATTR]: ctx.baseId };
</script>

<div
	role="tablist"
	class={className}
	{...mergeAttrs(
		labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }),
		widgetAttrs({ orientation: ctx.orientation() })
	)}
	{...listAttr}
>
	{#if children}{@render children()}{/if}
</div>
