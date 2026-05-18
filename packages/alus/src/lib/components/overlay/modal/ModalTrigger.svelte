<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getModalContext } from './Modal.svelte';

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
</script>

<button
	type="button"
	aria-haspopup="dialog"
	aria-expanded={ctx.open()}
	aria-controls={ctx.contentId}
	data-state={ctx.open() ? 'open' : 'closed'}
	{disabled}
	class={className}
	onclick={openModal}
	{@attach triggerRef}
>
	{#if children}{@render children({ open: ctx.open() })}{/if}
</button>
