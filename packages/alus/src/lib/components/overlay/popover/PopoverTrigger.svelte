<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getPopoverContext } from './Popover.svelte';

	interface Props {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		class?: string;
		disabled?: boolean;
	}

	let { children, class: className = '', disabled = false }: Props = $props();

	const ctx = getPopoverContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};

	function toggle() {
		if (disabled || ctx.disabled()) return;
		ctx.setOpen(!ctx.open());
	}
</script>

<button
	id={ctx.triggerId}
	type="button"
	aria-haspopup="dialog"
	aria-expanded={ctx.open()}
	aria-controls={ctx.contentId}
	data-state={ctx.open() ? 'open' : 'closed'}
	disabled={disabled || ctx.disabled()}
	class={className}
	onclick={toggle}
	{@attach triggerRef}
>
	{#if children}{@render children({ open: ctx.open() })}{/if}
</button>
