<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getTooltipContext } from './Tooltip.svelte';

	interface Props {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		class?: string;
		asChild?: boolean;
	}

	let { children, class: className = '' }: Props = $props();

	const ctx = getTooltipContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') ctx.setOpen(false);
	}
</script>

<button
	type="button"
	aria-describedby={ctx.open() ? ctx.contentId : undefined}
	data-state={ctx.open() ? 'open' : 'closed'}
	class={className}
	onpointerenter={ctx.scheduleOpen}
	onpointerleave={ctx.scheduleClose}
	onfocus={ctx.scheduleOpen}
	onblur={ctx.scheduleClose}
	onkeydown={onKeydown}
	{@attach triggerRef}
>
	{#if children}{@render children({ open: ctx.open() })}{/if}
</button>
