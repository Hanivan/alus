<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getModalContext } from './Modal.svelte';
	import { interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		class?: string;
		disabled?: boolean;
	}

	let { children, class: className = '', disabled = false }: Props = $props();

	const ctx = getModalContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};

	function openModal() {
		if (disabled) return;
		ctx.setOpen(true);
	}

	const ariaAttrs = $derived(
		mergeAttrs(
			interactiveStateAttrs({ expanded: ctx.open(), disabled }),
			widgetAttrs({ controls: ctx.contentId, haspopup: 'dialog' })
		)
	);
</script>

<button
	type="button"
	data-state={ctx.open() ? 'open' : 'closed'}
	{disabled}
	class={className}
	onclick={openModal}
	{...ariaAttrs}
	{@attach triggerRef}
>
	{#if children}{@render children({ open: ctx.open() })}{/if}
</button>
