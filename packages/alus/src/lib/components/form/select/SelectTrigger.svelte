<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getSelectContext } from './Select.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		disabled?: boolean;
		'aria-label'?: string;
	}

	let {
		children,
		class: className = '',
		disabled = false,
		'aria-label': ariaLabel
	}: Props = $props();

	const ctx = getSelectContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};

	function onClick() {
		if (disabled || ctx.disabled()) return;
		const next = !ctx.open();
		ctx.setOpen(next);
		if (next) {
			ctx.setHighlighted(ctx.value() ?? ctx.options()[0]?.value);
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled || ctx.disabled()) return;
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			if (!ctx.open()) {
				ctx.setOpen(true);
				const opts = ctx.options();
				ctx.setHighlighted(
					ctx.value() ?? (e.key === 'ArrowUp' ? opts.at(-1)?.value : opts[0]?.value)
				);
			}
		}
	}

	let isDisabled = $derived(disabled || ctx.disabled());
</script>

<button
	type="button"
	id={ctx.triggerId}
	class={className}
	disabled={isDisabled}
	aria-haspopup="listbox"
	aria-expanded={ctx.open()}
	aria-controls={ctx.contentId}
	aria-labelledby={ctx.labelId()}
	aria-label={ariaLabel}
	onclick={onClick}
	onkeydown={onKeydown}
	{@attach triggerRef}
>
	{#if children}{@render children()}{/if}
</button>
