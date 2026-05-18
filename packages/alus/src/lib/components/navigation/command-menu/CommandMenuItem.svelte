<script lang="ts">
	import { untrack } from 'svelte';
	import { generateCounterId } from '$utils/a11y/id.js';
	import { interactiveStateAttrs } from '$utils/a11y/index.js';
	import { getCommandMenuContext } from './CommandMenu.svelte';
	import { getCommandMenuGroupContext } from './CommandMenuGroup.svelte';

	interface Props {
		children?: import('svelte').Snippet<[{ highlighted: boolean }]>;
		class?: string;
		value: string;
		keywords?: string;
		disabled?: boolean;
		onSelect?: () => void;
	}

	let {
		children,
		class: className = '',
		value,
		keywords = '',
		disabled = false,
		onSelect
	}: Props = $props();

	const ctx = getCommandMenuContext();
	const group = getCommandMenuGroupContext();
	const id = generateCounterId('cmdk-item');

	const highlighted = $derived(ctx.highlightedId() === id);
	const visible = $derived(ctx.filteredItems().some((i) => i.id === id));

	$effect(() => {
		return untrack(() => {
			const unregister = ctx.registerItem({ id, value, keywords, disabled, onSelect });
			const untrackVis = group?.track(() => visible);
			return () => {
				unregister();
				untrackVis?.();
			};
		});
	});

	function onClick() {
		if (disabled) return;
		ctx.select(id);
	}

	function onPointerMove() {
		if (disabled) return;
		if (!highlighted) ctx.setHighlightedId(id);
	}
</script>

{#if visible}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		{id}
		role="option"
		tabindex="-1"
		data-highlighted={highlighted || undefined}
		data-disabled={disabled || undefined}
		class={className}
		onclick={onClick}
		onpointermove={onPointerMove}
		{...interactiveStateAttrs({ selected: highlighted, disabled })}
	>
		{#if children}{@render children({ highlighted })}{/if}
	</div>
{/if}
