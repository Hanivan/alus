<script lang="ts">
	import {
		labelAttrs,
		interactiveStateAttrs,
		validationAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLButtonAttributes, 'children'> {
		children?: import('svelte').Snippet<[{ checked: boolean }]>;
		checked?: boolean;
		disabled?: boolean;
		required?: boolean;
		invalid?: boolean;
		errormessage?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		onCheckedChange?: (checked: boolean) => void;
	}

	let {
		children,
		checked = $bindable(false),
		class: className = '',
		disabled = false,
		required = false,
		invalid = false,
		errormessage,
		name,
		value = 'on',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		onCheckedChange,
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			interactiveStateAttrs({ checked, disabled }),
			validationAttrs({ invalid, required, errormessage })
		)
	);

	function toggle() {
		if (disabled) return;
		checked = !checked;
		onCheckedChange?.(checked);
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === ' ' || e.key === 'Enter') {
			e.preventDefault();
			toggle();
		}
	}
</script>

<button
	{...rest}
	type="button"
	role="switch"
	class={className}
	{disabled}
	data-state={checked ? 'checked' : 'unchecked'}
	onclick={toggle}
	onkeydown={onKeydown}
	{...ariaAttrs}
>
	{#if children}{@render children({ checked })}{/if}
</button>

{#if name}
	<input type="hidden" {name} value={checked ? value : ''} />
{/if}
