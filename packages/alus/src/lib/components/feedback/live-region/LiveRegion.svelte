<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Politeness = 'polite' | 'assertive' | 'off';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet;
		message?: string;
		politeness?: Politeness;
		atomic?: boolean;
		relevant?: 'additions' | 'removals' | 'text' | 'all' | 'additions text';
		role?: 'status' | 'alert' | 'log' | 'marquee' | 'timer' | undefined;
		visuallyHidden?: boolean;
		style?: string;
		'aria-label'?: string;
	};

	let {
		children,
		message,
		politeness = 'polite',
		atomic = true,
		relevant,
		role,
		visuallyHidden = true,
		class: className = '',
		'aria-label': ariaLabel,
		style: extraStyle = '',
		...rest
	}: Props = $props();

	const effectiveRole = $derived(role ?? (politeness === 'assertive' ? 'alert' : 'status'));

	const hiddenStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';

	// The host writes its own `style`, so a consumer's `style` must be appended rather than
	// dropped: `{...rest}` goes first, which would otherwise discard it silently.
	//
	// The base is the ternary `visuallyHidden ? hiddenStyle : undefined`, and that `undefined`
	// shape is preserved: with `visuallyHidden={false}` and no consumer `style` the component
	// must emit no `style` attribute at all, exactly as before this change.
	const style = $derived(visuallyHidden ? `${hiddenStyle}${extraStyle}` : extraStyle || undefined);
</script>

<div
	{...rest}
	role={effectiveRole}
	aria-live={politeness}
	aria-atomic={atomic}
	aria-relevant={relevant}
	aria-label={ariaLabel}
	class={className}
	{style}
>
	{#if children}
		{@render children()}
	{:else if message}
		{message}
	{/if}
</div>
