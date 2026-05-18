<script lang="ts">
	import { getCommandMenuContext } from './CommandMenu.svelte';
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
	}

	let { children, class: className = '', 'aria-label': ariaLabel = 'Commands' }: Props = $props();
	const ctx = getCommandMenuContext();
</script>

<div
	role="listbox"
	id={ctx.listId}
	class={className}
	{...mergeAttrs(labelAttrs({ label: ariaLabel }), widgetAttrs({ orientation: 'vertical' }))}
>
	{#if children}{@render children()}{/if}
</div>
