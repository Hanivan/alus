<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
		class?: string;
		style?: string;
	}

	let {
		children,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-current': ariaCurrent,
		class: className = '',
		style
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<nav class={className} {style} aria-current={ariaCurrent} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</nav>
