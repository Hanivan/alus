<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		selected?: boolean;
	}
	let { children, class: className = '', selected }: Props = $props();
</script>

<tr class={className} aria-selected={selected || undefined} data-selected={selected || undefined}>
	{#if children}{@render children()}{/if}
</tr>
