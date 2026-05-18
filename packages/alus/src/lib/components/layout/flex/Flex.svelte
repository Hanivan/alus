<script lang="ts">
	type Direction = 'row' | 'row-reverse' | 'column' | 'column-reverse';
	type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
	type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
	type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

	interface Props {
		children?: import('svelte').Snippet;
		direction?: Direction;
		align?: Align;
		justify?: Justify;
		wrap?: Wrap;
		gap?: string | number;
		inline?: boolean;
		class?: string;
		style?: string;
	}

	let {
		children,
		direction = 'row',
		align = 'stretch',
		justify = 'start',
		wrap = 'nowrap',
		gap = 0,
		inline = false,
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
		`display:${inline ? 'inline-flex' : 'flex'};flex-direction:${direction};align-items:${alignCss};justify-content:${justifyCss};flex-wrap:${wrap};gap:${toCssValue(gap)};`
	);
	const style = $derived(`${baseStyle}${extraStyle}`);
</script>

<div class={className} {style}>
	{#if children}{@render children()}{/if}
</div>
