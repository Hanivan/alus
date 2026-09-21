<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLAnchorAttributes, 'children'> {
		children?: import('svelte').Snippet;
		icon?: import('svelte').Snippet;
		// Kept required: the link is useless without a destination, so this stays a
		// consumer-side requirement. A declared member wins over the inherited optional one
		// (`HTMLAnchorAttributes.href` is `string | undefined | null`), and `string` is
		// assignable to it, so the narrowing is legal.
		href: string;
		newTab?: boolean;
		// Read by the `{#if newTab && announceNewTab}` markup — rule 3.
		announceNewTab?: boolean;
		// `aria-label` and `aria-describedby` are NOT declared: both were verbatim, no-default
		// passthroughs (the value only ever came from the consumer), so they are deleted and
		// `rest` delivers them to the same `<a>` with identical effect. The `srOnlyStyle` span
		// is a child, not the host, so nothing below depends on the declaration.
	}

	let {
		children,
		icon,
		href,
		newTab = true,
		announceNewTab = true,
		class: className = '',
		...rest
	}: Props = $props();

	const srOnlyStyle =
		'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
</script>

<a
	{...rest}
	{href}
	target={newTab ? '_blank' : undefined}
	rel="external noopener noreferrer"
	class={className}
	data-external
>
	{#if children}{@render children()}{/if}
	{#if icon}{@render icon()}{/if}
	{#if newTab && announceNewTab}
		<span style={srOnlyStyle}>(opens in new tab)</span>
	{/if}
</a>
