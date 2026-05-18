<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Portal } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `{#if open}
	<Portal>
		<div class="fixed inset-0 z-50">…</div>
	</Portal>
{/if}`;

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

	<DemoFooter
		{code}
		props={[
			{ name: 'target', type: 'HTMLElement | string', default: 'document.body', description: 'Selector or element' },
			{ name: 'disabled', type: 'boolean', default: 'false', description: 'Renders in place instead of teleporting' }
		]}
		a11y={[
			'Teleporting breaks DOM order — pair with <code class="rounded bg-(--cream) px-1">FocusTrap</code> for modal-like content',
			'Restore focus to the trigger on close so keyboard / SR users don\'t get lost',
			'Use <code class="rounded bg-(--cream) px-1">role="dialog"</code> + <code>aria-modal</code> when wrapping modal content',
			'Layered content needs explicit z-index — Portal does not impose stacking'
		]}
	/>
</main>
