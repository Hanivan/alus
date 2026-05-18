<script lang="ts" generics="T">
	import { tick } from 'svelte';
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import VisuallyHidden from '../../utility/visually-hidden/VisuallyHidden.svelte';

	interface Props<U> {
		items: U[];
		getKey?: (item: U, index: number) => string;
		item: import('svelte').Snippet<
			[
				{
					value: U;
					index: number;
					isDragging: boolean;
					grabbed: boolean;
					over: boolean;
					itemAttrs: Record<string, unknown>;
				}
			]
		>;
		onReorder?: (items: U[]) => void;
		orientation?: 'vertical' | 'horizontal';
		disabled?: boolean;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		items = $bindable<T[]>(),
		getKey,
		item,
		onReorder,
		orientation = 'vertical',
		disabled = false,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props<T> = $props();

	let draggingIndex = $state<number | null>(null);
	let grabbedIndex = $state<number | null>(null);
	let overIndex = $state<number | null>(null);
	let listEl: HTMLElement | null = $state(null);
	let announce = $state('');

	function key(it: T, i: number): string {
		return getKey ? getKey(it, i) : String(i);
	}

	function reorder(from: number, to: number): number {
		if (from === to || from < 0 || to < 0 || from >= items.length || to >= items.length) return from;
		const next = items.slice();
		const [moved] = next.splice(from, 1);
		next.splice(to, 0, moved);
		items = next;
		announce = `Moved item from position ${from + 1} to ${to + 1} of ${next.length}.`;
		onReorder?.(next);
		return to;
	}

	function focusItem(i: number) {
		if (!listEl) return;
		const el = listEl.querySelector<HTMLElement>(`[data-sortable-index="${i}"]`);
		el?.focus();
	}

	function onDragStart(e: DragEvent, i: number) {
		if (disabled) {
			e.preventDefault();
			return;
		}
		draggingIndex = i;
		if (e.dataTransfer) {
			e.dataTransfer.effectAllowed = 'move';
			try {
				e.dataTransfer.setData('text/plain', String(i));
			} catch {
				/* noop */
			}
		}
	}

	function onDragOver(e: DragEvent, i: number) {
		if (draggingIndex == null) return;
		e.preventDefault();
		if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
		if (overIndex !== i) overIndex = i;
	}

	function onDrop(e: DragEvent, i: number) {
		e.preventDefault();
		if (draggingIndex == null) return;
		const from = draggingIndex;
		draggingIndex = null;
		overIndex = null;
		reorder(from, i);
		tick().then(() => focusItem(i));
	}

	function onDragEnd() {
		draggingIndex = null;
		overIndex = null;
	}

	function onItemKeydown(e: KeyboardEvent, i: number) {
		if (disabled) return;
		const horiz = orientation === 'horizontal';
		const prevKey = horiz ? 'ArrowLeft' : 'ArrowUp';
		const nextKey = horiz ? 'ArrowRight' : 'ArrowDown';

		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			if (e.repeat) return;
			grabbedIndex = grabbedIndex == null ? i : null;
			return;
		}
		if (e.key === 'Escape') {
			if (grabbedIndex != null) {
				e.preventDefault();
				grabbedIndex = null;
			}
			return;
		}
		if (e.key === prevKey) {
			e.preventDefault();
			if (grabbedIndex != null) {
				const to = Math.max(0, grabbedIndex - 1);
				grabbedIndex = reorder(grabbedIndex, to);
				tick().then(() => focusItem(grabbedIndex ?? to));
			} else if (i > 0) {
				focusItem(i - 1);
			}
		} else if (e.key === nextKey) {
			e.preventDefault();
			if (grabbedIndex != null) {
				const to = Math.min(items.length - 1, grabbedIndex + 1);
				grabbedIndex = reorder(grabbedIndex, to);
				tick().then(() => focusItem(grabbedIndex ?? to));
			} else if (i < items.length - 1) {
				focusItem(i + 1);
			}
		} else if (e.key === 'Home') {
			e.preventDefault();
			if (grabbedIndex != null) {
				grabbedIndex = reorder(grabbedIndex, 0);
				tick().then(() => focusItem(0));
			} else {
				focusItem(0);
			}
		} else if (e.key === 'End') {
			e.preventDefault();
			const last = items.length - 1;
			if (grabbedIndex != null) {
				grabbedIndex = reorder(grabbedIndex, last);
				tick().then(() => focusItem(last));
			} else {
				focusItem(last);
			}
		}
	}
</script>

<ul
	bind:this={listEl}
	role="list"
	data-orientation={orientation}
	class={className}
	data-disabled={disabled || undefined}
	{...mergeAttrs(
		labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }),
		widgetAttrs({ orientation })
	)}
>
	{#each items as it, i (key(it, i))}
		{@render item({
			value: it,
			index: i,
			isDragging: draggingIndex === i,
			grabbed: grabbedIndex === i,
			over: overIndex === i,
			itemAttrs: {
				'data-sortable-index': i,
				'data-dragging': draggingIndex === i || undefined,
				'data-grabbed': grabbedIndex === i || undefined,
				'data-over': overIndex === i || undefined,
				draggable: !disabled,
				tabindex: disabled ? -1 : 0,
				role: 'listitem',
				'aria-roledescription': 'sortable item',
				'aria-posinset': i + 1,
				'aria-setsize': items.length,
				ondragstart: (e: DragEvent) => onDragStart(e, i),
				ondragover: (e: DragEvent) => onDragOver(e, i),
				ondrop: (e: DragEvent) => onDrop(e, i),
				ondragend: onDragEnd,
				onkeydown: (e: KeyboardEvent) => onItemKeydown(e, i)
			}
		})}
	{/each}
</ul>

<VisuallyHidden aria-live="polite">{announce}</VisuallyHidden>
