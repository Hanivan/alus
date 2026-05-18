<script lang="ts">
	interface Props {
		size?: string | number;
		grow?: boolean;
		axis?: 'horizontal' | 'vertical' | 'both';
		class?: string;
		style?: string;
	}

	let {
		size,
		grow = true,
		axis = 'both',
		class: className = '',
		style: extraStyle = ''
	}: Props = $props();

	function toCssValue(v: string | number): string {
		return typeof v === 'number' ? `${v}px` : v;
	}

	const baseStyle = $derived.by(() => {
		if (size !== undefined) {
			const v = toCssValue(size);
			if (axis === 'horizontal') return `width:${v};min-width:${v};height:1px;`;
			if (axis === 'vertical') return `height:${v};min-height:${v};width:1px;`;
			return `width:${v};height:${v};`;
		}
		return grow ? 'flex:1 1 auto;align-self:stretch;justify-self:stretch;' : '';
	});

	const style = $derived(`${baseStyle}${extraStyle}`);
</script>

<div class={className} {style} aria-hidden="true" data-axis={axis}></div>
