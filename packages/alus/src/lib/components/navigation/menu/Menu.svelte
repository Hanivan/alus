<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus:menu');

	export interface MenuItemEntry {
		el: HTMLElement;
		disabled: boolean;
		onSelect?: () => void;
	}

	export interface MenuContext {
		open: () => boolean;
		setOpen: (v: boolean) => void;
		disabled: () => boolean;
		highlighted: () => HTMLElement | null;
		setHighlighted: (el: HTMLElement | null) => void;
		triggerEl: { current: HTMLElement | null };
		setTriggerEl: (el: HTMLElement | null) => void;
		contentEl: { current: HTMLElement | null };
		setContentEl: (el: HTMLElement | null) => void;
		registerItem: (entry: MenuItemEntry) => () => void;
		items: () => MenuItemEntry[];
		activate: (entry: MenuItemEntry) => void;
		contentId: string;
		triggerId: string;
	}

	export function getMenuContext(): MenuContext {
		const ctx = getContext<MenuContext | undefined>(KEY);
		if (!ctx) throw new Error('Menu subcomponent must be inside <Menu>');
		return ctx;
	}

	export function setMenuContext(ctx: MenuContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		disabled?: boolean;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		open = $bindable(false),
		disabled = false,
		onOpenChange
	}: Props = $props();

	let highlighted = $state<HTMLElement | null>(null);
	let triggerEl = $state<HTMLElement | null>(null);
	let contentEl = $state<HTMLElement | null>(null);
	let items = $state<MenuItemEntry[]>([]);

	const triggerId = generateCounterId('menu-trigger');
	const contentId = generateCounterId('menu-content');

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	function activate(entry: MenuItemEntry) {
		if (entry.disabled) return;
		entry.onSelect?.();
		setOpen(false);
	}

	setMenuContext({
		open: () => open,
		setOpen,
		disabled: () => disabled,
		highlighted: () => highlighted,
		setHighlighted: (el) => (highlighted = el),
		triggerEl: {
			get current() {
				return triggerEl;
			}
		},
		setTriggerEl: (el) => (triggerEl = el),
		contentEl: {
			get current() {
				return contentEl;
			}
		},
		setContentEl: (el) => (contentEl = el),
		registerItem: (entry) => {
			items.push(entry);
			return () => {
				const i = items.findIndex((e) => e.el === entry.el);
				if (i >= 0) items.splice(i, 1);
			};
		},
		items: () => items,
		activate,
		contentId,
		triggerId
	});
</script>

{#if children}{@render children()}{/if}
