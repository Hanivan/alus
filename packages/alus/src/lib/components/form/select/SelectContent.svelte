<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset, size } from '@floating-ui/dom';
	import { getSelectContext } from './Select.svelte';
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
		sameWidth = true
	}: Props = $props();

	const ctx = getSelectContext();

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
				Object.assign(node.style, {
					left: `${x}px`,
					top: `${y}px`
				});
			});
		}

		function onPointerDown(e: PointerEvent) {
			const t = e.target as Node;
			if (node.contains(t) || ctx.triggerEl.current?.contains(t)) return;
			ctx.setOpen(false);
		}

		document.addEventListener('pointerdown', onPointerDown, true);

		queueMicrotask(() => node.focus());

		return () => {
			cleanupAutoUpdate?.();
			document.removeEventListener('pointerdown', onPointerDown, true);
			ctx.setContentEl(null);
			ctx.triggerEl.current?.focus();
		};
	};

	function move(dir: 1 | -1) {
		const opts = ctx.options().filter((o) => !o.disabled);
		if (opts.length === 0) return;
		const cur = opts.findIndex((o) => o.value === ctx.highlighted());
		let next: number;
		if (cur === -1) next = dir === 1 ? 0 : opts.length - 1;
		else next = (cur + dir + opts.length) % opts.length;
		ctx.setHighlighted(opts[next].value);
		opts[next].el.scrollIntoView({ block: 'nearest' });
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
				const opts = ctx.options().filter((o) => !o.disabled);
				if (opts[0]) {
					ctx.setHighlighted(opts[0].value);
					opts[0].el.scrollIntoView({ block: 'nearest' });
				}
				break;
			}
			case 'End': {
				e.preventDefault();
				const opts = ctx.options().filter((o) => !o.disabled);
				const last = opts.at(-1);
				if (last) {
					ctx.setHighlighted(last.value);
					last.el.scrollIntoView({ block: 'nearest' });
				}
				break;
			}
			case 'Enter':
			case ' ': {
				e.preventDefault();
				const h = ctx.highlighted();
				if (h !== undefined) ctx.toggleValue(h);
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

	let activeId = $derived.by(() => {
		const opts = ctx.options();
		const found = opts.find((o) => o.value === ctx.highlighted());
		return found?.el.id;
	});
</script>

{#if ctx.open()}
	<Portal>
		<div
			id={ctx.contentId}
			role="listbox"
			tabindex="-1"
			aria-labelledby={ctx.labelId() ?? ctx.triggerId}
			aria-multiselectable={ctx.multiple() ? true : undefined}
			aria-activedescendant={activeId}
			class={className}
			style="position:fixed; top:0; left:0;"
			onkeydown={onKeydown}
			{@attach contentRef}
		>
			{#if children}{@render children()}{/if}
		</div>
	</Portal>
{/if}
