<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['kbd'], 'children'> & {
		children?: import('svelte').Snippet;
		keys?: string[];
		separator?: string;
		'aria-label'?: string;
	};

	let {
		children,
		keys,
		separator = '+',
		class: className = '',
		'aria-label': ariaLabel,
		...rest
	}: Props = $props();
</script>

{#if keys && keys.length > 0}
	<kbd {...rest} class={className} aria-label={ariaLabel ?? keys.join(' then ')}>
		{#each keys as key, i (i)}
			<kbd>{key}</kbd>{#if i < keys.length - 1}<span aria-hidden="true">{separator}</span>{/if}
		{/each}
	</kbd>
{:else}
	<kbd {...rest} class={className} aria-label={ariaLabel}>
		{#if children}{@render children()}{/if}
	</kbd>
{/if}
