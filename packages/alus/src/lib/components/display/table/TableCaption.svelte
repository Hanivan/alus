<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		side?: 'top' | 'bottom';
	}

	let { children, class: className = '', side = 'top' }: Props = $props();
</script>

<caption class={className} style="caption-side:{side};">
	{#if children}{@render children()}{/if}
</caption>
