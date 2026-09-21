<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getCommandMenuContext } from './CommandMenu.svelte';
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		'aria-label'?: string;
	};

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel = 'Commands',
		...rest
	}: Props = $props();
	const ctx = getCommandMenuContext();
</script>

<div
	{...rest}
	role="listbox"
	id={ctx.listId}
	class={className}
	{...mergeAttrs(labelAttrs({ label: ariaLabel }), widgetAttrs({ orientation: 'vertical' }))}
>
	{#if children}{@render children()}{/if}
</div>
