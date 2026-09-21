<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getTooltipContext } from './Tooltip.svelte';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet<[{ open: boolean }]>;
		// Component-specific, non-DOM prop: kept out of `rest` so it is not spread onto the
		// `<button>` as an attribute. It is currently unimplemented (declared, never read).
		asChild?: boolean;
	}

	// `asChild` is declared but unimplemented. It stays destructured only so the `...rest`
	// spread cannot carry it onto the `<button>` as a bogus attribute. The suppression is
	// required: `void asChild;` satisfies eslint but trips svelte-check's
	// `state_referenced_locally` warning, and the library gate is 0 warnings, not 0 errors.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let { children, class: className = '', asChild, ...rest }: Props = $props();

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
	{...rest}
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
