<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		href: string;
		newTab?: boolean;
		announceNewTab?: boolean;
		class?: string;
		'aria-label'?: string;
		'aria-describedby'?: string;
		onclick?: (e: MouseEvent) => void;
	}

	let {
		children,
		icon,
		href,
		newTab = true,
		announceNewTab = true,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-describedby': ariaDescribedby,
		onclick
	}: Props = $props();

	const srOnlyStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
</script>

<a
	{href}
	target={newTab ? '_blank' : undefined}
	rel={newTab ? 'noopener noreferrer' : undefined}
	class={className}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedby}
	data-external
	{onclick}
>
	{#if children}{@render children()}{/if}
	{#if icon}{@render icon()}{/if}
	{#if newTab && announceNewTab}
		<span style={srOnlyStyle}>(opens in new tab)</span>
	{/if}
</a>
