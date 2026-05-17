<script lang="ts">
	import { getTabsContext, TAB_LIST_ATTR } from './context.js';

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
	aria-orientation={ctx.orientation()}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	class={className}
	{...listAttr}
>
	{#if children}{@render children()}{/if}
</div>
