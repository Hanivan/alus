<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus:radio-group');

	export interface RadioGroupContext {
		name: () => string;
		value: () => unknown;
		setValue: (v: unknown) => void;
		disabled: () => boolean;
		required: () => boolean;
	}

	export function getRadioGroup(): RadioGroupContext | undefined {
		return getContext<RadioGroupContext | undefined>(KEY);
	}

	export function setRadioGroup(ctx: RadioGroupContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		name: string;
		value?: unknown;
		disabled?: boolean;
		required?: boolean;
		orientation?: 'horizontal' | 'vertical';
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
	}

	let {
		children,
		class: className = '',
		name,
		value = $bindable(),
		disabled = false,
		required = false,
		orientation = 'vertical',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby
	}: Props = $props();

	setRadioGroup({
		name: () => name,
		value: () => value,
		setValue: (v) => (value = v),
		disabled: () => disabled,
		required: () => required
	});

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			widgetAttrs({ orientation })
		)
	);
</script>

<div role="radiogroup" class={className} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</div>
