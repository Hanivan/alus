<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	type Variant = 'note' | 'info' | 'success' | 'warning' | 'error' | 'tip';

	interface Props {
		children?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		variant?: Variant;
		class?: string;
		style?: string;
		titleClass?: string;
		role?: 'note' | 'region' | 'group';
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		title,
		icon,
		actions,
		variant = 'note',
		class: className = '',
		style,
		titleClass = '',
		role = 'note',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<div {role} data-variant={variant} class={className} {style} {...ariaAttrs}>
	{#if icon}{@render icon()}{/if}
	<div>
		{#if title}
			<div class={titleClass}>{@render title()}</div>
		{/if}
		{#if children}{@render children()}{/if}
		{#if actions}{@render actions()}{/if}
	</div>
</div>
