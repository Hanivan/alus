<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus:stepper');

	export interface StepperContext {
		current: () => number;
		setCurrent: (i: number) => void;
		orientation: () => 'horizontal' | 'vertical';
		linear: () => boolean;
		total: () => number | undefined;
	}

	export function getStepperContext(): StepperContext {
		const ctx = getContext<StepperContext | undefined>(KEY);
		if (!ctx) throw new Error('StepperStep must be inside <Stepper>');
		return ctx;
	}

	export function setStepperContext(ctx: StepperContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { labelAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		current?: number;
		total?: number;
		orientation?: 'horizontal' | 'vertical';
		linear?: boolean;
		onCurrentChange?: (i: number) => void;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		class: className = '',
		current = $bindable(0),
		total,
		orientation = 'horizontal',
		linear = true,
		onCurrentChange,
		'aria-label': ariaLabel = 'Progress',
		'aria-labelledby': ariaLabelledby
	}: Props = $props();

	setStepperContext({
		current: () => current,
		setCurrent: (i) => {
			current = i;
			onCurrentChange?.(i);
		},
		orientation: () => orientation,
		linear: () => linear,
		total: () => total
	});

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }),
			widgetAttrs({ orientation })
		)
	);
</script>

<ol class={className} data-orientation={orientation} {...ariaAttrs}>
	{#if children}{@render children()}{/if}
</ol>
