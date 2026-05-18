<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { getSplitViewContext } from './SplitView.svelte';

	interface Props {
		class?: string;
		step?: number;
		largeStep?: number;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		class: className = '',
		step = 2,
		largeStep = 10,
		'aria-label': ariaLabel = 'Resize panes',
		'aria-labelledby': ariaLabelledby
	}: Props = $props();

	const ctx = getSplitViewContext();
	let handleEl: HTMLElement | null = $state(null);
	let lastCoord = 0;
	let containerSize = 0;

	function findContainer(node: HTMLElement): HTMLElement {
		return (node.parentElement as HTMLElement) ?? node;
	}

	const attach: Attachment<HTMLDivElement> = (node) => {
		handleEl = node;
		return () => {
			handleEl = null;
		};
	};

	function onPointerDown(e: PointerEvent) {
		if (ctx.disabled()) return;
		e.preventDefault();
		ctx.setDragging(true);
		const horiz = ctx.orientation() === 'horizontal';
		lastCoord = horiz ? e.clientX : e.clientY;
		const container = handleEl ? findContainer(handleEl) : null;
		const rect = container?.getBoundingClientRect();
		containerSize = rect ? (horiz ? rect.width : rect.height) : 0;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!ctx.dragging()) return;
		if (containerSize <= 0) return;
		const horiz = ctx.orientation() === 'horizontal';
		const cur = horiz ? e.clientX : e.clientY;
		const deltaPx = cur - lastCoord;
		lastCoord = cur;
		if (deltaPx === 0) return;
		const deltaPct = (deltaPx / containerSize) * 100;
		ctx.setSize(ctx.size() + deltaPct);
	}

	function onPointerUp(e: PointerEvent) {
		if (!ctx.dragging()) return;
		ctx.setDragging(false);
		try {
			(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
		} catch {
			/* noop */
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (ctx.disabled()) return;
		const horiz = ctx.orientation() === 'horizontal';
		const incKey = horiz ? 'ArrowRight' : 'ArrowDown';
		const decKey = horiz ? 'ArrowLeft' : 'ArrowUp';
		let delta = 0;
		if (e.key === incKey) delta = step;
		else if (e.key === decKey) delta = -step;
		else if (e.key === 'PageDown') delta = largeStep;
		else if (e.key === 'PageUp') delta = -largeStep;
		else if (e.key === 'Home') {
			e.preventDefault();
			ctx.setSize(ctx.min());
			return;
		} else if (e.key === 'End') {
			e.preventDefault();
			ctx.setSize(ctx.max());
			return;
		} else {
			return;
		}
		e.preventDefault();
		ctx.setSize(ctx.size() + delta);
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	{@attach attach}
	role="separator"
	tabindex={ctx.disabled() ? -1 : 0}
	aria-orientation={ctx.orientation() === 'horizontal' ? 'vertical' : 'horizontal'}
	aria-valuenow={Math.round(ctx.size())}
	aria-valuemin={ctx.min()}
	aria-valuemax={ctx.max()}
	aria-controls={`${ctx.firstPaneId} ${ctx.secondPaneId}`}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-disabled={ctx.disabled() || undefined}
	data-dragging={ctx.dragging() || undefined}
	data-orientation={ctx.orientation()}
	class={className}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
	onkeydown={onKeydown}
></div>
