<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		count?: number;
		width?: string;
		gap?: string | number;
		balance?: boolean;
		style?: string;
	};

	let {
		children,
		count,
		width,
		gap = '1rem',
		balance = true,
		class: className = '',
		style: extraStyle = '',
		...rest
	}: Props = $props();

	function toCssValue(v: string | number): string {
		return typeof v === 'number' ? `${v}px` : v;
	}

	const baseStyle = $derived.by(() => {
		const parts: string[] = [];
		if (count !== undefined) parts.push(`column-count:${count};`);
		if (width !== undefined) parts.push(`column-width:${width};`);
		parts.push(`column-gap:${toCssValue(gap)};`);
		parts.push(`column-fill:${balance ? 'balance' : 'auto'};`);
		return parts.join('');
	});

	const style = $derived(`${baseStyle}${extraStyle}`);
</script>

<div {...rest} class={className} {style}>
	{#if children}{@render children()}{/if}
</div>
