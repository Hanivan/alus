<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		colspan?: number;
		rowspan?: number;
		headers?: string;
	}
	let { children, class: className = '', colspan, rowspan, headers }: Props = $props();
</script>

<td class={className} {colspan} {rowspan} {headers}>
	{#if children}{@render children()}{/if}
</td>
