<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getSplitViewContext } from './SplitView.svelte';
	import { labelAttrs } from '$utils/a11y/index.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		side: 'first' | 'second';
		style?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	};

	let {
		children,
		side,
		class: className = '',
		style: extraStyle = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		...rest
	}: Props = $props();

	const ctx = getSplitViewContext();

	// The host writes its own `style`, so a consumer's `style` must be appended rather than
	// dropped: `{...rest}` goes first, which would otherwise discard it silently.
	const paneStyle = $derived.by(() => {
		const horiz = ctx.orientation() === 'horizontal';
		const size = ctx.size();
		const dim = horiz ? 'width' : 'height';
		const value = side === 'first' ? `${size}%` : `${100 - size}%`;
		return `${dim}:${value};flex:0 0 ${value};${extraStyle}`;
	});

	const paneId = $derived(side === 'first' ? ctx.firstPaneId : ctx.secondPaneId);
</script>

<div
	{...rest}
	id={paneId}
	role="group"
	data-side={side}
	class={className}
	style={paneStyle}
	{...labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby })}
>
	{#if children}{@render children()}{/if}
</div>
