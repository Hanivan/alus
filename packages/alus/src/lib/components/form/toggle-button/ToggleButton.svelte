<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet<[{ pressed: boolean }]>;
		pressed?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		style?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		onclick?: (e: MouseEvent) => void;
		onpressedchange?: (pressed: boolean) => void;
	}

	let {
		children,
		pressed = $bindable(false),
		disabled = false,
		type = 'button',
		class: className = '',
		style,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		onclick,
		onpressedchange,
		...rest
	}: Props = $props();

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ disabled, pressed })
		)
	);

	function handleClick(e: MouseEvent) {
		if (disabled) return;
		pressed = !pressed;
		onpressedchange?.(pressed);
		onclick?.(e);
	}
</script>

<button
	{...rest}
	{type}
	{disabled}
	class={className}
	{style}
	data-state={pressed ? 'on' : 'off'}
	onclick={handleClick}
	{...ariaAttrs}
>
	{#if children}{@render children({ pressed })}{/if}
</button>
