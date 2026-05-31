<script lang="ts" module>
	export interface ContextMenuItemEntry {
		label?: string;
		onSelect?: () => void;
		disabled?: boolean;
		separator?: boolean;
	}
</script>

<script lang="ts">
	import type { Attachment } from 'svelte/attachments';
	import { tick } from 'svelte';
	import { useEventListener } from 'runed';
	import { generateCounterId } from '$utils/a11y/id.js';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		items: ContextMenuItemEntry[];
		open?: boolean;
		disabled?: boolean;
		class?: string;
		menuClass?: string;
		itemClass?: string;
		separatorClass?: string;
		style?: string;
		'aria-label'?: string;
		item?: import('svelte').Snippet<[{ item: ContextMenuItemEntry; index: number }]>;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		items,
		open = $bindable(false),
		disabled = false,
		class: className = '',
		menuClass = '',
		itemClass = '',
		separatorClass = '',
		style,
		'aria-label': ariaLabel = 'Context menu',
		item,
		onOpenChange
	}: Props = $props();

	const menuId = generateCounterId('contextmenu');
	let x = $state(0);
	let y = $state(0);
	let menuEl = $state<HTMLDivElement | null>(null);
	let triggerEl = $state<HTMLElement | null>(null);
	let highlighted = $state<number>(-1);

	const enabledIndices = $derived(
		items.map((it, i) => (it.separator || it.disabled ? -1 : i)).filter((i) => i >= 0)
	);

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
		if (!v) highlighted = -1;
	}

	async function openAt(px: number, py: number) {
		x = px;
		y = py;
		setOpen(true);
		await tick();
		const vw = window.innerWidth;
		const vh = window.innerHeight;
		if (menuEl) {
			const r = menuEl.getBoundingClientRect();
			if (r.right > vw) x = Math.max(0, vw - r.width - 4);
			if (r.bottom > vh) y = Math.max(0, vh - r.height - 4);
		}
		const first = enabledIndices[0];
		if (first !== undefined) highlighted = first;
	}

	function onContext(e: MouseEvent) {
		if (disabled) return;
		e.preventDefault();
		openAt(e.clientX, e.clientY);
	}

	function onKeydownTrigger(e: KeyboardEvent) {
		if (disabled) return;
		if ((e.shiftKey && e.key === 'F10') || e.key === 'ContextMenu') {
			e.preventDefault();
			const t = e.currentTarget as HTMLElement;
			const r = t.getBoundingClientRect();
			openAt(r.left, r.bottom);
		}
	}

	function activate(i: number) {
		const it = items[i];
		if (!it || it.disabled || it.separator) return;
		it.onSelect?.();
		setOpen(false);
		triggerEl?.focus();
	}

	function move(dir: 1 | -1) {
		const list = enabledIndices;
		if (!list.length) return;
		const cur = list.indexOf(highlighted);
		const next =
			cur === -1 ? (dir === 1 ? 0 : list.length - 1) : (cur + dir + list.length) % list.length;
		highlighted = list[next];
	}

	function onMenuKey(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				move(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				move(-1);
				break;
			case 'Home':
				e.preventDefault();
				highlighted = enabledIndices[0] ?? -1;
				break;
			case 'End':
				e.preventDefault();
				highlighted = enabledIndices.at(-1) ?? -1;
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (highlighted >= 0) activate(highlighted);
				break;
			case 'Escape':
			case 'Tab':
				e.preventDefault();
				setOpen(false);
				triggerEl?.focus();
				break;
		}
	}

	const menuRef: Attachment<HTMLDivElement> = (node) => {
		menuEl = node;
		node.focus();
		return () => {
			menuEl = null;
		};
	};

	useEventListener(
		() => (open ? document : null),
		'pointerdown',
		(e) => {
			if (menuEl && !menuEl.contains(e.target as Node)) setOpen(false);
		},
		{ capture: true }
	);

	useEventListener(
		() => (open ? window : null),
		'resize',
		() => setOpen(false)
	);

	useEventListener(
		() => (open ? window : null),
		'scroll',
		() => setOpen(false),
		{ capture: true }
	);

	const triggerRef: Attachment<HTMLElement> = (node) => {
		triggerEl = node;
		return () => {
			triggerEl = null;
		};
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class={className}
	{style}
	oncontextmenu={onContext}
	onkeydown={onKeydownTrigger}
	{@attach triggerRef}
>
	{#if children}{@render children()}{/if}
</div>

{#if open}
	<Portal>
		<div
			id={menuId}
			role="menu"
			aria-label={ariaLabel}
			tabindex="-1"
			class={menuClass}
			style="position:fixed; left:{x}px; top:{y}px;"
			onkeydown={onMenuKey}
			{@attach menuRef}
		>
			{#each items as it, i (i)}
				{#if it.separator}
					<div role="separator" class={separatorClass}></div>
				{:else if item}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						role="menuitem"
						tabindex={highlighted === i ? 0 : -1}
						aria-disabled={it.disabled ? 'true' : undefined}
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
