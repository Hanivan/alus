<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props = $props();
</script>

<dl class={className} aria-label={ariaLabel} aria-labelledby={ariaLabelledby}>
	{#if children}{@render children()}{/if}
</dl>
