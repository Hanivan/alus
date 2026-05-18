<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
		sort?: 'ascending' | 'descending' | 'none' | 'other';
		colspan?: number;
		rowspan?: number;
	}
	let {
		children,
		class: className = '',
		scope = 'col',
		sort,
		colspan,
		rowspan
	}: Props = $props();
</script>

<th class={className} {scope} aria-sort={sort} {colspan} {rowspan}>
	{#if children}{@render children()}{/if}
</th>
