<script lang="ts">
	interface Props {
		when: unknown;
		children?: import('svelte').Snippet;
		fallback?: import('svelte').Snippet;
	}

	let { when, children, fallback }: Props = $props();
</script>

{#if when}
	{#if children}{@render children()}{/if}
{:else if fallback}
	{@render fallback()}
{/if}
