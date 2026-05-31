<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Tabs, TabList, Tab, TabPanel } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';
	import { resolve } from '$app/paths';

	const code = `<Tabs value="overview">
	<TabList>
		<Tab value="overview">Overview</Tab>
		<Tab value="settings">Settings</Tab>
	</TabList>
	<TabPanel value="overview">Overview content</TabPanel>
	<TabPanel value="settings">Settings content</TabPanel>
</Tabs>`;

	let current = $state('overview');
</script>

<svelte:head>
	<title>Tabs · Alus Components</title>
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
			<div class="hanko-seal">段</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Tabs</h1>
				<p class="tracking-widest text-(--bamboo)">タブ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Tabs with roving tabindex, automatic activation, and full keyboard navigation.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Horizontal</span>
			<span class="ml-2 text-lg text-(--bamboo)">水平</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Tabs bind:value={current}>
				<TabList class="flex gap-1 border-b border-(--indigo-dye)/20">
					<Tab
						value="overview"
						class="border-b-2 border-transparent px-4 py-2 text-sm text-(--charcoal)/70 transition-colors hover:text-(--ink) data-[state=active]:border-(--vermilion) data-[state=active]:text-(--vermilion)"
					>
						Overview
					</Tab>
					<Tab
						value="features"
						class="border-b-2 border-transparent px-4 py-2 text-sm text-(--charcoal)/70 transition-colors hover:text-(--ink) data-[state=active]:border-(--vermilion) data-[state=active]:text-(--vermilion)"
					>
						Features
					</Tab>
					<Tab
						value="install"
						class="border-b-2 border-transparent px-4 py-2 text-sm text-(--charcoal)/70 transition-colors hover:text-(--ink) data-[state=active]:border-(--vermilion) data-[state=active]:text-(--vermilion)"
					>
						Install
					</Tab>
				</TabList>

				<TabPanel value="overview" class="py-6 text-(--charcoal)/80 focus:outline-none">
					Alus is an unstyled, accessible Svelte 5 component library. Everything ships as semantic
					HTML with ARIA built in.
				</TabPanel>
				<TabPanel value="features" class="py-6 text-(--charcoal)/80 focus:outline-none">
					Compound components, runes mode, keyboard nav, Tailwind-friendly. No baked-in styles.
				</TabPanel>
				<TabPanel value="install" class="py-6 text-(--charcoal)/80 focus:outline-none">
					<code class="rounded bg-(--cream) px-2 py-1">pnpm add alus</code>
				</TabPanel>
			</Tabs>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'value',
				type: 'string',
				default: 'undefined',
				description: 'Bindable. <code>Tabs</code>'
			},
			{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
			{ name: 'activationMode', type: "'automatic' | 'manual'", default: "'automatic'" },
			{ name: 'value (Tab/TabPanel)', type: 'string', default: 'required' },
			{ name: 'disabled', type: 'boolean', default: 'false', description: '<code>Tab</code>' },
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="tablist"</code> + <code class="rounded bg-(--cream) px-1">role="tab"</code> + <code class="rounded bg-(--cream) px-1">role="tabpanel"</code>',
			'Roving tabindex — Tab into list, Arrows cycle, Tab leaves',
			'<code class="rounded bg-(--cream) px-1">aria-selected</code> + <code class="rounded bg-(--cream) px-1">aria-controls</code> wired automatically',
			'Home/End jump to first/last',
			'Manual activation mode (Enter/Space to activate) supports complex panels'
		]}
	/>
</main>
