<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import type { AriaCurrent } from '$types/index.js';

	type Props = Omit<SvelteHTMLElements['nav'], 'children'> & {
		children?: import('svelte').Snippet;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-current'?: AriaCurrent;
		// Kept: this component already declares and emits `style` itself, so it is not part of
		// the merge class — `{style}` after `{...rest}` already lets the consumer's value win.
		style?: string;
	};

	let {
		children,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-current': ariaCurrent,
		class: className = '',
		style,
		...rest
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<nav {...rest} class={className} {style} aria-current={ariaCurrent} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</nav>
