<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Portal } from 'alus';

	let showPortal = $state(false);
</script>

<svelte:head>
	<title>Portal · Alus Components</title>
	<meta name="description" content="Teleport content to document.body" />
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
			<div class="hanko-seal">門</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Portal</h1>
				<p class="tracking-widest text-(--bamboo)">ポータル</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Teleport children to <code class="rounded bg-(--cream) px-1 text-base">document.body</code> or any
			target element.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Demo</span>
			<span class="ml-2 text-lg text-(--bamboo)">実演</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<button
				type="button"
				onclick={() => (showPortal = !showPortal)}
				class="border border-(--indigo-dye)/20 px-4 py-2 transition-colors hover:border-(--vermilion)"
			>
				{showPortal ? 'Hide' : 'Show'} Portal Content
			</button>

			{#if showPortal}
				<Portal>
					<div class="japanese-border fixed top-4 right-4 z-50 max-w-xs bg-(--ink) p-4 text-white">
						<p class="font-display mb-1">Portaled Content</p>
						<p class="text-sm opacity-80">
							This element lives at the top of document.body, escaping parent overflow/transform
							contexts.
						</p>
					</div>
				</Portal>
			{/if}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Use Cases</span>
			<span class="ml-2 text-lg text-(--bamboo)">用途</span>
		</h2>

		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Modals, dialogs, drawers — escape parent stacking context</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Tooltips, popovers — avoid <code class="rounded bg-(--cream) px-1"
							>overflow:hidden</code
						> clipping</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80">Toasts, notifications — render at viewport edge</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						><code class="rounded bg-(--cream) px-1">target</code> prop accepts element or selector;
						<code class="rounded bg-(--cream) px-1">disabled</code> renders in place</span
					>
				</li>
			</ul>
		</div>
	</section>
</main>
