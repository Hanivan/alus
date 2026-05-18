<script lang="ts">
	import { labelAttrs, interactiveStateAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ pressed: boolean }]>;
		pressed?: boolean;
		disabled?: boolean;
		type?: 'button' | 'submit' | 'reset';
		class?: string;
		style?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		onclick?: (e: MouseEvent) => void;
		onkeydown?: (e: KeyboardEvent) => void;
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
		onkeydown,
		onpressedchange
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
	{type}
	{disabled}
	class={className}
	{style}
	data-state={pressed ? 'on' : 'off'}
	onclick={handleClick}
	{onkeydown}
	{...ariaAttrs}
>
	{#if children}{@render children({ pressed })}{/if}
</button>
