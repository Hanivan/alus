<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['th'], 'children'> & {
		children?: import('svelte').Snippet;
		scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
		sort?: 'ascending' | 'descending' | 'none' | 'other';
	};
	let { children, class: className = '', scope = 'col', sort, ...rest }: Props = $props();
</script>

<th {...rest} class={className} {scope} aria-sort={sort}>
	{#if children}{@render children()}{/if}
</th>
