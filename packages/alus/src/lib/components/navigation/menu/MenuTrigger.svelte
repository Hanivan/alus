<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getMenuContext } from './Menu.svelte';

	interface Props {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		class?: string;
		disabled?: boolean;
	}

	let { children, class: className = '', disabled = false }: Props = $props();

	const ctx = getMenuContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};

	function toggle() {
		if (disabled || ctx.disabled()) return;
		ctx.setOpen(!ctx.open());
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled || ctx.disabled()) return;
		if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			ctx.setOpen(true);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			ctx.setOpen(true);
		}
	}
</script>

<button
	id={ctx.triggerId}
	type="button"
	aria-haspopup="menu"
	aria-expanded={ctx.open()}
	aria-controls={ctx.contentId}
	data-state={ctx.open() ? 'open' : 'closed'}
	disabled={disabled || ctx.disabled()}
	class={className}
	onclick={toggle}
	onkeydown={onKeydown}
	{@attach triggerRef}
>
	{#if children}{@render children({ open: ctx.open() })}{/if}
</button>
