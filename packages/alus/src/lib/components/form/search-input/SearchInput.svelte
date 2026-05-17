<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ value: string; clear: () => void }]>;
		value?: string;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		name?: string;
		id?: string;
		class?: string;
		inputClass?: string;
		clearLabel?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		onclear?: () => void;
	}

	let {
		children,
		value = $bindable(''),
		placeholder = '',
		disabled = false,
		required = false,
		name,
		id,
		class: className = '',
		inputClass = '',
		clearLabel = 'Clear search',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		oninput,
		onchange,
		onclear
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);

	function clear() {
		value = '';
		onclear?.();
	}
</script>

{#if children}
	{@render children({ value, clear })}
{:else}
	<div class={className} role="search">
		<input
			type="search"
			{id}
			{name}
			{placeholder}
			{disabled}
			{required}
			bind:value
			class={inputClass}
			{oninput}
			{onchange}
			{...ariaAttrs}
		/>
		{#if value}
			<button type="button" aria-label={clearLabel} onclick={clear} {disabled}>×</button>
		{/if}
	</div>
{/if}
