<script lang="ts">
	type Variant = 'info' | 'success' | 'warning' | 'error';

	interface Props {
		children?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		variant?: Variant;
		id?: string;
		class?: string;
		live?: 'polite' | 'assertive' | 'off';
		role?: 'status' | 'alert' | undefined;
		'aria-label'?: string;
	}

	let {
		children,
		icon,
		variant = 'info',
		id,
		class: className = '',
		live,
		role,
		'aria-label': ariaLabel
	}: Props = $props();

	const effectiveRole = $derived(
		role ?? (variant === 'error' || variant === 'warning' ? 'alert' : 'status')
	);
	const effectiveLive = $derived(live ?? (effectiveRole === 'alert' ? 'assertive' : 'polite'));
</script>

<span
	{id}
	role={effectiveRole}
	aria-live={effectiveLive}
	aria-label={ariaLabel}
	data-variant={variant}
	class={className}
>
	{#if icon}{@render icon()}{/if}
	{#if children}{@render children()}{/if}
</span>
