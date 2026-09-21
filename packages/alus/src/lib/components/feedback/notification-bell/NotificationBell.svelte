<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet<[{ count: number; display: string; hasUnread: boolean }]>;
		count?: number;
		max?: number;
		showZero?: boolean;
		disabled?: boolean;
		badgeClass?: string;
		announce?: boolean;
		'aria-label'?: string;
		onclick?: (e: MouseEvent) => void;
	}

	let {
		children,
		count = 0,
		max = 99,
		showZero = false,
		disabled = false,
		class: className = '',
		badgeClass = '',
		announce = true,
		'aria-label': ariaLabel,
		onclick,
		...rest
	}: Props = $props();

	const display = $derived(count > max ? `${max}+` : String(count));
	const hasUnread = $derived(count > 0);
	const showBadge = $derived(hasUnread || showZero);
	const label = $derived(
		ariaLabel ?? (hasUnread ? `Notifications, ${count} unread` : 'Notifications, no unread items')
	);

	// `onclick` stays declared and explicit: it is the component's own prop, and declaring it
	// keeps it out of `rest` entirely, so there is no shadowing — the consumer's handler
	// reaches the host through the prop, exactly as it did before this change.
	const srOnlyStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
</script>

<button
	{...rest}
	type="button"
	class={className}
	aria-label={label}
	aria-disabled={disabled || undefined}
	{disabled}
	data-has-unread={hasUnread || undefined}
	{onclick}
>
	{#if children}
		{@render children({ count, display, hasUnread })}
	{/if}
	{#if showBadge}
		<span class={badgeClass} data-notification-badge aria-hidden="true">{display}</span>
	{/if}
	{#if announce}
		<span style={srOnlyStyle} aria-live="polite" aria-atomic="true">{label}</span>
	{/if}
</button>
