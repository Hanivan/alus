<script lang="ts">
	import { onMount } from 'svelte';
	import { generateCounterId } from '$utils/a11y/id.js';
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

	onMount(() => {
		const unregister = ctx.registerItem({ id, value, keywords, disabled, onSelect });
		const untrack = group?.track(() => visible);
		return () => {
			unregister();
			untrack?.();
		};
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
		aria-selected={highlighted}
		aria-disabled={disabled || undefined}
		data-highlighted={highlighted || undefined}
		data-disabled={disabled || undefined}
		class={className}
		onclick={onClick}
		onpointermove={onPointerMove}
	>
		{#if children}{@render children({ highlighted })}{/if}
	</div>
{/if}
