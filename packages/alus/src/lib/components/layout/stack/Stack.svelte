<script lang="ts">
	type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

	interface Props {
		children?: import('svelte').Snippet;
		gap?: string | number;
		align?: Align;
		justify?: Justify;
		direction?: 'vertical' | 'horizontal';
		wrap?: boolean;
		class?: string;
		style?: string;
	}

	let {
		children,
		gap = '1rem',
		align = 'stretch',
		justify = 'start',
		direction = 'vertical',
		wrap = false,
		class: className = '',
		style: extraStyle = ''
	}: Props = $props();

	function toCssValue(v: string | number): string {
		return typeof v === 'number' ? `${v}px` : v;
	}

	const alignCss = $derived(
		align === 'start'
			? 'flex-start'
			: align === 'end'
				? 'flex-end'
				: align === 'baseline'
					? 'baseline'
					: align
	);
	const justifyCss = $derived(
		justify === 'start'
			? 'flex-start'
			: justify === 'end'
				? 'flex-end'
				: justify === 'between'
					? 'space-between'
					: justify === 'around'
						? 'space-around'
						: justify === 'evenly'
							? 'space-evenly'
							: justify
	);

	const baseStyle = $derived(
		`display:flex;flex-direction:${direction === 'vertical' ? 'column' : 'row'};gap:${toCssValue(gap)};align-items:${alignCss};justify-content:${justifyCss};${wrap ? 'flex-wrap:wrap;' : ''}`
	);
	const style = $derived(`${baseStyle}${extraStyle}`);
</script>

<div class={className} {style} data-direction={direction}>
	{#if children}{@render children()}{/if}
</div>
