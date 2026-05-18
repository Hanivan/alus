<script lang="ts" module>
	import { getContext, setContext } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	const KEY = Symbol('alus:tree-view');

	export interface TreeViewContext {
		expanded: SvelteSet<string>;
		selected: () => string | null;
		focused: () => string | null;
		setFocused: (id: string | null) => void;
		toggle: (id: string) => void;
		expand: (id: string) => void;
		collapse: (id: string) => void;
		select: (id: string) => void;
		isExpanded: (id: string) => boolean;
		isSelected: (id: string) => boolean;
		rootEl: { current: HTMLElement | null };
	}

	export function getTreeViewContext(): TreeViewContext {
		const ctx = getContext<TreeViewContext | undefined>(KEY);
		if (!ctx) throw new Error('TreeItem must be inside <TreeView>');
		return ctx;
	}

	export function setTreeViewContext(ctx: TreeViewContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { untrack } from 'svelte';
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		defaultExpanded?: string[];
		selected?: string | null;
		onSelectChange?: (id: string | null) => void;
		onExpandChange?: (id: string, expanded: boolean) => void;
		'aria-label'?: string;
		'aria-labelledby'?: string;
	}

	let {
		children,
		class: className = '',
		defaultExpanded = [],
		selected = $bindable(null),
		onSelectChange,
		onExpandChange,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby
	}: Props = $props();

	const expanded = new SvelteSet<string>(untrack(() => defaultExpanded));
	let focused = $state<string | null>(null);
	let rootEl = $state<HTMLElement | null>(null);

	function toggle(id: string) {
		if (expanded.has(id)) collapse(id);
		else expand(id);
	}

	function expand(id: string) {
		if (!expanded.has(id)) {
			expanded.add(id);
			onExpandChange?.(id, true);
		}
	}

	function collapse(id: string) {
		if (expanded.has(id)) {
			expanded.delete(id);
			onExpandChange?.(id, false);
		}
	}

	function select(id: string) {
		selected = id;
		onSelectChange?.(id);
	}

	setTreeViewContext({
		expanded,
		selected: () => selected,
		focused: () => focused,
		setFocused: (id) => (focused = id),
		toggle,
		expand,
		collapse,
		select,
		isExpanded: (id) => expanded.has(id),
		isSelected: (id) => selected === id,
		rootEl: {
			get current() {
				return rootEl;
			}
		}
	});

	function visibleItems(): HTMLElement[] {
		if (!rootEl) return [];
		return Array.from(rootEl.querySelectorAll<HTMLElement>('[role="treeitem"]')).filter((el) => {
			let p = el.parentElement;
			while (p && p !== rootEl) {
				if (p.getAttribute('role') === 'group' && p.hidden) return false;
				p = p.parentElement;
			}
			return true;
		});
	}

	function focusItem(el: HTMLElement | undefined) {
		if (!el) return;
		const id = el.dataset.treeItemId;
		if (id) focused = id;
		el.focus();
	}

	function onKeydown(e: KeyboardEvent) {
		const target = e.target as HTMLElement;
		if (!target || target.getAttribute('role') !== 'treeitem') return;
		const list = visibleItems();
		const idx = list.indexOf(target);
		if (idx < 0) return;
		const id = target.dataset.treeItemId!;
		const isExp = target.getAttribute('aria-expanded');

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				focusItem(list[Math.min(list.length - 1, idx + 1)]);
				break;
			case 'ArrowUp':
				e.preventDefault();
				focusItem(list[Math.max(0, idx - 1)]);
				break;
			case 'ArrowRight':
				e.preventDefault();
				if (isExp === 'false') expand(id);
				else if (isExp === 'true') focusItem(list[idx + 1]);
				break;
			case 'ArrowLeft':
				e.preventDefault();
				if (isExp === 'true') collapse(id);
				else {
					const level = Number(target.getAttribute('aria-level') || 1);
					for (let i = idx - 1; i >= 0; i--) {
						if (Number(list[i].getAttribute('aria-level') || 1) < level) {
							focusItem(list[i]);
							break;
						}
					}
				}
				break;
			case 'Home':
				e.preventDefault();
				focusItem(list[0]);
				break;
			case 'End':
				e.preventDefault();
				focusItem(list[list.length - 1]);
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				select(id);
				break;
		}
	}

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }))
	);
</script>

<ul
	bind:this={rootEl}
	role="tree"
	class={className}
	onkeydown={onKeydown}
	{...ariaAttrs}
>
	{#if children}{@render children()}{/if}
</ul>
