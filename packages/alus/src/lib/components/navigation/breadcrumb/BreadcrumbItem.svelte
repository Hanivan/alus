<script lang="ts">
	import { resolve } from '$app/paths';

	interface Props {
		children?: import('svelte').Snippet;
		href?: string;
		current?: boolean;
		class?: string;
		linkClass?: string;
	}

	let { children, href, current = false, class: className = '', linkClass = '' }: Props = $props();
</script>

<li class={className}>
	{#if current || !href}
		<span aria-current={current ? 'page' : undefined}>
			{#if children}{@render children()}{/if}
		</span>
	{:else}
		<a href={resolve(href!)} class={linkClass}>
			{#if children}{@render children()}{/if}
		</a>
	{/if}
</li>
