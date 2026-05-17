<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	type Variant = 'info' | 'success' | 'warning' | 'error';

	interface Props {
		children?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		variant?: Variant;
		class?: string;
		titleClass?: string;
		dismissible?: boolean;
		open?: boolean;
		role?: 'alert' | 'status';
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		ondismiss?: () => void;
	}

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
		ondismiss
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
		{role}
		aria-live={role === 'alert' ? 'assertive' : 'polite'}
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
