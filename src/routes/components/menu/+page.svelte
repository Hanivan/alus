<script lang="ts">
	import { CaretLeft, CaretDown, PencilSimple, Trash, Copy, Share } from 'phosphor-svelte';
	import { Menu, MenuTrigger, MenuContent, MenuItem } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';
	import { resolve } from '$app/paths';

	const code = `<Menu>
	<MenuTrigger>File</MenuTrigger>
	<MenuContent>
		<MenuItem onSelect={() => doNew()}>New</MenuItem>
		<MenuItem onSelect={() => open()}>Open…</MenuItem>
		<MenuItem onSelect={() => save()}>Save</MenuItem>
	</MenuContent>
</Menu>`;

	let last = $state('');
</script>

<svelte:head>
	<title>Menu · Alus Components</title>
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
			<div class="hanko-seal">献</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Menu</h1>
				<p class="tracking-widest text-(--bamboo)">メニュー</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Compound dropdown menu with portal + floating-ui positioning, keyboard nav, and
			activation-then-close.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<Menu>
				<MenuTrigger
					class="inline-flex items-center gap-2 border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:border-(--vermilion) data-[state=open]:border-(--vermilion)"
				>
					{#snippet children({ open })}
						<span>Actions</span>
						<CaretDown class="h-4 w-4 transition-transform {open ? 'rotate-180' : ''}" />
					{/snippet}
				</MenuTrigger>
				<MenuContent
					class="z-50 min-w-44 border border-(--indigo-dye)/20 bg-white py-1 shadow-lg focus:outline-none"
				>
					<MenuItem
						onSelect={() => (last = 'Edit')}
						class="flex cursor-pointer items-center gap-2 px-3 py-2 text-(--charcoal) data-highlighted:bg-(--cream) data-highlighted:text-(--vermilion)"
					>
						<PencilSimple class="h-4 w-4" />
						<span>Edit</span>
					</MenuItem>
					<MenuItem
						onSelect={() => (last = 'Duplicate')}
						class="flex cursor-pointer items-center gap-2 px-3 py-2 text-(--charcoal) data-highlighted:bg-(--cream) data-highlighted:text-(--vermilion)"
					>
						<Copy class="h-4 w-4" />
						<span>Duplicate</span>
					</MenuItem>
					<MenuItem
						onSelect={() => (last = 'Share')}
						class="flex cursor-pointer items-center gap-2 px-3 py-2 text-(--charcoal) data-highlighted:bg-(--cream) data-highlighted:text-(--vermilion)"
					>
						<Share class="h-4 w-4" />
						<span>Share</span>
					</MenuItem>
					<div class="my-1 h-px bg-(--indigo-dye)/10"></div>
					<MenuItem
						onSelect={() => (last = 'Delete')}
						class="flex cursor-pointer items-center gap-2 px-3 py-2 text-(--vermilion) data-highlighted:bg-(--vermilion)/10"
					>
						<Trash class="h-4 w-4" />
						<span>Delete</span>
					</MenuItem>
					<MenuItem
						disabled
						class="flex cursor-not-allowed items-center gap-2 px-3 py-2 text-(--charcoal)/40"
					>
						<span>Archive (disabled)</span>
					</MenuItem>
				</MenuContent>
			</Menu>

			<p class="text-sm text-(--charcoal)/60">Last selected: <code>{last || '—'}</code></p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'open',
				type: 'boolean',
				default: 'false',
				description: 'Bindable. <code>Menu</code>'
			},
			{ name: 'placement', type: 'Placement', default: "'bottom-start'" },
			{ name: 'closeOnSelect', type: 'boolean', default: 'true' },
			{
				name: 'onSelect',
				type: '() => void',
				default: 'undefined',
				description: '<code>MenuItem</code>'
			},
			{ name: 'disabled', type: 'boolean', default: 'false', description: '<code>MenuItem</code>' },
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'Trigger: <code class="rounded bg-(--cream) px-1">aria-haspopup="menu"</code> + <code class="rounded bg-(--cream) px-1">aria-expanded</code>',
			'<code class="rounded bg-(--cream) px-1">role="menu"</code> + <code class="rounded bg-(--cream) px-1">role="menuitem"</code>',
			'Arrow keys cycle, Home/End jump, type-ahead character search',
			'Enter/Space select, Escape closes and restores focus to trigger',
			'Floating-UI positioning with viewport-fit'
		]}
	/>
</main>
