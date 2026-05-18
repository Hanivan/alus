<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getCommandMenuContext } from './CommandMenu.svelte';
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
	}

	let { children, class: className = '', 'aria-label': ariaLabel = 'Open command menu' }: Props =
		$props();

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
	type="button"
	class={className}
	onclick={() => ctx.setOpen(!ctx.open())}
	{...ariaAttrs}
	{@attach triggerRef}
>
	{#if children}{@render children()}{/if}
</button>
