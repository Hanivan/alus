<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Variant = 'info' | 'success' | 'warning' | 'error' | 'announcement';

	// 'title' is omitted as well as 'children': the component declares `title?: Snippet`
	// while `HTMLAttributes.title` is `string`, so the intersection is `never` — a
	// consumer's snippet could never be passed, silently.
	type Props = Omit<SvelteHTMLElements['section'], 'children' | 'title'> & {
		children?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		variant?: Variant;
		open?: boolean;
		dismissible?: boolean;
		role?: 'status' | 'alert' | 'region';
		live?: 'polite' | 'assertive' | 'off';
		titleClass?: string;
		ondismiss?: () => void;
	};

	let {
		children,
		title,
		icon,
		actions,
		variant = 'info',
		open = $bindable(true),
		dismissible = false,
		role = 'region',
		live,
		class: className = '',
		titleClass = '',
		style,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		ondismiss,
		...rest
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);

	function dismiss() {
		open = false;
		ondismiss?.();
	}
</script>

{#if open}
	<section
		{...rest}
		{role}
		aria-live={live ?? (role === 'alert' ? 'assertive' : role === 'status' ? 'polite' : undefined)}
		data-variant={variant}
		class={className}
		{style}
		{...ariaAttrs}
	>
		{#if icon}{@render icon()}{/if}
		<div>
			{#if title}<div class={titleClass}>{@render title()}</div>{/if}
			{#if children}{@render children()}{/if}
		</div>
		{#if actions}{@render actions()}{/if}
		{#if dismissible}
			<button type="button" aria-label="Dismiss banner" onclick={dismiss}>×</button>
		{/if}
	</section>
{/if}
