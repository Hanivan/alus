<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<footer class={className}>
	{#if children}{@render children()}{/if}
</footer>
