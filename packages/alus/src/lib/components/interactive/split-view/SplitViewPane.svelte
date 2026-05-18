<script lang="ts">
	import { getSplitViewContext } from './SplitView.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		side: 'first' | 'second';
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		side,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props = $props();

	const ctx = getSplitViewContext();

	const paneStyle = $derived.by(() => {
		const horiz = ctx.orientation() === 'horizontal';
		const size = ctx.size();
		const dim = horiz ? 'width' : 'height';
		const value = side === 'first' ? `${size}%` : `${100 - size}%`;
		return `${dim}:${value};flex:0 0 ${value};`;
	});

	const paneId = $derived(side === 'first' ? ctx.firstPaneId : ctx.secondPaneId);
</script>

<div
	id={paneId}
	role="group"
	data-side={side}
	class={className}
	style={paneStyle}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
>
	{#if children}{@render children()}{/if}
</div>
