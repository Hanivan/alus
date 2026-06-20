<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<span aria-hidden="true" class={className}>
	{#if children}{@render children()}{:else}/{/if}
</span>
