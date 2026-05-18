<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<dd class={className}>
	{#if children}{@render children()}{/if}
</dd>
