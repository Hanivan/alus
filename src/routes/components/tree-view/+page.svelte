<script lang="ts">
	import { CaretLeft, CaretRight, Folder, FolderOpen, File } from 'phosphor-svelte';
	import { TreeView, TreeItem } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';
	import { resolve } from '$app/paths';

	const code = `<TreeView bind:selected aria-label="Project files">
	<TreeItem id="src">
		{#snippet label({ expanded })}{expanded ? '▾' : '▸'} src{/snippet}
		<TreeItem id="src/index.ts">
			{#snippet label()}index.ts{/snippet}
		</TreeItem>
	</TreeItem>
</TreeView>`;

	let selected = $state<string | null>(null);
</script>

<svelte:head>
	<title>TreeView · Alus Components</title>
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
			<div class="hanko-seal">樹</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">TreeView</h1>
				<p class="tracking-widest text-(--bamboo)">樹形図</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Hierarchical tree with role=tree, aria-expanded, aria-level, and full keyboard nav (arrows,
			Home, End, Enter).
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">File Browser</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<p class="mb-3 text-sm text-(--charcoal)/60">
				Selected: <code>{selected ?? '—'}</code>
			</p>
			{#snippet itemContent(name: string, icon: 'folder' | 'file', expanded: boolean, sel: boolean)}
				<span
					class="inline-flex cursor-pointer items-center gap-2 rounded px-2 py-1 transition-colors"
					style={sel ? 'background:var(--vermilion);color:white;' : ''}
				>
					{#if icon === 'folder'}
						{#if expanded}
							<FolderOpen class="h-4 w-4" weight="duotone" />
						{:else}
							<Folder class="h-4 w-4" weight="duotone" />
						{/if}
					{:else}
						<File class="h-4 w-4" />
					{/if}
					<span>{name}</span>
				</span>
			{/snippet}

			<TreeView
				bind:selected
				defaultExpanded={['src', 'src/components']}
				aria-label="Project files"
				class="font-mono text-sm outline-none"
			>
				<TreeItem id="src" class="outline-none">
					{#snippet label({ expanded, selected: sel })}
						{@render itemContent('src', 'folder', expanded, sel)}
					{/snippet}

					<TreeItem id="src/components" class="outline-none">
						{#snippet label({ expanded, selected: sel })}
							{@render itemContent('components', 'folder', expanded, sel)}
						{/snippet}

						<TreeItem id="src/components/Button.svelte" class="outline-none">
							{#snippet label({ selected: sel })}
								{@render itemContent('Button.svelte', 'file', false, sel)}
							{/snippet}
						</TreeItem>
						<TreeItem id="src/components/Input.svelte" class="outline-none">
							{#snippet label({ selected: sel })}
								{@render itemContent('Input.svelte', 'file', false, sel)}
							{/snippet}
						</TreeItem>
					</TreeItem>

					<TreeItem id="src/utils" class="outline-none">
						{#snippet label({ expanded, selected: sel })}
							{@render itemContent('utils', 'folder', expanded, sel)}
						{/snippet}
						<TreeItem id="src/utils/aria.ts" class="outline-none">
							{#snippet label({ selected: sel })}
								{@render itemContent('aria.ts', 'file', false, sel)}
							{/snippet}
						</TreeItem>
						<TreeItem id="src/utils/focus.ts" class="outline-none">
							{#snippet label({ selected: sel })}
								{@render itemContent('focus.ts', 'file', false, sel)}
							{/snippet}
						</TreeItem>
					</TreeItem>

					<TreeItem id="src/index.ts" class="outline-none">
						{#snippet label({ selected: sel })}
							{@render itemContent('index.ts', 'file', false, sel)}
						{/snippet}
					</TreeItem>
				</TreeItem>

				<TreeItem id="package.json" class="outline-none">
					{#snippet label({ selected: sel })}
						{@render itemContent('package.json', 'file', false, sel)}
					{/snippet}
				</TreeItem>

				<TreeItem id="README.md" class="outline-none">
					{#snippet label({ selected: sel })}
						{@render itemContent('README.md', 'file', false, sel)}
					{/snippet}
				</TreeItem>
			</TreeView>

			<p class="mt-6 text-xs text-(--charcoal)/50">
				<CaretRight class="inline h-3 w-3" /> Arrows to navigate, Enter/Space to select, Home/End to jump.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'selected',
				type: 'string | null',
				default: 'null',
				description: 'Bindable selected id'
			},
			{
				name: 'defaultExpanded',
				type: 'string[]',
				default: '[]',
				description: 'Ids open on mount'
			},
			{ name: 'id', type: 'string', default: 'required', description: '<code>TreeItem</code>' },
			{ name: 'label', type: 'Snippet<[{ expanded, selected }]>', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="tree"</code> + <code class="rounded bg-(--cream) px-1">role="treeitem"</code> with <code class="rounded bg-(--cream) px-1">aria-level</code>',
			'<code class="rounded bg-(--cream) px-1">aria-expanded</code> reflects open / closed state per item',
			'<code class="rounded bg-(--cream) px-1">aria-selected</code> tracks current selection (single-select)',
			'Keyboard: Arrows navigate / open / close, Home / End jump, Enter / Space selects, type-ahead supported'
		]}
	/>
</main>

<style>
	:global([role='tree'] ul) {
		padding-left: 1.5rem;
	}
	:global([role='treeitem']) {
		list-style: none;
	}
</style>
