<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft, Copy, Scissors, Clipboard, Trash, ArrowsClockwise } from 'phosphor-svelte';
	import { ContextMenu, type ContextMenuItemEntry } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { ContextMenu, type ContextMenuItemEntry } from 'alus-ui';
	const items: ContextMenuItemEntry[] = [
		{ label: 'Copy', onSelect: () => copy() },
		{ label: 'Cut', onSelect: () => cut() },
		{ label: 'Delete', onSelect: () => del() }
	];
<\/script>

<ContextMenu {items}>
	<div class="cursor-context-menu">Right-click me</div>
</ContextMenu>`;

	let lastAction = $state('—');

	const items: ContextMenuItemEntry[] = [
		{ label: 'Copy', onSelect: () => (lastAction = 'Copy') },
		{ label: 'Cut', onSelect: () => (lastAction = 'Cut') },
		{ label: 'Paste', onSelect: () => (lastAction = 'Paste') },
		{ separator: true },
		{ label: 'Refresh', onSelect: () => (lastAction = 'Refresh') },
		{ label: 'Delete', onSelect: () => (lastAction = 'Delete'), disabled: false }
	];

	const richItems: ContextMenuItemEntry[] = [
		{ label: 'copy', onSelect: () => (lastAction = 'Copy (rich)') },
		{ label: 'cut', onSelect: () => (lastAction = 'Cut (rich)') },
		{ label: 'paste', onSelect: () => (lastAction = 'Paste (rich)') },
		{ separator: true },
		{ label: 'refresh', onSelect: () => (lastAction = 'Refresh (rich)') },
		{ label: 'delete', onSelect: () => (lastAction = 'Delete (rich)') }
	];

	const iconMap: Record<string, typeof Copy> = {
		copy: Copy,
		cut: Scissors,
		paste: Clipboard,
		refresh: ArrowsClockwise,
		delete: Trash
	};
</script>

<svelte:head>
	<title>ContextMenu · Alus Components</title>
</svelte:head>

<a
	href={resolve('/')}
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">右</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">ContextMenu</h1>
				<p class="tracking-widest text-(--bamboo)">右クリック</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Right-click context menu with keyboard navigation. Also opens via <code>Shift+F10</code>.
			Auto-positions to stay in viewport.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Basic — string items</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ContextMenu
				{items}
				class="flex h-40 cursor-context-menu items-center justify-center rounded border border-dashed border-(--charcoal)/30 bg-white"
				menuClass="z-50 min-w-44 rounded border border-(--charcoal)/15 bg-white p-1 shadow-lg"
				itemClass="block w-full rounded px-3 py-1.5 text-left text-sm text-(--ink) hover:bg-(--cream) data-highlighted:bg-(--indigo-dye) data-highlighted:text-white disabled:opacity-40"
				separatorClass="my-1 h-px bg-(--charcoal)/15"
			>
				<span class="text-sm text-(--charcoal)/60">Right-click anywhere in this box</span>
			</ContextMenu>
			<p class="mt-3 text-sm text-(--charcoal)/60">Last action: <strong>{lastAction}</strong></p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Custom item snippet (icons)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ContextMenu
				items={richItems}
				class="flex h-40 cursor-context-menu items-center justify-center rounded border border-dashed border-(--charcoal)/30 bg-white"
				menuClass="z-50 min-w-48 rounded border border-(--charcoal)/15 bg-white p-1 shadow-lg"
				itemClass="flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm text-(--ink) hover:bg-(--cream) data-highlighted:bg-(--indigo-dye) data-highlighted:text-white"
				separatorClass="my-1 h-px bg-(--charcoal)/15"
			>
				<span class="text-sm text-(--charcoal)/60">Right-click here</span>
				{#snippet item({ item })}
					{#if item.label}
						{@const Icon = iconMap[item.label]}
						{#if Icon}<Icon class="h-4 w-4" />{/if}
						<span class="capitalize">{item.label}</span>
					{/if}
				{/snippet}
			</ContextMenu>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'items', type: 'ContextMenuItemEntry[]', default: '[]' },
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'item', type: 'Snippet<[{ entry, highlighted, index }]>', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Opens on right-click and on Shift+F10 / ContextMenu key',
			'<code class="rounded bg-(--cream) px-1">role="menu"</code> + <code class="rounded bg-(--cream) px-1">role="menuitem"</code>',
			'Arrow keys navigate, Enter/Space activate, Escape closes',
			'Viewport-aware positioning so the menu always fits',
			'Focus returns to the trigger element on close'
		]}
	/>
</main>
