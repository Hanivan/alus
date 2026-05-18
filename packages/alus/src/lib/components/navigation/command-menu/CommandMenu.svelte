<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus-ui:command-menu');

	export interface CommandItemEntry {
		id: string;
		value: string;
		keywords: string;
		onSelect?: () => void;
		disabled: boolean;
	}

	export interface CommandMenuContext {
		open: () => boolean;
		setOpen: (v: boolean) => void;
		query: () => string;
		setQuery: (q: string) => void;
		highlightedId: () => string | null;
		setHighlightedId: (id: string | null) => void;
		registerItem: (entry: CommandItemEntry) => () => void;
		filteredItems: () => CommandItemEntry[];
		select: (id: string) => void;
		moveHighlight: (delta: number) => void;
		highlightFirst: () => void;
		triggerEl: { current: HTMLElement | null };
		setTriggerEl: (el: HTMLElement | null) => void;
		listId: string;
		inputId: string;
	}

	export function getCommandMenuContext(): CommandMenuContext {
		const ctx = getContext<CommandMenuContext | undefined>(KEY);
		if (!ctx) throw new Error('CommandMenu subcomponent must be inside <CommandMenu>');
		return ctx;
	}

	export function setCommandMenuContext(ctx: CommandMenuContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		onOpenChange?: (v: boolean) => void;
		filter?: (value: string, keywords: string, query: string) => boolean;
	}

	let { children, open = $bindable(false), onOpenChange, filter }: Props = $props();

	let query = $state('');
	let highlightedId = $state<string | null>(null);
	let triggerEl = $state<HTMLElement | null>(null);
	let items = $state<CommandItemEntry[]>([]);
	const listId = generateCounterId('cmdk-list');
	const inputId = generateCounterId('cmdk-input');

	function defaultFilter(value: string, keywords: string, q: string): boolean {
		if (!q) return true;
		const hay = `${value} ${keywords}`.toLowerCase();
		return q
			.toLowerCase()
			.split(/\s+/)
			.filter(Boolean)
			.every((t) => hay.includes(t));
	}

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
		if (!v) {
			query = '';
			highlightedId = null;
		}
	}

	const filtered = $derived(
		items.filter((it) => (filter ?? defaultFilter)(it.value, it.keywords, query))
	);

	$effect(() => {
		if (!open) return;
		const list = filtered;
		if (list.length === 0) {
			highlightedId = null;
			return;
		}
		if (!highlightedId || !list.find((i) => i.id === highlightedId)) {
			highlightedId = list[0].id;
		}
	});

	function select(id: string) {
		const it = items.find((i) => i.id === id);
		if (!it || it.disabled) return;
		it.onSelect?.();
		setOpen(false);
	}

	function moveHighlight(delta: number) {
		const list = filtered.filter((i) => !i.disabled);
		if (list.length === 0) return;
		const idx = list.findIndex((i) => i.id === highlightedId);
		const next = idx < 0 ? 0 : (idx + delta + list.length) % list.length;
		highlightedId = list[next].id;
	}

	function highlightFirst() {
		const list = filtered.filter((i) => !i.disabled);
		highlightedId = list[0]?.id ?? null;
	}

	setCommandMenuContext({
		open: () => open,
		setOpen,
		query: () => query,
		setQuery: (q) => (query = q),
		highlightedId: () => highlightedId,
		setHighlightedId: (id) => (highlightedId = id),
		registerItem: (entry) => {
			items.push(entry);
			return () => {
				const i = items.findIndex((e) => e.id === entry.id);
				if (i >= 0) items.splice(i, 1);
			};
		},
		filteredItems: () => filtered,
		select,
		moveHighlight,
		highlightFirst,
		triggerEl: {
			get current() {
				return triggerEl;
			}
		},
		setTriggerEl: (el) => (triggerEl = el),
		listId,
		inputId
	});
</script>

{#if children}{@render children()}{/if}
