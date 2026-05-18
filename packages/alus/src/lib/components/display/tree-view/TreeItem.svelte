<script lang="ts">
	import { getTreeViewContext } from './TreeView.svelte';
	import { getContext, setContext } from 'svelte';
	import { interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';

	const LEVEL_KEY = Symbol('alus:tree-item-level');

	interface Props {
		id: string;
		label?: import('svelte').Snippet<[{ expanded: boolean; selected: boolean }]>;
		children?: import('svelte').Snippet;
		class?: string;
		disabled?: boolean;
	}

	let { id, label, children, class: className = '', disabled = false }: Props = $props();

	const ctx = getTreeViewContext();
	const parentLevel = getContext<number>(LEVEL_KEY) ?? 0;
	const level = parentLevel + 1;
	setContext(LEVEL_KEY, level);

	const hasChildren = $derived(!!children);
	const expanded = $derived(ctx.isExpanded(id));
	const selected = $derived(ctx.isSelected(id));
	const focused = $derived(ctx.focused() === id);

	let itemEl = $state<HTMLLIElement | null>(null);

	function onClick(e: MouseEvent) {
		if (disabled) return;
		e.stopPropagation();
		ctx.setFocused(id);
		ctx.select(id);
		if (hasChildren) ctx.toggle(id);
		itemEl?.focus();
	}

	function tabIndex(): number {
		const f = ctx.focused();
		if (f === id) return 0;
		if (f === null) {
			const first = ctx.rootEl.current?.querySelector<HTMLElement>('[role="treeitem"]');
			if (first === itemEl) return 0;
		}
		return -1;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<li
	bind:this={itemEl}
	role="treeitem"
	class={className}
	data-tree-item-id={id}
	data-disabled={disabled || undefined}
	data-selected={selected || undefined}
	data-expanded={hasChildren ? expanded : undefined}
	tabindex={tabIndex()}
	onclick={onClick}
	{...mergeAttrs(
		interactiveStateAttrs({
			expanded: hasChildren ? expanded : undefined,
			selected: selected || undefined,
			disabled
		}),
		widgetAttrs({ level })
	)}
>
	{#if label}{@render label({ expanded, selected })}{/if}
	{#if hasChildren}
		<ul role="group" hidden={!expanded}>
			{#if children}{@render children()}{/if}
		</ul>
	{/if}
</li>
