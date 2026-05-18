<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		keys?: string[];
		separator?: string;
		class?: string;
		'aria-label'?: string;
	}

	let {
		children,
		keys,
		separator = '+',
		class: className = '',
		'aria-label': ariaLabel
	}: Props = $props();
</script>

{#if keys && keys.length > 0}
	<kbd class={className} aria-label={ariaLabel ?? keys.join(' then ')}>
		{#each keys as key, i}
			<kbd>{key}</kbd>{#if i < keys.length - 1}<span aria-hidden="true">{separator}</span>{/if}
		{/each}
	</kbd>
{:else}
	<kbd class={className} aria-label={ariaLabel}>
		{#if children}{@render children()}{/if}
	</kbd>
{/if}
