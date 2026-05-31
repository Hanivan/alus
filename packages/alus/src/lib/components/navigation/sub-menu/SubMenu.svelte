<script lang="ts" module>
	export interface SubMenuItem {
		label?: string;
		onSelect?: () => void;
		disabled?: boolean;
		separator?: boolean;
	}
</script>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset } from '@floating-ui/dom';
	import { useEventListener } from 'runed';
	import { getMenuContext, type MenuItemEntry } from '../menu/Menu.svelte';
	import { generateCounterId } from '$utils/a11y/id.js';
	import { interactiveStateAttrs, widgetAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		label?: string;
		items: SubMenuItem[];
		disabled?: boolean;
		class?: string;
		menuClass?: string;
		itemClass?: string;
		separatorClass?: string;
		children?: import('svelte').Snippet<[{ highlighted: boolean; open: boolean }]>;
		item?: import('svelte').Snippet<[{ item: SubMenuItem; index: number }]>;
	}

	let {
		label,
		items,
		disabled = false,
		class: className = '',
		menuClass = '',
		itemClass = '',
		separatorClass = '',
		children,
		item
	}: Props = $props();

	const ctx = getMenuContext();
	const subId = generateCounterId('submenu');

	let triggerEl = $state<HTMLDivElement | null>(null);
	let panelEl = $state<HTMLDivElement | null>(null);
	let open = $state(false);
	let highlighted = $state<number>(-1);
	let entry: MenuItemEntry | null = null;

	const enabledIndices = $derived(
		items.map((it, i) => (it.separator || it.disabled ? -1 : i)).filter((i) => i >= 0)
	);

	const triggerRef: Attachment<HTMLDivElement> = (node) => {
		triggerEl = node;
		entry = {
			el: node,
			disabled,
			onSelect: () => {
				if (!open) openPanel();
			}
		};
		const unregister = ctx.registerItem(entry);
		return () => {
			unregister();
			triggerEl = null;
			entry = null;
		};
	};

	const parentHighlighted = $derived(ctx.highlighted() === triggerEl);

	$effect(() => {
		const h = ctx.highlighted();
		if (open && triggerEl && h && h !== triggerEl) closePanel();
	});

	function openPanel() {
		open = true;
		highlighted = enabledIndices[0] ?? -1;
	}

	function closePanel() {
		open = false;
		highlighted = -1;
	}

	function activate(i: number) {
		const it = items[i];
		if (!it || it.disabled || it.separator) return;
		it.onSelect?.();
		closePanel();
		ctx.setOpen(false);
	}

	function move(dir: 1 | -1) {
		const list = enabledIndices;
		if (!list.length) return;
		const cur = list.indexOf(highlighted);
		const next =
			cur === -1 ? (dir === 1 ? 0 : list.length - 1) : (cur + dir + list.length) % list.length;
		highlighted = list[next];
	}

	function onTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowRight' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openPanel();
		}
	}

	function onTriggerPointerEnter() {
		if (disabled || !triggerEl) return;
		ctx.setHighlighted(triggerEl);
		triggerEl.focus();
		openPanel();
	}

	function onPanelKey(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				move(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				move(-1);
				break;
			case 'ArrowLeft':
			case 'Escape':
				e.preventDefault();
				closePanel();
				triggerEl?.focus();
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (highlighted >= 0) activate(highlighted);
				break;
		}
	}

	const panelRef: Attachment<HTMLDivElement> = (node) => {
		panelEl = node;
		node.focus();
		let cleanup: (() => void) | undefined;
		if (triggerEl) {
			cleanup = autoUpdate(triggerEl, node, async () => {
				const { x, y } = await computePosition(triggerEl as HTMLElement, node, {
					placement: 'right-start',
					strategy: 'fixed',
					middleware: [offset(2), flip(), shift({ padding: 8 })]
				});
				Object.assign(node.style, { left: `${x}px`, top: `${y}px` });
			});
		}
		return () => {
			cleanup?.();
			panelEl = null;
		};
	};

	useEventListener(
		() => (open ? document : null),
		'pointerdown',
		(e) => {
			if (!panelEl) return;
			const t = e.target as Node;
			if (panelEl.contains(t) || triggerEl?.contains(t)) return;
			closePanel();
		},
		{ capture: true }
	);
</script>

<div
	role="menuitem"
	tabindex="-1"
	data-highlighted={parentHighlighted || undefined}
	data-state={open ? 'open' : 'closed'}
	class={className}
	onpointerenter={onTriggerPointerEnter}
	onkeydown={onTriggerKeydown}
	{...mergeAttrs(
		interactiveStateAttrs({ expanded: open, disabled }),
		widgetAttrs({ controls: subId, haspopup: 'menu' })
	)}
	{@attach triggerRef}
>
	{#if children}
		{@render children({ highlighted: parentHighlighted, open })}
	{:else}
		{label}
	{/if}
</div>

{#if open}
	<Portal>
		<div
			id={subId}
			role="menu"
			tabindex="-1"
			class={menuClass}
			style="position:fixed; top:0; left:0;"
			onkeydown={onPanelKey}
			{@attach panelRef}
		>
			{#each items as it, i (i)}
				{#if it.separator}
					<hr class={separatorClass} />
				{:else if item}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						role="menuitem"
						tabindex={highlighted === i ? 0 : -1}
						aria-disabled={it.disabled || undefined}
						data-highlighted={highlighted === i ? '' : undefined}
						class={itemClass}
						onmouseenter={() => (highlighted = i)}
						onclick={() => activate(i)}
					>
						{@render item({ item: it, index: i })}
					</div>
				{:else}
					<button
						type="button"
						role="menuitem"
						tabindex={highlighted === i ? 0 : -1}
						disabled={it.disabled}
						data-highlighted={highlighted === i ? '' : undefined}
						class={itemClass}
						onmouseenter={() => (highlighted = i)}
						onclick={() => activate(i)}
					>
						{it.label}
					</button>
				{/if}
			{/each}
		</div>
	</Portal>
{/if}
