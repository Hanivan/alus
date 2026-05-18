<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		as?: 'ul' | 'ol';
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		class: className = '',
		as = 'ul',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props = $props();
</script>

<svelte:element
	this={as}
	role="list"
	class={className}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
>
	{#if children}{@render children()}{/if}
</svelte:element>
