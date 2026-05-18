<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset, size } from '@floating-ui/dom';
	import { useEventListener } from 'runed';
	import { trap, focusFirst } from '$utils/a11y/index.js';
	import { getPopoverContext } from './Popover.svelte';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		placement?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-start'
			| 'top-end'
			| 'bottom-start'
			| 'bottom-end'
			| 'left-start'
			| 'left-end'
			| 'right-start'
			| 'right-end';
		offset?: number;
		sameWidth?: boolean;
		closeOnEscape?: boolean;
		closeOnOutsideClick?: boolean;
		trapFocus?: boolean;
		restoreFocus?: boolean;
		autoFocus?: boolean;
	}

	let {
		children,
		class: className = '',
		placement = 'bottom-start',
		offset: offsetPx = 4,
		sameWidth = false,
		closeOnEscape = true,
		closeOnOutsideClick = true,
		trapFocus = false,
		restoreFocus = true,
		autoFocus = false
	}: Props = $props();

	const ctx = getPopoverContext();

	const contentRef: Attachment<HTMLDivElement> = (node) => {
		ctx.setContentEl(node);
		const trigger = ctx.triggerEl.current;
		let cleanupAutoUpdate: (() => void) | undefined;
		let releaseTrap: (() => void) | undefined;

		if (trigger) {
			cleanupAutoUpdate = autoUpdate(trigger, node, async () => {
				const { x, y } = await computePosition(trigger, node, {
					placement,
					strategy: 'fixed',
					middleware: [
						offset(offsetPx),
						flip(),
						shift({ padding: 8 }),
						size({
							apply({ rects, elements }) {
								if (sameWidth) {
									Object.assign(elements.floating.style, {
										minWidth: `${rects.reference.width}px`
									});
								}
							}
						})
					]
				});
				Object.assign(node.style, { left: `${x}px`, top: `${y}px` });
			});
		}

		if (trapFocus) releaseTrap = trap(node);
		if (autoFocus) focusFirst(node);

		return () => {
			cleanupAutoUpdate?.();
			releaseTrap?.();
			ctx.setContentEl(null);
			if (restoreFocus) ctx.triggerEl.current?.focus();
		};
	};

	useEventListener(
		() => (ctx.open() ? document : null),
		'pointerdown',
		(e) => {
			if (!closeOnOutsideClick) return;
			const node = ctx.contentEl.current;
			if (!node) return;
			const t = e.target as Node;
			if (node.contains(t) || ctx.triggerEl.current?.contains(t)) return;
			ctx.setOpen(false);
		},
		{ capture: true }
	);

	useEventListener(
		() => (ctx.open() ? document : null),
		'keydown',
		(e) => {
			if (closeOnEscape && e.key === 'Escape') {
				e.preventDefault();
				ctx.setOpen(false);
			}
		}
	);
</script>

{#if ctx.open()}
	<Portal>
		<div
			id={ctx.contentId}
			role="dialog"
			aria-labelledby={ctx.triggerId}
			tabindex="-1"
			class={className}
			style="position:fixed; top:0; left:0;"
			{@attach contentRef}
		>
			{#if children}{@render children()}{/if}
		</div>
	</Portal>
{/if}
