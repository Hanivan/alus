<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		for?: string;
		class?: string;
		id?: string;
		required?: boolean;
		requiredIndicator?: import('svelte').Snippet;
	}

	let {
		children,
		for: htmlFor,
		class: className = '',
		id,
		required = false,
		requiredIndicator
	}: Props = $props();
</script>

<label for={htmlFor} {id} class={className}>
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
