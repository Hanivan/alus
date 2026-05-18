<script lang="ts">
	import {
		labelAttrs,
		interactiveStateAttrs,
		validationAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet<[{ checked: boolean }]>;
		checked?: boolean;
		class?: string;
		disabled?: boolean;
		required?: boolean;
		invalid?: boolean;
		errormessage?: string;
		name?: string;
		id?: string;
		value?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		onchange?: (checked: boolean) => void;
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
		id,
		value = 'on',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		onchange
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
		onchange?.(checked);
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
	type="button"
	role="switch"
	{id}
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
