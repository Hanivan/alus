<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Fit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		width?: string | number;
		height?: string | number;
		minWidth?: string | number;
		minHeight?: string | number;
		maxWidth?: string | number;
		maxHeight?: string | number;
		fit?: Fit;
		overflow?: 'visible' | 'hidden' | 'auto' | 'scroll';
		style?: string;
	};

	let {
		children,
		width,
		height,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,
		fit,
		overflow = 'hidden',
		class: className = '',
		style: extraStyle = '',
		...rest
	}: Props = $props();

	function v(x: string | number | undefined): string {
		if (x === undefined) return '';
		return typeof x === 'number' ? `${x}px` : x;
	}

	const baseStyle = $derived.by(() => {
		const parts: string[] = [];
		if (width !== undefined) parts.push(`width:${v(width)};`);
		if (height !== undefined) parts.push(`height:${v(height)};`);
		if (minWidth !== undefined) parts.push(`min-width:${v(minWidth)};`);
		if (minHeight !== undefined) parts.push(`min-height:${v(minHeight)};`);
		if (maxWidth !== undefined) parts.push(`max-width:${v(maxWidth)};`);
		if (maxHeight !== undefined) parts.push(`max-height:${v(maxHeight)};`);
		parts.push(`overflow:${overflow};`);
		if (fit) parts.push('display:block;');
		return parts.join('');
	});

	const style = $derived(`${baseStyle}${extraStyle}`);
</script>

<div {...rest} class={className} {style} data-frame>
	{#if fit && children}
		<div style={`width:100%;height:100%;object-fit:${fit};`}>
			{@render children()}
		</div>
	{:else if children}
		{@render children()}
	{/if}
</div>
