<script lang="ts" module>
	export interface DraggableEvent<T = unknown> {
		data: T;
		dataTransfer: DataTransfer;
		event: DragEvent;
	}

	export type KeyMoveDirection = 'left' | 'right' | 'up' | 'down';
</script>

<script lang="ts" generics="T">
	import VisuallyHidden from '../../utility/visually-hidden/VisuallyHidden.svelte';

	interface Props {
		children?: import('svelte').Snippet<[{ dragging: boolean; grabbed: boolean }]>;
		data: T;
		type?: string;
		disabled?: boolean;
		effect?: 'copy' | 'move' | 'link' | 'none';
		as?: 'div' | 'span' | 'li';
		class?: string;
		style?: string;
		'aria-label'?: string;
		onDragStart?: (e: DraggableEvent<T>) => void;
		onDragEnd?: (e: DraggableEvent<T>) => void;
		onKeyMove?: (dir: KeyMoveDirection) => void;
		onKeyPickup?: () => void;
		onKeyDrop?: () => void;
	}

	let {
		children,
		data,
		type = 'application/x-alus-ui',
		disabled = false,
		effect = 'move',
		as = 'div',
		class: className = '',
		style,
		'aria-label': ariaLabel = 'Draggable item',
		onDragStart,
		onDragEnd,
		onKeyMove,
		onKeyPickup,
		onKeyDrop
	}: Props = $props();

	let dragging = $state(false);
	let grabbed = $state(false);
	let announce = $state('');

	function start(e: DragEvent) {
		if (disabled || !e.dataTransfer) {
			e.preventDefault();
			return;
		}
		dragging = true;
		try {
			e.dataTransfer.setData(type, JSON.stringify(data));
		} catch {
			e.dataTransfer.setData(type, String(data));
		}
		e.dataTransfer.effectAllowed = effect;
		onDragStart?.({ data, dataTransfer: e.dataTransfer, event: e });
	}

	function end(e: DragEvent) {
		dragging = false;
		if (e.dataTransfer) onDragEnd?.({ data, dataTransfer: e.dataTransfer, event: e });
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			grabbed = !grabbed;
			if (grabbed) {
				announce = 'Item picked up. Use arrow keys to move, press space or enter to drop.';
				onKeyPickup?.();
			} else {
				announce = 'Item dropped.';
				onKeyDrop?.();
			}
			return;
		}
		if (!grabbed) return;
		let dir: KeyMoveDirection | null = null;
		if (e.key === 'ArrowLeft') dir = 'left';
		else if (e.key === 'ArrowRight') dir = 'right';
		else if (e.key === 'ArrowUp') dir = 'up';
		else if (e.key === 'ArrowDown') dir = 'down';
		if (dir) {
			e.preventDefault();
			onKeyMove?.(dir);
			announce = `Moved ${dir}.`;
		} else if (e.key === 'Escape') {
			e.preventDefault();
			grabbed = false;
			announce = 'Move cancelled.';
		}
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if as === 'span'}
	<span
		class={className}
		{style}
		role="button"
		tabindex={disabled ? -1 : 0}
		draggable={!disabled}
		aria-label={ariaLabel}
		aria-disabled={disabled || undefined}
		aria-pressed={grabbed || undefined}
		data-dragging={dragging ? '' : undefined}
		data-grabbed={grabbed ? '' : undefined}
		ondragstart={start}
		ondragend={end}
		onkeydown={onKeydown}
	>
		{#if children}{@render children({ dragging, grabbed })}{/if}
	</span>
{:else if as === 'li'}
	<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
	<li
		class={className}
		{style}
		role="button"
		tabindex={disabled ? -1 : 0}
		draggable={!disabled}
		aria-label={ariaLabel}
		aria-disabled={disabled || undefined}
		aria-pressed={grabbed || undefined}
		data-dragging={dragging ? '' : undefined}
		data-grabbed={grabbed ? '' : undefined}
		ondragstart={start}
		ondragend={end}
		onkeydown={onKeydown}
	>
		{#if children}{@render children({ dragging, grabbed })}{/if}
	</li>
{:else}
	<div
		class={className}
		{style}
		role="button"
		tabindex={disabled ? -1 : 0}
		draggable={!disabled}
		aria-label={ariaLabel}
		aria-disabled={disabled || undefined}
		aria-pressed={grabbed || undefined}
		data-dragging={dragging ? '' : undefined}
		data-grabbed={grabbed ? '' : undefined}
		ondragstart={start}
		ondragend={end}
		onkeydown={onKeydown}
	>
		{#if children}{@render children({ dragging, grabbed })}{/if}
	</div>
{/if}

<VisuallyHidden aria-live="polite">{announce}</VisuallyHidden>
