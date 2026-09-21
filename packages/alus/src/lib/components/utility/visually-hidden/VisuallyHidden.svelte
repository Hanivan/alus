<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLElement>, 'children'> & {
		children?: import('svelte').Snippet;
		as?: 'span' | 'div';
		style?: string;
	};

	let { children, as = 'span', style: extraStyle = '', ...rest }: Props = $props();

	const hiddenStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';

	// The host writes its own `style`, so a consumer's `style` must be appended rather than
	// dropped: `{...rest}` goes first, which would otherwise discard it silently. `hiddenStyle`
	// is never empty, so no `undefined`-shape preservation is needed here.
	const style = $derived(`${hiddenStyle}${extraStyle}`);
</script>

{#if as === 'div'}
	<div {...rest} {style}>
		{#if children}{@render children()}{/if}
	</div>
{:else}
	<span {...rest} {style}>
		{#if children}{@render children()}{/if}
	</span>
{/if}
