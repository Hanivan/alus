<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<li role="listitem" class={className}>
	{#if children}{@render children()}{/if}
</li>
