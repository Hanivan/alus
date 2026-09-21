<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getCommandMenuContext } from './CommandMenu.svelte';
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet;
		'aria-label'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel = 'Open command menu',
		...rest
	}: Props = $props();

	const ctx = getCommandMenuContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel }),
			interactiveStateAttrs({ expanded: ctx.open() }),
			widgetAttrs({ haspopup: 'dialog' })
		)
	);
</script>

<button
	{...rest}
	type="button"
	class={className}
	onclick={() => ctx.setOpen(!ctx.open())}
	{...ariaAttrs}
	{@attach triggerRef}
>
	{#if children}{@render children()}{/if}
</button>
