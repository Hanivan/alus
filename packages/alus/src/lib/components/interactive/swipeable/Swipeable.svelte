<script lang="ts">
	export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

	interface SwipeInfo {
		dx: number;
		dy: number;
	}

	interface SwipeEndInfo extends SwipeInfo {
		direction: SwipeDirection | null;
		duration: number;
	}

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		threshold?: number;
		velocityThreshold?: number;
		disabled?: boolean;
		preventScroll?: boolean;
		'aria-label'?: string;
		onSwipe?: (direction: SwipeDirection) => void;
		onSwipeStart?: (e: PointerEvent) => void;
		onSwipeMove?: (info: SwipeInfo) => void;
		onSwipeEnd?: (info: SwipeEndInfo) => void;
		onSwipeLeft?: () => void;
		onSwipeRight?: () => void;
		onSwipeUp?: () => void;
		onSwipeDown?: () => void;
	}

	let {
		children,
		class: className = '',
		threshold = 50,
		velocityThreshold = 0.3,
		disabled = false,
		preventScroll = false,
		'aria-label': ariaLabel = 'Swipeable region',
		onSwipe,
		onSwipeStart,
		onSwipeMove,
		onSwipeEnd,
		onSwipeLeft,
		onSwipeRight,
		onSwipeUp,
		onSwipeDown
	}: Props = $props();

	let startX = 0;
	let startY = 0;
	let startTime = 0;
	let activeId: number | null = null;
	let tracking = $state(false);

	function onPointerDown(e: PointerEvent) {
		if (disabled || !e.isPrimary || activeId != null) return;
		tracking = true;
		activeId = e.pointerId;
		startX = e.clientX;
		startY = e.clientY;
		startTime = performance.now();
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
		onSwipeStart?.(e);
	}

	function onPointerMove(e: PointerEvent) {
		if (!tracking || e.pointerId !== activeId) return;
		if (preventScroll) e.preventDefault();
		onSwipeMove?.({ dx: e.clientX - startX, dy: e.clientY - startY });
	}

	function finish(e: PointerEvent, cancelled: boolean) {
		if (!tracking || e.pointerId !== activeId) return;
		const dx = e.clientX - startX;
		const dy = e.clientY - startY;
		const duration = Math.max(1, performance.now() - startTime);
		const adx = Math.abs(dx);
		const ady = Math.abs(dy);
		let direction: SwipeDirection | null = null;
		if (!cancelled) {
			const passDistance = Math.max(adx, ady) >= threshold;
			const velocity = Math.max(adx, ady) / duration;
			const passVelocity = velocity >= velocityThreshold;
			if (passDistance || passVelocity) {
				if (adx > ady) direction = dx > 0 ? 'right' : 'left';
				else direction = dy > 0 ? 'down' : 'up';
			}
		}
		tracking = false;
		activeId = null;
		try {
			(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
		} catch {
			/* noop */
		}
		onSwipeEnd?.({ dx, dy, direction, duration });
		if (direction) {
			onSwipe?.(direction);
			if (direction === 'left') onSwipeLeft?.();
			else if (direction === 'right') onSwipeRight?.();
			else if (direction === 'up') onSwipeUp?.();
			else if (direction === 'down') onSwipeDown?.();
		}
	}

	function onPointerUp(e: PointerEvent) {
		finish(e, false);
	}
	function onPointerCancel(e: PointerEvent) {
		finish(e, true);
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled) return;
		let dir: SwipeDirection | null = null;
		if (e.key === 'ArrowLeft') dir = 'left';
		else if (e.key === 'ArrowRight') dir = 'right';
		else if (e.key === 'ArrowUp') dir = 'up';
		else if (e.key === 'ArrowDown') dir = 'down';
		if (!dir) return;
		e.preventDefault();
		onSwipe?.(dir);
		if (dir === 'left') onSwipeLeft?.();
		else if (dir === 'right') onSwipeRight?.();
		else if (dir === 'up') onSwipeUp?.();
		else if (dir === 'down') onSwipeDown?.();
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div
	class={className}
	role="region"
	aria-label={ariaLabel}
	tabindex={disabled ? -1 : 0}
	data-tracking={tracking || undefined}
	data-disabled={disabled || undefined}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onpointercancel={onPointerCancel}
	onkeydown={onKeydown}
>
	{#if children}{@render children()}{/if}
</div>
