<script lang="ts">
	import type { HTMLLabelAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLLabelAttributes, 'children'> {
		children?: import('svelte').Snippet;
		required?: boolean;
		requiredIndicator?: import('svelte').Snippet;
	}

	let {
		children,
		class: className = '',
		required = false,
		requiredIndicator,
		...rest
	}: Props = $props();
</script>

<label {...rest} class={className}>
	{#if children}{@render children()}{/if}
	{#if required}
		{#if requiredIndicator}
			{@render requiredIndicator()}
		{:else}
			<span aria-hidden="true">*</span>
			<span class="sr-only">required</span>
		{/if}
	{/if}
</label>
