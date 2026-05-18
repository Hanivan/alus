<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset, size } from '@floating-ui/dom';
	import { useEventListener } from 'runed';
	import { getMenuContext, type MenuItemEntry } from './Menu.svelte';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		placement?: 'top' | 'bottom' | 'top-start' | 'bottom-start' | 'top-end' | 'bottom-end';
		offset?: number;
		sameWidth?: boolean;
	}

	let {
		children,
		class: className = '',
		placement = 'bottom-start',
		offset: offsetPx = 4,
		sameWidth = false
	}: Props = $props();

	const ctx = getMenuContext();

	function enabled(): MenuItemEntry[] {
		return ctx.items().filter((i) => !i.disabled);
	}

	function focusItem(entry: MenuItemEntry | undefined) {
		if (!entry) return;
		ctx.setHighlighted(entry.el);
		entry.el.focus();
	}

	const contentRef: Attachment<HTMLDivElement> = (node) => {
		ctx.setContentEl(node);
		const trigger = ctx.triggerEl.current;
		let cleanupAutoUpdate: (() => void) | undefined;

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

		queueMicrotask(() => {
			const list = enabled();
			const idx = ctx.lastActivatedIndex();
			focusItem(idx >= 0 && idx < list.length ? list[idx] : list[0]);
		});

		return () => {
			cleanupAutoUpdate?.();
			ctx.setContentEl(null);
			ctx.triggerEl.current?.focus();
		};
	};

	useEventListener(
		() => (ctx.open() ? document : null),
		'pointerdown',
		(e) => {
			const node = ctx.contentEl.current;
			if (!node) return;
			const t = e.target as Node;
			if (node.contains(t) || ctx.triggerEl.current?.contains(t)) return;
			ctx.setOpen(false);
		},
		{ capture: true }
	);

	function move(dir: 1 | -1) {
		const list = enabled();
		if (!list.length) return;
		const cur = list.findIndex((i) => i.el === ctx.highlighted());
		let next: number;
		if (cur === -1) next = dir === 1 ? 0 : list.length - 1;
		else next = (cur + dir + list.length) % list.length;
		focusItem(list[next]);
	}

	function onKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				move(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				move(-1);
				break;
			case 'Home': {
				e.preventDefault();
				focusItem(enabled()[0]);
				break;
			}
			case 'End': {
				e.preventDefault();
				focusItem(enabled().at(-1));
				break;
			}
			case 'Escape':
				e.preventDefault();
				ctx.setOpen(false);
				break;
			case 'Tab':
				ctx.setOpen(false);
				break;
		}
	}
</script>

{#if ctx.open()}
	<Portal>
		<div
			id={ctx.contentId}
			role="menu"
			tabindex="-1"
			aria-labelledby={ctx.triggerId}
			class={className}
			style="position:fixed; top:0; left:0;"
			onkeydown={onKeydown}
			{@attach contentRef}
		>
			{#if children}{@render children()}{/if}
		</div>
	</Portal>
{/if}
