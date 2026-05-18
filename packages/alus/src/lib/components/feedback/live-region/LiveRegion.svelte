<script lang="ts">
	type Politeness = 'polite' | 'assertive' | 'off';

	interface Props {
		children?: import('svelte').Snippet;
		message?: string;
		politeness?: Politeness;
		atomic?: boolean;
		relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text';
		role?: 'status' | 'alert' | 'log' | 'marquee' | 'timer' | undefined;
		visuallyHidden?: boolean;
		class?: string;
		'aria-label'?: string;
	}

	let {
		children,
		message,
		politeness = 'polite',
		atomic = true,
		relevant,
		role,
		visuallyHidden = true,
		class: className = '',
		'aria-label': ariaLabel
	}: Props = $props();

	const effectiveRole = $derived(role ?? (politeness === 'assertive' ? 'alert' : 'status'));

	const hiddenStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
</script>

<div
	role={effectiveRole}
	aria-live={politeness}
	aria-atomic={atomic}
	aria-relevant={relevant}
	aria-label={ariaLabel}
	class={className}
	style={visuallyHidden ? hiddenStyle : undefined}
>
	{#if children}
		{@render children()}
	{:else if message}
		{message}
	{/if}
</div>
