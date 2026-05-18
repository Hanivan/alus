<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet<[{ count: number; display: string; hasUnread: boolean }]>;
		count?: number;
		max?: number;
		showZero?: boolean;
		disabled?: boolean;
		class?: string;
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
		onclick
	}: Props = $props();

	const display = $derived(count > max ? `${max}+` : String(count));
	const hasUnread = $derived(count > 0);
	const showBadge = $derived(hasUnread || showZero);
	const label = $derived(
		ariaLabel ??
			(hasUnread ? `Notifications, ${count} unread` : 'Notifications, no unread items')
	);

	const srOnlyStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
</script>

<button
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
