<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		prefix?: import('svelte').Snippet;
		suffix?: import('svelte').Snippet;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		prefix,
		suffix,
		class: className = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props = $props();
</script>

<div
	role="group"
	class={className}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
>
	{#if prefix}
		<span data-input-addon="prefix">{@render prefix()}</span>
	{/if}
	{#if children}{@render children()}{/if}
	{#if suffix}
		<span data-input-addon="suffix">{@render suffix()}</span>
	{/if}
</div>
