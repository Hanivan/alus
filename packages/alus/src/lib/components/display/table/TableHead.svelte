<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}
	let { children, class: className = '' }: Props = $props();
</script>

<thead class={className}>
	{#if children}{@render children()}{/if}
</thead>
