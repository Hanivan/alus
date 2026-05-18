<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Overlay, Button } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Overlay, Button } from 'alus-ui';
	let open = $state(false);
<\/script>

<Button onclick={() => (open = true)}>Open</Button>
{#if open}
	<Overlay onclose={() => (open = false)} class="bg-black/60">
		<div class="rounded bg-white p-6">…</div>
	</Overlay>
{/if}`;

	let open = $state(false);
</script>

<svelte:head>
	<title>Overlay · Alus Components</title>
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
			<div class="hanko-seal">蓋</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Overlay</h1>
				<p class="tracking-widest text-(--bamboo)">被覆</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Low-level backdrop primitive with portal + Escape + outside-click. Build custom modals on top
			of this.
		</p>
	</header>

	<section class="mb-16">
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Button
				onclick={() => (open = true)}
				class="rounded border border-(--indigo-dye) bg-(--indigo-dye) px-4 py-2 text-sm text-white"
			>
				Show Overlay
			</Button>

			<Overlay
				bind:open
				class="fixed inset-0 z-50 flex items-center justify-center bg-(--ink)/60 backdrop-blur-sm"
			>
				<div class="rounded bg-white p-6 shadow-2xl">
					<h2 class="font-display text-xl text-(--ink)">Custom panel</h2>
					<p class="mt-2 text-sm text-(--charcoal)/70">Click backdrop or press Escape to close.</p>
					<button
						class="mt-4 rounded border border-(--charcoal)/20 px-3 py-1.5 text-sm text-(--ink)"
						onclick={() => (open = false)}
					>
						Close
					</button>
				</div>
			</Overlay>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'closeOnEscape', type: 'boolean', default: 'true' },
			{ name: 'closeOnOutsideClick', type: 'boolean', default: 'true' },
			{ name: 'onclose', type: '() => void', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Low-level primitive — does NOT add <code class="rounded bg-(--cream) px-1">role="dialog"</code> on its own',
			'Provides Portal + Escape close + outside-click close — bring your own ARIA',
			'Use Modal/Dialog/Popover for fully-wired overlays; reach for Overlay only when building custom shells'
		]}
	/>
</main>
