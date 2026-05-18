<script lang="ts">
	import { CaretLeft, X } from 'phosphor-svelte';
	import {
		Sheet,
		SheetTrigger,
		SheetContent,
		SheetTitle,
		SheetDescription,
		SheetClose
	} from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Sheet side="bottom">
	<SheetTrigger>Open</SheetTrigger>
	<SheetContent>
		<SheetTitle>Filters</SheetTitle>
		<SheetClose>Done</SheetClose>
	</SheetContent>
</Sheet>`;

	let side = $state<'left' | 'right' | 'top' | 'bottom'>('right');
</script>

<svelte:head>
	<title>Sheet · Alus Components</title>
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
			<div class="hanko-seal">紙</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Sheet</h1>
				<p class="tracking-widest text-(--bamboo)">敷布</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			iOS-style side panel — re-exports <code>Drawer</code> as <code>Sheet</code> for naming convention.
		</p>
	</header>

	<section class="mb-16">
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

			<Sheet {side}>
				<SheetTrigger
					class="border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:border-(--vermilion)"
				>
					Open Sheet ({side})
				</SheetTrigger>
				<SheetContent
					backdropClass="fixed inset-0 bg-(--ink)/40 z-50"
					class="fixed z-50 bg-white p-6 shadow-2xl {side === 'right'
						? 'top-0 right-0 h-full w-80'
						: side === 'left'
							? 'top-0 left-0 h-full w-80'
							: side === 'top'
								? 'top-0 right-0 left-0 h-64'
								: 'right-0 bottom-0 left-0 h-64'}"
				>
					<div class="mb-4 flex items-start justify-between">
						<div>
							<SheetTitle class="font-display text-xl text-(--ink)">Settings</SheetTitle>
							<SheetDescription class="text-sm text-(--charcoal)/70">
								Adjust your preferences.
							</SheetDescription>
						</div>
						<SheetClose aria-label="Close" class="text-(--charcoal)/60 hover:text-(--ink)">
							<X class="h-5 w-5" />
						</SheetClose>
					</div>
					<p class="text-sm text-(--charcoal)/70">Sheet content here.</p>
				</SheetContent>
			</Sheet>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'side',
				type: "'left' | 'right' | 'top' | 'bottom'",
				default: "'bottom'",
				description: 'iOS-style sheet typically slides from bottom'
			},
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'closeOnEscape', type: 'boolean', default: 'true' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Same a11y contract as Drawer (this is the re-export)',
			'<code class="rounded bg-(--cream) px-1">role="dialog"</code> + focus trap + Escape close',
			'Use for app-shell-style panels (iOS-style filter / detail sheets)'
		]}
	/>
</main>
