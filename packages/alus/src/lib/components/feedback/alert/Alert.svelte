<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Variant = 'info' | 'success' | 'warning' | 'error';

	// 'title' is omitted as well as 'children': the component declares `title?: Snippet`
	// while `HTMLAttributes.title` is `string`, so the intersection is `never` — a
	// consumer's snippet could never be passed, silently.
	type Props = Omit<SvelteHTMLElements['div'], 'children' | 'title'> & {
		children?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		variant?: Variant;
		titleClass?: string;
		dismissible?: boolean;
		open?: boolean;
		role?: 'alert' | 'status';
		ondismiss?: () => void;
	};

	let {
		children,
		title,
		actions,
		icon,
		variant = 'info',
		class: className = '',
		titleClass = '',
		dismissible = false,
		open = $bindable(true),
		role = 'alert',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		ondismiss,
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
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
	<div
		{...rest}
		{role}
		aria-live={role === 'alert' ? 'assertive' : 'polite'}
		aria-atomic="true"
		data-variant={variant}
		class={className}
		{...ariaAttrs}
	>
		{#if icon}{@render icon()}{/if}
		<div>
			{#if title}
				<div class={titleClass}>{@render title()}</div>
			{/if}
			{#if children}{@render children()}{/if}
		</div>
		{#if actions}{@render actions()}{/if}
		{#if dismissible}
			<button type="button" aria-label="Dismiss" onclick={dismiss}>×</button>
		{/if}
	</div>
{/if}
