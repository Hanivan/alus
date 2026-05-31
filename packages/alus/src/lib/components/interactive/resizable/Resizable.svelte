<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	type Side = 'right' | 'bottom' | 'left' | 'top';

	interface Props {
		children?: import('svelte').Snippet;
		size?: number;
		minSize?: number;
		maxSize?: number;
		side?: Side;
		step?: number;
		largeStep?: number;
		disabled?: boolean;
		class?: string;
		handleClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		onResize?: (size: number) => void;
	}

	let {
		children,
		size = $bindable(200),
		minSize = 50,
		maxSize = Number.POSITIVE_INFINITY,
		side = 'right',
		step = 8,
		largeStep = 32,
		disabled = false,
		class: className = '',
		handleClass = '',
		'aria-label': ariaLabel = 'Resize',
		'aria-labelledby': ariaLabelledby,
		onResize
	}: Props = $props();

	const axis = $derived<'x' | 'y'>(side === 'left' || side === 'right' ? 'x' : 'y');
	const orientation = $derived<'vertical' | 'horizontal'>(axis === 'x' ? 'vertical' : 'horizontal');

	let dragging = $state(false);
	let lastCoord = 0;

	function clamp(v: number): number {
		const max = Number.isFinite(maxSize) ? maxSize : v;
		return Math.min(max, Math.max(minSize, v));
	}

	function commit(v: number) {
		const next = clamp(v);
		if (next !== size) {
			size = next;
			onResize?.(next);
		}
	}

	function onPointerDown(e: PointerEvent) {
		if (disabled) return;
		e.preventDefault();
		dragging = true;
		lastCoord = axis === 'x' ? e.clientX : e.clientY;
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	}

	function onPointerMove(e: PointerEvent) {
		if (!dragging) return;
		const cur = axis === 'x' ? e.clientX : e.clientY;
		let delta = cur - lastCoord;
		if (side === 'left' || side === 'top') delta = -delta;
		lastCoord = cur;
		if (delta === 0) return;
		commit(size + delta);
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
		const incKey = axis === 'x' ? 'ArrowRight' : 'ArrowDown';
		const decKey = axis === 'x' ? 'ArrowLeft' : 'ArrowUp';
		if (e.key === 'Home') {
			e.preventDefault();
			commit(minSize);
			return;
		} else if (e.key === 'End') {
			e.preventDefault();
			if (Number.isFinite(maxSize)) commit(maxSize);
			return;
		}
		let delta;
		if (e.key === incKey) delta = step;
		else if (e.key === decKey) delta = -step;
		else if (e.key === 'PageDown') delta = largeStep;
		else if (e.key === 'PageUp') delta = -largeStep;
		else return;

		e.preventDefault();
		commit(size + delta);
	}

	const containerStyle = $derived(axis === 'x' ? `width:${size}px` : `height:${size}px`);
</script>

<div
	class={className}
	style={containerStyle}
	data-side={side}
	data-dragging={dragging || undefined}
>
	{#if children}{@render children()}{/if}
	<div
		role="separator"
		tabindex={disabled ? -1 : 0}
		data-dragging={dragging || undefined}
		data-side={side}
		class={handleClass}
		onpointerdown={onPointerDown}
		onpointermove={onPointerMove}
		onpointerup={onPointerUp}
		onpointercancel={onPointerUp}
		onkeydown={onKeydown}
		{...mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }),
			interactiveStateAttrs({ disabled }),
			widgetAttrs({
				orientation,
				valuenow: size,
				valuemin: minSize,
				valuemax: Number.isFinite(maxSize) ? maxSize : undefined
			})
		)}
	></div>
</div>
