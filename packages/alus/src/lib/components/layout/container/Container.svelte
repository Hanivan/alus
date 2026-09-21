<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Size = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

	const sizeMap: Record<Size, string> = {
		sm: '640px',
		md: '768px',
		lg: '1024px',
		xl: '1280px',
		'2xl': '1536px',
		full: '100%'
	};

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		maxWidth?: Size | string;
		padding?: string | number;
		center?: boolean;
		style?: string;
	};

	let {
		children,
		maxWidth = 'lg',
		padding = '1rem',
		center = true,
		class: className = '',
		style: extraStyle = '',
		...rest
	}: Props = $props();

	function toCssValue(v: string | number): string {
		return typeof v === 'number' ? `${v}px` : v;
	}

	const mw = $derived(maxWidth in sizeMap ? sizeMap[maxWidth as Size] : (maxWidth as string));

	const baseStyle = $derived(
		`max-width:${mw};${center ? 'margin-left:auto;margin-right:auto;' : ''}padding-left:${toCssValue(padding)};padding-right:${toCssValue(padding)};width:100%;`
	);
	const style = $derived(`${baseStyle}${extraStyle}`);
</script>

<div {...rest} class={className} {style} data-max-width={maxWidth}>
	{#if children}{@render children()}{/if}
</div>
