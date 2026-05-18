<script lang="ts" module>
	import { getContext, setContext } from 'svelte';
	import { generateCounterId } from '$utils/a11y/id.js';

	const KEY = Symbol('alus-ui:split-view');

	export interface SplitViewContext {
		orientation: () => 'horizontal' | 'vertical';
		size: () => number;
		setSize: (n: number) => void;
		min: () => number;
		max: () => number;
		disabled: () => boolean;
		dragging: () => boolean;
		setDragging: (v: boolean) => void;
		firstPaneId: string;
		secondPaneId: string;
	}

	export function getSplitViewContext(): SplitViewContext {
		const ctx = getContext<SplitViewContext | undefined>(KEY);
		if (!ctx) throw new Error('SplitView subcomponent must be inside <SplitView>');
		return ctx;
	}

	export function setSplitViewContext(ctx: SplitViewContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { labelAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		size?: number;
		min?: number;
		max?: number;
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		onResize?: (size: number) => void;
	}

	let {
		children,
		size = $bindable(50),
		min = 10,
		max = 90,
		orientation = 'horizontal',
		disabled = false,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		onResize
	}: Props = $props();

	let dragging = $state(false);
	const firstPaneId = generateCounterId('split-pane-first');
	const secondPaneId = generateCounterId('split-pane-second');

	function clamp(v: number): number {
		return Math.min(max, Math.max(min, v));
	}

	function setSize(n: number) {
		const next = clamp(n);
		if (next !== size) {
			size = next;
			onResize?.(next);
		}
	}

	setSplitViewContext({
		orientation: () => orientation,
		size: () => size,
		setSize,
		min: () => min,
		max: () => max,
		disabled: () => disabled,
		dragging: () => dragging,
		setDragging: (v) => (dragging = v),
		firstPaneId,
		secondPaneId
	});
</script>

<div
	class={className}
	data-orientation={orientation}
	data-dragging={dragging || undefined}
	data-disabled={disabled || undefined}
	{...labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby })}
>
	{#if children}{@render children()}{/if}
</div>
