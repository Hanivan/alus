<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';
	import { labelAttrs, interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		value?: number;
		max?: number;
		readonly?: boolean;
		disabled?: boolean;
		name?: string;
		class?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		onValueChange?: (v: number) => void;
		onHoverChange?: (displayed: number) => void;
		item?: import('svelte').Snippet<
			[{ index: number; filled: boolean; displayed: number; value: number; max: number }]
		>;
	}

	let {
		value = $bindable(0),
		max = 5,
		readonly = false,
		disabled = false,
		name,
		class: className = '',
		'aria-label': ariaLabel = 'Rating',
		'aria-labelledby': ariaLabelledby,
		onValueChange,
		onHoverChange,
		item
	}: Props = $props();

	const groupId = generateCounterId('rating');
	let hovered = $state<number | null>(null);

	function set(v: number) {
		if (readonly || disabled) return;
		value = v;
		onValueChange?.(v);
	}

	function onKeydown(e: KeyboardEvent) {
		if (readonly || disabled) return;
		let next: number;
		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowUp':
				next = Math.min(max, value + 1);
				break;
			case 'ArrowLeft':
			case 'ArrowDown':
				next = Math.max(0, value - 1);
				break;
			case 'Home':
				next = 0;
				break;
			case 'End':
				next = max;
				break;
			default:
				return;
		}
		e.preventDefault();
		set(next);
	}

	let displayed = $derived(hovered ?? value);

	function setHover(v: number | null) {
		if (readonly || disabled) return;
		hovered = v;
		onHoverChange?.(v ?? value);
	}

	const ariaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }),
			interactiveStateAttrs({ disabled }),
			widgetAttrs({
				valuemin: 0,
				valuemax: max,
				valuenow: value,
				valuetext: `${value} of ${max}`
			})
		)
	);
</script>

<div
	role="slider"
	tabindex={disabled ? -1 : 0}
	aria-readonly={readonly || undefined}
	data-disabled={disabled || undefined}
	data-readonly={readonly || undefined}
	class={className}
	onkeydown={onKeydown}
	{...ariaAttrs}
>
	{#each Array.from({ length: max }, (_, n) => n) as i (i)}
		{@const idx = i + 1}
		{@const filled = idx <= displayed}
		<button
			type="button"
			tabindex="-1"
			aria-hidden="true"
			data-filled={filled || undefined}
			disabled={disabled || readonly}
			onclick={() => set(idx)}
			onpointerenter={() => setHover(idx)}
			onpointerleave={() => setHover(null)}
		>
			{#if item}
				{@render item({ index: idx, filled, displayed, value, max })}
			{:else}
				<span aria-hidden="true">{filled ? '★' : '☆'}</span>
			{/if}
		</button>
	{/each}
	{#if name}
		<input type="hidden" {name} {value} id={groupId} />
	{/if}
</div>
