<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { FocusTrap, Portal } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `{#if open}
	<Portal>
		<FocusTrap active autoFocus restoreFocus>
			<button>Action</button>
			<button onclick={() => open = false}>Close</button>
		</FocusTrap>
	</Portal>
{/if}`;

	let open = $state(false);
</script>

<svelte:head>
	<title>FocusTrap · Alus Components</title>
	<meta name="description" content="Trap keyboard focus within a container" />
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
			<div class="hanko-seal">罠</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">FocusTrap</h1>
				<p class="tracking-widest text-(--bamboo)">フォーカストラップ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Keep keyboard focus within a container. Essential for modals and dialogs.
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
				onclick={() => (open = true)}
				class="border border-(--indigo-dye)/20 px-4 py-2 transition-colors hover:border-(--vermilion)"
			>
				Open trapped dialog
			</button>
			<p class="mt-3 text-sm text-(--charcoal)/70">
				Once open, Tab cycles within the dialog. Closing restores focus to this button.
			</p>

			{#if open}
				<Portal>
					<div
						class="fixed inset-0 z-50 flex items-center justify-center bg-(--ink)/50 backdrop-blur-sm"
					>
						<FocusTrap class="japanese-border mx-4 w-full max-w-md bg-white p-8">
							<h3 class="font-display mb-4 text-2xl text-(--ink)">Trapped Dialog</h3>
							<p class="mb-6 text-(--charcoal)/70">
								Tab through these buttons — focus stays inside. Press Shift+Tab from the first to
								wrap to the last.
							</p>
							<div class="mb-6 flex gap-2">
								<button class="border border-(--indigo-dye)/20 px-3 py-1 hover:border-(--vermilion)"
									>Action 1</button
								>
								<button class="border border-(--indigo-dye)/20 px-3 py-1 hover:border-(--vermilion)"
									>Action 2</button
								>
								<button class="border border-(--indigo-dye)/20 px-3 py-1 hover:border-(--vermilion)"
									>Action 3</button
								>
							</div>
							<button
								type="button"
								onclick={() => (open = false)}
								class="bg-(--ink) px-4 py-2 text-white transition-colors hover:bg-(--vermilion)"
							>
								Close
							</button>
						</FocusTrap>
					</div>
				</Portal>
			{/if}
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'active', type: 'boolean', default: 'true', description: 'Enable / disable trap' },
			{
				name: 'autoFocus',
				type: 'boolean',
				default: 'true',
				description: 'Focus first tabbable on mount'
			},
			{
				name: 'restoreFocus',
				type: 'boolean',
				default: 'true',
				description: 'Return focus on unmount'
			},
			{
				name: 'initialFocus',
				type: 'HTMLElement | string',
				default: 'undefined',
				description: 'Override first-focus target'
			}
		]}
		a11y={[
			'Required for any modal-like overlay so Tab / Shift+Tab stay inside',
			'<code class="rounded bg-(--cream) px-1">restoreFocus</code> returns focus to the trigger on close — never let it fall to <code>&lt;body&gt;</code>',
			'Pair with <code class="rounded bg-(--cream) px-1">role="dialog"</code> + <code class="rounded bg-(--cream) px-1">aria-modal="true"</code>',
			'Listen for Escape at the dialog level — FocusTrap does not close on its own'
		]}
	/>
</main>
