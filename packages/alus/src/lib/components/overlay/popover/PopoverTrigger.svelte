<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getPopoverContext } from './Popover.svelte';
	import { interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		// Read by `toggle` and the `ariaAttrs` derivation — rule 2.
		disabled?: boolean;
	}

	let { children, class: className = '', disabled = false, ...rest }: Props = $props();

	const ctx = getPopoverContext();

	const triggerRef: Attachment<HTMLButtonElement> = (node) => {
		ctx.setTriggerEl(node);
		return () => ctx.setTriggerEl(null);
	};

	function toggle() {
		if (disabled || ctx.disabled()) return;
		ctx.setOpen(!ctx.open());
	}

	const ariaAttrs = $derived(
		mergeAttrs(
			interactiveStateAttrs({ expanded: ctx.open(), disabled: disabled || ctx.disabled() }),
			widgetAttrs({ controls: ctx.contentId, haspopup: 'dialog' })
		)
	);
</script>

<button
	{...rest}
	id={ctx.triggerId}
	type="button"
	data-state={ctx.open() ? 'open' : 'closed'}
	disabled={disabled || ctx.disabled()}
	class={className}
	onclick={toggle}
	{...ariaAttrs}
	{@attach triggerRef}
>
	{#if children}{@render children({ open: ctx.open() })}{/if}
</button>
