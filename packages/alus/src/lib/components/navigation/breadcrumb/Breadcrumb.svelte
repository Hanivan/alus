<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		listClass?: string;
		'aria-label'?: string;
	}

	let {
		children,
		class: className = '',
		listClass = '',
		'aria-label': ariaLabel = 'Breadcrumb'
	}: Props = $props();
</script>

<nav class={className} aria-label={ariaLabel}>
	<ol class={listClass}>
		{#if children}{@render children()}{/if}
	</ol>
</nav>
