<script lang="ts">
	import { CaretLeft, CaretRight, File, Folder, Image, Code } from 'phosphor-svelte';
	import { Menu, MenuTrigger, MenuContent, MenuItem, SubMenu, type SubMenuItem } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Menu>
	<MenuTrigger>File</MenuTrigger>
	<MenuContent>
		<SubMenu label="New" items={[
			{ label: 'Document', onSelect: () => newDoc() },
			{ label: 'Folder', onSelect: () => newFolder() }
		]} />
		<MenuItem onSelect={() => save()}>Save</MenuItem>
	</MenuContent>
</Menu>`;

	let lastAction = $state('—');

	const newItems: SubMenuItem[] = [
		{ label: 'File', onSelect: () => (lastAction = 'New > File') },
		{ label: 'Folder', onSelect: () => (lastAction = 'New > Folder') },
		{ separator: true },
		{ label: 'Image', onSelect: () => (lastAction = 'New > Image') },
		{ label: 'Snippet', onSelect: () => (lastAction = 'New > Snippet') }
	];

	const iconMap: Record<string, typeof File> = {
		File: File,
		Folder: Folder,
		Image: Image,
		Snippet: Code
	};

	const shareItems: SubMenuItem[] = [
		{ label: 'Email', onSelect: () => (lastAction = 'Share > Email') },
		{ label: 'Copy link', onSelect: () => (lastAction = 'Share > Copy link') },
		{ label: 'Slack', onSelect: () => (lastAction = 'Share > Slack'), disabled: true }
	];
</script>

<svelte:head>
	<title>SubMenu · Alus Components</title>
</svelte:head>

<a
	href="/"
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">枝</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">SubMenu</h1>
				<p class="tracking-widest text-(--bamboo)">副献</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Nested menu item inside <code>&lt;Menu&gt;</code> — opens a floating sub-panel on hover,
			<code>ArrowRight</code>, Enter, or Space. Close with <code>ArrowLeft</code> or Escape.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">File menu</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Menu>
				<MenuTrigger
					class="rounded border border-(--charcoal)/20 bg-white px-3 py-1.5 text-sm text-(--ink)"
				>
					File
				</MenuTrigger>
				<MenuContent
					class="z-50 min-w-44 rounded border border-(--charcoal)/15 bg-white p-1 shadow-lg"
				>
					<MenuItem
						class="block rounded px-3 py-1.5 text-sm text-(--ink) hover:bg-(--cream) data-highlighted:bg-(--indigo-dye) data-highlighted:text-white"
						onSelect={() => (lastAction = 'Open')}
					>
						Open
					</MenuItem>

					<SubMenu
						items={newItems}
						menuClass="z-50 min-w-44 rounded border border-(--charcoal)/15 bg-white p-1 shadow-lg"
						itemClass="flex w-full items-center gap-2 rounded px-3 py-1.5 text-left text-sm text-(--ink) hover:bg-(--cream) data-highlighted:bg-(--indigo-dye) data-highlighted:text-white"
						separatorClass="my-1 h-px bg-(--charcoal)/15"
						class="flex items-center justify-between rounded px-3 py-1.5 text-sm text-(--ink) hover:bg-(--cream) data-highlighted:bg-(--indigo-dye) data-highlighted:text-white data-[state=open]:bg-(--indigo-dye)/10"
					>
						{#snippet children()}
							<span>New</span>
							<CaretRight class="h-3 w-3" />
						{/snippet}
						{#snippet item({ item })}
							{#if item.label}
								{@const Icon = iconMap[item.label]}
								{#if Icon}<Icon class="h-4 w-4" />{/if}
								<span>{item.label}</span>
							{/if}
						{/snippet}
					</SubMenu>

					<SubMenu
						label="Share"
						items={shareItems}
						menuClass="z-50 min-w-40 rounded border border-(--charcoal)/15 bg-white p-1 shadow-lg"
						itemClass="block w-full rounded px-3 py-1.5 text-left text-sm text-(--ink) hover:bg-(--cream) data-highlighted:bg-(--indigo-dye) data-highlighted:text-white disabled:opacity-40 disabled:hover:bg-transparent"
						class="flex items-center justify-between rounded px-3 py-1.5 text-sm text-(--ink) hover:bg-(--cream) data-highlighted:bg-(--indigo-dye) data-highlighted:text-white data-[state=open]:bg-(--indigo-dye)/10"
					/>

					<div class="my-1 h-px bg-(--charcoal)/15"></div>

					<MenuItem
						class="block rounded px-3 py-1.5 text-sm text-(--vermilion) hover:bg-(--vermilion)/10 data-highlighted:bg-(--vermilion) data-highlighted:text-white"
						onSelect={() => (lastAction = 'Delete')}
					>
						Delete
					</MenuItem>
				</MenuContent>
			</Menu>

			<p class="mt-3 text-sm text-(--charcoal)/60">Last action: <strong>{lastAction}</strong></p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'label', type: 'string', default: 'required', description: 'Trigger text' },
			{ name: 'items', type: 'SubMenuItem[]', default: '[]' },
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'placement', type: 'Placement', default: "'right-start'" },
			{ name: 'item', type: 'Snippet<[{ entry, index, highlighted }]>', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Trigger has <code class="rounded bg-(--cream) px-1">aria-haspopup="menu"</code> + <code class="rounded bg-(--cream) px-1">aria-expanded</code>',
			'ArrowRight / Enter / Space open the submenu; ArrowLeft / Escape close',
			'Closes automatically when sibling submenus in the same parent open',
			'Floating-UI side-positions with viewport fit'
		]}
	/>
</main>
