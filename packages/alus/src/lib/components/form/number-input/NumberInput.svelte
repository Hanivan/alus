<script lang="ts">
	import { labelAttrs, validationAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet<
			[{ value: number | null; increment: () => void; decrement: () => void }]
		>;
		value?: number | null;
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		// `name` and `id` are consumed by the inner `<input type="number">`, not by the host
		// `<div>`. `id` is inherited from `HTMLAttributes<HTMLDivElement>`; `name` is NOT, so it
		// must stay declared or the destructure below fails with TS2339 and consumers can no
		// longer set it. Both stay destructured so they keep reaching the inner input.
		name?: string;
		placeholder?: string;
		inputClass?: string;
		incrementLabel?: string;
		decrementLabel?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: boolean;
		'aria-errormessage'?: string;
		oninput?: (event: Event) => void;
		onValueChange?: (value: number | null) => void;
		autofocus?: boolean;
	};

	let {
		children,
		value = $bindable(null),
		min,
		max,
		step = 1,
		disabled = false,
		readonly = false,
		required = false,
		name,
		id,
		placeholder = '',
		class: className = '',
		inputClass = '',
		incrementLabel = 'Increment',
		decrementLabel = 'Decrement',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrormessage,
		oninput,
		onValueChange,
		autofocus,
		...rest
	}: Props = $props();

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby }),
			validationAttrs({ invalid: ariaInvalid, required, errormessage: ariaErrormessage })
		)
	);

	function clamp(n: number): number {
		let v = n;
		if (typeof min === 'number') v = Math.max(min, v);
		if (typeof max === 'number') v = Math.min(max, v);
		return v;
	}

	function increment() {
		if (disabled || readonly) return;
		const next = clamp((value ?? 0) + step);
		value = next;
		onValueChange?.(value);
	}

	function decrement() {
		if (disabled || readonly) return;
		const next = clamp((value ?? 0) - step);
		value = next;
		onValueChange?.(value);
	}

	function handleInput(e: Event) {
		const target = e.currentTarget as HTMLInputElement;
		value = target.value === '' ? null : Number(target.value);
		oninput?.(e);
	}
</script>

{#if children}
	{@render children({ value, increment, decrement })}
{:else}
	<div {...rest} class={className}>
		<button
			type="button"
			aria-label={decrementLabel}
			onclick={decrement}
			disabled={disabled || readonly || (typeof min === 'number' && (value ?? 0) <= min)}
		>
			−
		</button>
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="number"
			{id}
			{name}
			{min}
			{max}
			{step}
			{disabled}
			{readonly}
			{required}
			{placeholder}
			inputmode="numeric"
			{autofocus}
			value={value ?? ''}
			class={inputClass}
			oninput={handleInput}
			{...ariaAttrs}
		/>
		<button
			type="button"
			aria-label={incrementLabel}
			onclick={increment}
			disabled={disabled || readonly || (typeof max === 'number' && (value ?? 0) >= max)}
		>
			+
		</button>
	</div>
{/if}
