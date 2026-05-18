<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}
	let { children, class: className = '' }: Props = $props();
</script>

<tfoot class={className}>
	{#if children}{@render children()}{/if}
</tfoot>
