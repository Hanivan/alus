<script lang="ts">
	import type { HTMLLiAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLLiAttributes, 'children'> {
		children?: import('svelte').Snippet;
		href?: string;
		// Read by the `{#if current || !href}` markup — rule 3, so it stays declared.
		current?: boolean;
		// Consumed by the inner `<a>`, not by the host `<li>` — rule 3.
		linkClass?: string;
	}

	let {
		children,
		href,
		current = false,
		class: className = '',
		linkClass = '',
		...rest
	}: Props = $props();
</script>

<li {...rest} class={className}>
	{#if current || !href}
		<span aria-current={current ? 'page' : undefined}>
			{#if children}{@render children()}{/if}
		</span>
	{:else}
		<a {href} class={linkClass}>
			{#if children}{@render children()}{/if}
		</a>
	{/if}
</li>
