<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Variant = 'note' | 'info' | 'success' | 'warning' | 'error' | 'tip';

	// 'title' is omitted as well as 'children': the component declares `title?: Snippet`
	// while `HTMLAttributes.title` is `string`, so the intersection is `never` — a
	// consumer's snippet could never be passed, silently.
	type Props = Omit<SvelteHTMLElements['div'], 'children' | 'title'> & {
		children?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		variant?: Variant;
		style?: string;
		titleClass?: string;
		role?: 'note' | 'region' | 'group';
	};

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
		'aria-describedby': ariaDescribedby,
		...rest
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<div {...rest} {role} data-variant={variant} class={className} {style} {...ariaAttrs}>
	{#if icon}{@render icon()}{/if}
	<div>
		{#if title}
			<div class={titleClass}>{@render title()}</div>
		{/if}
		{#if children}{@render children()}{/if}
		{#if actions}{@render actions()}{/if}
	</div>
</div>
