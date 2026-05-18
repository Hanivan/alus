<script lang="ts">
	type Align = 'start' | 'center' | 'end' | 'stretch';
	type Justify = 'start' | 'center' | 'end' | 'stretch';

	interface Props {
		children?: import('svelte').Snippet;
		cols?: number | string;
		rows?: number | string;
		gap?: string | number;
		colGap?: string | number;
		rowGap?: string | number;
		minColWidth?: string;
		align?: Align;
		justify?: Justify;
		inline?: boolean;
		class?: string;
		style?: string;
	}

	let {
		children,
		cols,
		rows,
		gap = '1rem',
		colGap,
		rowGap,
		minColWidth,
		align = 'stretch',
		justify = 'stretch',
		inline = false,
		class: className = '',
		style: extraStyle = ''
	}: Props = $props();

	function toCssValue(v: string | number): string {
		return typeof v === 'number' ? `${v}px` : v;
	}

	const templateCols = $derived.by(() => {
		if (minColWidth)
			return `grid-template-columns:repeat(auto-fill,minmax(${minColWidth},1fr));`;
		if (cols === undefined) return '';
		return `grid-template-columns:${typeof cols === 'number' ? `repeat(${cols},minmax(0,1fr))` : cols};`;
	});

	const templateRows = $derived(
		rows === undefined
			? ''
			: `grid-template-rows:${typeof rows === 'number' ? `repeat(${rows},minmax(0,auto))` : rows};`
	);

	const gapStyle = $derived.by(() => {
		if (colGap !== undefined || rowGap !== undefined) {
			const r = rowGap ?? gap;
			const c = colGap ?? gap;
			return `row-gap:${toCssValue(r)};column-gap:${toCssValue(c)};`;
		}
		return `gap:${toCssValue(gap)};`;
	});

	const alignCss = $derived(align);
	const justifyCss = $derived(justify);

	const baseStyle = $derived(
		`display:${inline ? 'inline-grid' : 'grid'};${templateCols}${templateRows}${gapStyle}align-items:${alignCss};justify-items:${justifyCss};`
	);
	const style = $derived(`${baseStyle}${extraStyle}`);
</script>

<div class={className} {style}>
	{#if children}{@render children()}{/if}
</div>
