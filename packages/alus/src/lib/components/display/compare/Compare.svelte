<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import {
		labelAttrs,
		interactiveStateAttrs,
		widgetAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';

	interface Props {
		before: import('svelte').Snippet;
		after: import('svelte').Snippet;
		handle?: import('svelte').Snippet<[{ position: number; dragging: boolean }]>;
		position?: number;
		min?: number;
		max?: number;
		step?: number;
		largeStep?: number;
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		class?: string;
		beforeClass?: string;
		afterClass?: string;
		handleClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-valuetext'?: string;
		onChange?: (position: number) => void;
	}

	let {
		before,
		after,
		handle,
		position = $bindable(50),
		min = 0,
		max = 100,
		step = 2,
		largeStep = 10,
		orientation = 'horizontal',
		disabled = false,
		class: className = '',
		beforeClass = '',
		afterClass = '',
		handleClass = '',
		'aria-label': ariaLabel = 'Before and after comparison',
		'aria-labelledby': ariaLabelledby,
		'aria-valuetext': ariaValuetext,
		onChange
	}: Props = $props();

	let dragging = $state(false);
	let containerEl: HTMLElement | null = $state(null);
	let lastCoord = 0;
	let containerSize = 0;

	const horiz = $derived(orientation === 'horizontal');

	function clamp(v: number): number {
		return Math.min(max, Math.max(min, v));
	}

	function setPosition(v: number) {
		const next = clamp(v);
		if (next !== position) {
			position = next;
			onChange?.(next);
		}
	}

	const attach: Attachment<HTMLDivElement> = (node) => {
		containerEl = node;
		return () => {
			containerEl = null;
		};
	};

	function refreshSize() {
		if (!containerEl) {
			containerSize = 0;
			return;
		}
		const rect = containerEl.getBoundingClientRect();
		containerSize = horiz ? rect.width : rect.height;
	}

	function pointFromEvent(e: PointerEvent): number {
		return horiz ? e.clientX : e.clientY;
	}

	function pctFromAbsolute(e: PointerEvent): number {
		if (!containerEl) return position;
		const rect = containerEl.getBoundingClientRect();
		const offset = horiz ? e.clientX - rect.left : e.clientY - rect.top;
		const size = horiz ? rect.width : rect.height;
		if (size <= 0) return position;
		return (offset / size) * 100;
	}

	function onTrackPointerDown(e: PointerEvent) {
		if (disabled) return;
		e.preventDefault();
		dragging = true;
		refreshSize();
		lastCoord = pointFromEvent(e);
		setPosition(pctFromAbsolute(e));
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onHandlePointerDown(e: PointerEvent) {
		if (disabled) return;
		e.preventDefault();
		e.stopPropagation();
		dragging = true;
		refreshSize();
		lastCoord = pointFromEvent(e);
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging || containerSize <= 0) return;
		const cur = pointFromEvent(e);
		const deltaPx = cur - lastCoord;
		lastCoord = cur;
		if (deltaPx === 0) return;
		const deltaPct = (deltaPx / containerSize) * 100;
		setPosition(position + deltaPct);
	}

	function onPointerUp(e: PointerEvent) {
		if (!dragging) return;
		dragging = false;
		try {
			(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
		} catch {
			/* noop */
		}
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled) return;
		const incKey = horiz ? 'ArrowRight' : 'ArrowDown';
		const decKey = horiz ? 'ArrowLeft' : 'ArrowUp';
		let delta = 0;
		if (e.key === incKey) delta = step;
		else if (e.key === decKey) delta = -step;
		else if (e.key === 'PageDown') delta = largeStep;
		else if (e.key === 'PageUp') delta = -largeStep;
		else if (e.key === 'Home') {
			e.preventDefault();
			setPosition(min);
			return;
		} else if (e.key === 'End') {
			e.preventDefault();
			setPosition(max);
			return;
		} else {
			return;
		}
		e.preventDefault();
		setPosition(position + delta);
	}

	const afterClipStyle = $derived(
		horiz
			? `clip-path:inset(0 ${100 - position}% 0 0);`
			: `clip-path:inset(0 0 ${100 - position}% 0);`
	);

	const handleStyle = $derived(
		horiz
			? `left:${position}%;top:0;bottom:0;transform:translateX(-50%);`
			: `top:${position}%;left:0;right:0;transform:translateY(-50%);`
	);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	{@attach attach}
	class={className}
	data-orientation={orientation}
	data-dragging={dragging || undefined}
	data-disabled={disabled || undefined}
	style="position:relative;overflow:hidden;touch-action:none;"
	onpointerdown={onTrackPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerUp}
>
	<div class={beforeClass} data-layer="before" style="position:absolute;inset:0;">
		{@render before()}
	</div>
	<div
		class={afterClass}
		data-layer="after"
		style={`position:absolute;inset:0;${afterClipStyle}`}
	>
		{@render after()}
	</div>

	<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		role="slider"
		tabindex={disabled ? -1 : 0}
		data-dragging={dragging || undefined}
		data-orientation={orientation}
		class={handleClass}
		style={`position:absolute;${handleStyle}`}
		onpointerdown={onHandlePointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		onkeydown={onKeydown}
		{...mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }),
			interactiveStateAttrs({ disabled }),
			widgetAttrs({
				orientation,
				valuenow: Math.round(position),
				valuemin: min,
				valuemax: max,
				valuetext: ariaValuetext
			})
		)}
	>
		{#if handle}
			{@render handle({ position, dragging })}
		{/if}
	</div>
</div>
