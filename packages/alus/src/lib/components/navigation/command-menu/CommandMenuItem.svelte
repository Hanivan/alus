<script lang="ts">
	import { untrack } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { generateCounterId } from '$utils/a11y/id.js';
	import { interactiveStateAttrs } from '$utils/a11y/index.js';
	import { getCommandMenuContext } from './CommandMenu.svelte';
	import { getCommandMenuGroupContext } from './CommandMenuGroup.svelte';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		children?: import('svelte').Snippet<[{ highlighted: boolean }]>;
		value: string;
		// Read inside the `$effect` (registered with the context) — rule 2.
		keywords?: string;
		disabled?: boolean;
		// Not a native attribute: the component's own selection callback.
		onSelect?: () => void;
	};

	let {
		children,
		class: className = '',
		value,
		keywords = '',
		disabled = false,
		onSelect,
		...rest
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
	<div
		{...rest}
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
