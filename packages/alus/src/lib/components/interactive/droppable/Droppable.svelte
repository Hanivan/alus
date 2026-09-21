<script lang="ts" module>
	export interface DroppableEvent<T = unknown> {
		data: T | null;
		dataTransfer: DataTransfer;
		event: DragEvent;
	}
</script>

<script lang="ts" generics="T">
	import type { HTMLAttributes } from 'svelte/elements';

	// Five branches with different host elements (`span` / `li` / `ul` / `section` / `div`), so a
	// single element type cannot describe the host — `HTMLAttributes<HTMLElement>` is the base.
	type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		children?: import('svelte').Snippet<[{ over: boolean }]>;
		type?: string;
		disabled?: boolean;
		effect?: 'copy' | 'move' | 'link' | 'none';
		as?: 'div' | 'span' | 'li' | 'ul' | 'section';
		style?: string;
		onDrop?: (e: DroppableEvent<T>) => void;
		onDragEnter?: (e: DragEvent) => void;
		onDragLeave?: (e: DragEvent) => void;
	};

	let {
		children,
		type = 'application/x-alus-ui',
		disabled = false,
		effect = 'move',
		as = 'div',
		class: className = '',
		style,
		onDrop,
		onDragEnter,
		onDragLeave,
		...rest
	}: Props = $props();

	let over = $state(false);
	let counter = 0;

	function enter(e: DragEvent) {
		if (disabled) return;
		counter++;
		over = true;
		onDragEnter?.(e);
	}

	function leave(e: DragEvent) {
		counter = Math.max(0, counter - 1);
		if (counter === 0) over = false;
		onDragLeave?.(e);
	}

	function dragover(e: DragEvent) {
		if (disabled) return;
		e.preventDefault();
		if (e.dataTransfer) e.dataTransfer.dropEffect = effect;
	}

	function drop(e: DragEvent) {
		if (disabled || !e.dataTransfer) return;
		e.preventDefault();
		over = false;
		counter = 0;
		const raw = e.dataTransfer.getData(type);
		let data: T | null = null;
		if (raw) {
			try {
				data = JSON.parse(raw) as T;
			} catch {
				data = raw as unknown as T;
			}
		}
		onDrop?.({ data, dataTransfer: e.dataTransfer, event: e });
	}
</script>

{#snippet inner()}
	{#if children}{@render children({ over })}{/if}
{/snippet}

{#if as === 'span'}
	<span
		{...rest}
		class={className}
		{style}
		aria-dropeffect={effect}
		data-over={over ? '' : undefined}
		ondragenter={enter}
		ondragleave={leave}
		ondragover={dragover}
		ondrop={drop}
	>
		{@render inner()}
	</span>
{:else if as === 'li'}
	<li
		{...rest}
		class={className}
		{style}
		aria-dropeffect={effect}
		data-over={over ? '' : undefined}
		ondragenter={enter}
		ondragleave={leave}
		ondragover={dragover}
		ondrop={drop}
	>
		{@render inner()}
	</li>
{:else if as === 'ul'}
	<ul
		{...rest}
		class={className}
		{style}
		aria-dropeffect={effect}
		data-over={over ? '' : undefined}
		ondragenter={enter}
		ondragleave={leave}
		ondragover={dragover}
		ondrop={drop}
	>
		{@render inner()}
	</ul>
{:else if as === 'section'}
	<section
		{...rest}
		class={className}
		{style}
		aria-dropeffect={effect}
		data-over={over ? '' : undefined}
		ondragenter={enter}
		ondragleave={leave}
		ondragover={dragover}
		ondrop={drop}
	>
		{@render inner()}
	</section>
{:else}
	<div
		{...rest}
		class={className}
		{style}
		aria-dropeffect={effect}
		data-over={over ? '' : undefined}
		ondragenter={enter}
		ondragleave={leave}
		ondragover={dragover}
		ondrop={drop}
	>
		{@render inner()}
	</div>
{/if}
