<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { generateCounterId } from '$utils/a11y/id.js';
	import { getSelectContext } from './Select.svelte';

	interface Props {
		children?: import('svelte').Snippet<[{ selected: boolean; highlighted: boolean }]>;
		value: unknown;
		class?: string;
		disabled?: boolean;
	}

	let { children, value, class: className = '', disabled = false }: Props = $props();

	const ctx = getSelectContext();
	const id = generateCounterId('select-option');

	const optionRef: Attachment<HTMLDivElement> = (node) => {
		const cleanup = ctx.registerOption({ value, el: node, disabled });
		return () => cleanup();
	};

	function onClick() {
		if (disabled) return;
		ctx.toggleValue(value);
	}

	function onPointerEnter() {
		if (disabled) return;
		ctx.setHighlighted(value);
	}

	function onKeydown(e: KeyboardEvent) {
		if (disabled) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			ctx.toggleValue(value);
		}
	}

	let selected = $derived(ctx.isSelected(value));
	let highlighted = $derived(ctx.highlighted() === value);
</script>

<div
	{id}
	role="option"
	tabindex="-1"
	aria-selected={selected}
	aria-disabled={disabled || undefined}
	data-highlighted={highlighted ? '' : undefined}
	data-selected={selected ? '' : undefined}
	data-disabled={disabled ? '' : undefined}
	class={className}
	onclick={onClick}
	onkeydown={onKeydown}
	onpointerenter={onPointerEnter}
	{@attach optionRef}
>
	{#if children}{@render children({ selected, highlighted })}{/if}
</div>
