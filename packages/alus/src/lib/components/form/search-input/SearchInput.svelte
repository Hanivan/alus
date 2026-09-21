<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import {
		labelAttrs,
		validationAttrs,
		interactiveStateAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet<[{ value: string; clear: () => void }]>;
		value?: string;
		// `placeholder`, `name` and `id` are consumed by the inner `<input>`, not by the host
		// `<div>` — rule 3, so they stay declared and keep reaching it.
		placeholder?: string;
		name?: string;
		id?: string;
		disabled?: boolean;
		required?: boolean;
		inputClass?: string;
		clearLabel?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		onclear?: () => void;
	};

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
		onclear,
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled }),
			validationAttrs({ required })
		)
	);

	function clear() {
		value = '';
		onclear?.();
	}
</script>

<!--
	`rest` lands on the wrapper `div`, which exists only in the `{:else}` branch. A consumer
	passing a `children` snippet gets no host element and therefore no `data-*`/`style` — the
	same accepted ceiling as `NumberInput` (PATTERN.md rule 7). Not restructured.
-->
{#if children}
	{@render children({ value, clear })}
{:else}
	<div {...rest} class={className} role="search">
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
			<button type="button" {...labelAttrs({ label: clearLabel })} onclick={clear} {disabled}
				>×</button
			>
		{/if}
	</div>
{/if}
