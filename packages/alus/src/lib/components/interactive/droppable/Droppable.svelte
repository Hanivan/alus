<script lang="ts" module>
	export interface DroppableEvent<T = unknown> {
		data: T | null;
		dataTransfer: DataTransfer;
		event: DragEvent;
	}
</script>

<script lang="ts" generics="T">
	interface Props {
		children?: import('svelte').Snippet<[{ over: boolean }]>;
		type?: string;
		disabled?: boolean;
		effect?: 'copy' | 'move' | 'link' | 'none';
		as?: 'div' | 'span' | 'li' | 'ul' | 'section';
		class?: string;
		style?: string;
		'aria-label'?: string;
		onDrop?: (e: DroppableEvent<T>) => void;
		onDragEnter?: (e: DragEvent) => void;
		onDragLeave?: (e: DragEvent) => void;
	}

	let {
		children,
		type = 'application/x-alus',
		disabled = false,
		effect = 'move',
		as = 'div',
		class: className = '',
		style,
		'aria-label': ariaLabel,
		onDrop,
		onDragEnter,
		onDragLeave
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if as === 'span'}
	<span
		class={className}
		{style}
		aria-label={ariaLabel}
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
		class={className}
		{style}
		aria-label={ariaLabel}
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
		class={className}
		{style}
		aria-label={ariaLabel}
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
		class={className}
		{style}
		aria-label={ariaLabel}
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
		class={className}
		{style}
		aria-label={ariaLabel}
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
