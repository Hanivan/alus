<script lang="ts" module>
	export interface DraggableEvent<T = unknown> {
		data: T;
		dataTransfer: DataTransfer;
		event: DragEvent;
	}
</script>

<script lang="ts" generics="T">
	interface Props {
		children?: import('svelte').Snippet<[{ dragging: boolean }]>;
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
	}

	let {
		children,
		data,
		type = 'application/x-alus',
		disabled = false,
		effect = 'move',
		as = 'div',
		class: className = '',
		style,
		'aria-label': ariaLabel,
		onDragStart,
		onDragEnd
	}: Props = $props();

	let dragging = $state(false);

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
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if as === 'span'}
	<span
		class={className}
		{style}
		draggable={!disabled}
		aria-label={ariaLabel}
		aria-grabbed={dragging ? 'true' : undefined}
		data-dragging={dragging ? '' : undefined}
		ondragstart={start}
		ondragend={end}
	>
		{#if children}{@render children({ dragging })}{/if}
	</span>
{:else if as === 'li'}
	<li
		class={className}
		{style}
		draggable={!disabled}
		aria-label={ariaLabel}
		aria-grabbed={dragging ? 'true' : undefined}
		data-dragging={dragging ? '' : undefined}
		ondragstart={start}
		ondragend={end}
	>
		{#if children}{@render children({ dragging })}{/if}
	</li>
{:else}
	<div
		class={className}
		{style}
		draggable={!disabled}
		aria-label={ariaLabel}
		aria-grabbed={dragging ? 'true' : undefined}
		data-dragging={dragging ? '' : undefined}
		ondragstart={start}
		ondragend={end}
	>
		{#if children}{@render children({ dragging })}{/if}
	</div>
{/if}
