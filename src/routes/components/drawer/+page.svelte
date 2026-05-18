<script lang="ts">
	import { CaretLeft, X } from 'phosphor-svelte';
	import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription, DrawerClose } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Drawer side="right">
	<DrawerTrigger>Open</DrawerTrigger>
	<DrawerContent>
		<DrawerTitle>Settings</DrawerTitle>
		<DrawerDescription>Adjust your preferences.</DrawerDescription>
		<DrawerClose>Close</DrawerClose>
	</DrawerContent>
</Drawer>`;

	let side = $state<'left' | 'right' | 'top' | 'bottom'>('right');
</script>

<svelte:head>
	<title>Drawer · Alus Components</title>
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
			<div class="hanko-seal">引</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Drawer</h1>
				<p class="tracking-widest text-(--bamboo)">引き出し</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Side panel sliding from any edge — focus trap + Escape close.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-6 bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap gap-2">
				{#each ['left', 'right', 'top', 'bottom'] as s (s)}
					<button
						class="border px-3 py-1 text-sm {side === s
							? 'border-(--vermilion) text-(--vermilion)'
							: 'border-(--indigo-dye)/20 text-(--ink)'}"
						onclick={() => (side = s as typeof side)}
					>
						{s}
					</button>
				{/each}
			</div>

			<Drawer {side}>
				<DrawerTrigger
					class="border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:border-(--vermilion)"
				>
					Open Drawer ({side})
				</DrawerTrigger>
				<DrawerContent
					backdropClass="fixed inset-0 z-50 bg-(--ink)/40 backdrop-blur-sm"
					class="fixed z-50 bg-white p-6 shadow-2xl focus:outline-none data-[drawer-side=left]:top-0 data-[drawer-side=left]:left-0 data-[drawer-side=left]:h-full data-[drawer-side=left]:w-80 data-[drawer-side=right]:top-0 data-[drawer-side=right]:right-0 data-[drawer-side=right]:h-full data-[drawer-side=right]:w-80 data-[drawer-side=top]:top-0 data-[drawer-side=top]:left-0 data-[drawer-side=top]:right-0 data-[drawer-side=top]:h-64 data-[drawer-side=bottom]:right-0 data-[drawer-side=bottom]:bottom-0 data-[drawer-side=bottom]:left-0 data-[drawer-side=bottom]:h-64"
				>
					<DrawerClose
						aria-label="Close"
						class="absolute top-3 right-3 grid h-8 w-8 place-items-center text-(--charcoal)/60 hover:text-(--vermilion)"
					>
						<X class="h-4 w-4" />
					</DrawerClose>
					<DrawerTitle class="font-display mb-2 text-2xl text-(--ink)">Drawer panel</DrawerTitle>
					<DrawerDescription class="mb-4 text-(--charcoal)/70">
						Sliding from {side}. Position styled via <code>data-drawer-side</code>.
					</DrawerDescription>
					<DrawerClose class="border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:bg-(--cream)">
						Close
					</DrawerClose>
				</DrawerContent>
			</Drawer>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'" },
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'closeOnEscape', type: 'boolean', default: 'true' },
			{ name: 'closeOnOutsideClick', type: 'boolean', default: 'true' },
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="dialog"</code> + <code class="rounded bg-(--cream) px-1">aria-modal="true"</code>',
			'Focus trap + restoration to trigger on close',
			'Escape closes; outside click closes',
			'DrawerTitle / DrawerDescription wired for screen readers',
			'<code class="rounded bg-(--cream) px-1">data-side</code> attribute for slide-in animation styling'
		]}
	/>
</main>
