<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	// 'prefix' is omitted as well as 'children': the native `HTMLAttributes.prefix` is `string`
	// (the RDFa prefix), which intersects with this component's `Snippet` prefix to an
	// unsatisfiable type — so `{#snippet prefix()}` at a consumer call site would be a compile
	// error that neither the package check nor the root check reports. `Omit` removes only the
	// native declaration; the snippet prop below is still exposed.
	type Props = Omit<SvelteHTMLElements['div'], 'children' | 'prefix'> & {
		children?: import('svelte').Snippet;
		prefix?: import('svelte').Snippet;
		suffix?: import('svelte').Snippet;
	};

	let { children, prefix, suffix, class: className = '', ...rest }: Props = $props();
</script>

<div {...rest} role="group" class={className}>
	{#if prefix}
		<span data-input-addon="prefix">{@render prefix()}</span>
	{/if}
	{#if children}{@render children()}{/if}
	{#if suffix}
		<span data-input-addon="suffix">{@render suffix()}</span>
	{/if}
</div>
