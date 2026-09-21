<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['nav'], 'children'> & {
		children?: import('svelte').Snippet;
		// Consumed by the inner `<ol>`, not by the host — rule 3, so it stays declared and
		// keeps reaching the list exactly as before.
		listClass?: string;
		// Kept: the default `'Breadcrumb'` is the nav's only accessible name.
		'aria-label'?: string;
	};

	let {
		children,
		class: className = '',
		listClass = '',
		'aria-label': ariaLabel = 'Breadcrumb',
		...rest
	}: Props = $props();
</script>

<nav {...rest} class={className} aria-label={ariaLabel}>
	<ol class={listClass}>
		{#if children}{@render children()}{/if}
	</ol>
</nav>
