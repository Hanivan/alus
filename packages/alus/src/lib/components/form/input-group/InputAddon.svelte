<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		position?: 'prefix' | 'suffix';
	}

	let { children, class: className = '', position = 'prefix' }: Props = $props();
</script>

<span data-input-addon={position} class={className}>
	{#if children}{@render children()}{/if}
</span>
