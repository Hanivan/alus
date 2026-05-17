<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, class: className = '' }: Props = $props();
</script>

<li class={className} aria-hidden="true" role="presentation">
	{#if children}{@render children()}{:else}/{/if}
</li>
