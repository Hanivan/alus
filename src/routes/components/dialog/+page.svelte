<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import {
		Dialog,
		DialogTrigger,
		DialogContent,
		DialogTitle,
		DialogDescription,
		DialogClose
	} from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Dialog>
	<DialogTrigger>Open</DialogTrigger>
	<DialogContent>
		<DialogTitle>Inbox</DialogTitle>
		<DialogDescription>You have 3 new messages.</DialogDescription>
		<DialogClose>Close</DialogClose>
	</DialogContent>
</Dialog>`;
</script>

<svelte:head>
	<title>Dialog · Alus Components</title>
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
			<div class="hanko-seal">話</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Dialog</h1>
				<p class="tracking-widest text-(--bamboo)">ダイアログ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Non-modal dialog — same anatomy as Modal but without backdrop.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Dialog>
				<DialogTrigger
					class="border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:border-(--vermilion)"
				>
					Open Dialog
				</DialogTrigger>
				<DialogContent
					class="fixed top-20 right-8 z-50 w-80 border border-(--indigo-dye)/20 bg-white p-5 shadow-2xl focus:outline-none"
				>
					<DialogTitle class="font-display mb-2 text-xl text-(--ink)">Notice</DialogTitle>
					<DialogDescription class="mb-4 text-sm text-(--charcoal)/70">
						This is a non-modal dialog. The page behind remains interactive.
					</DialogDescription>
					<DialogClose
						class="bg-(--indigo-dye) px-4 py-2 text-sm text-white hover:bg-(--indigo-dye)/90"
					>
						Dismiss
					</DialogClose>
				</DialogContent>
			</Dialog>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'modal', type: 'boolean', default: 'false', description: 'Non-modal by default' },
			{ name: 'closeOnEscape', type: 'boolean', default: 'true' },
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="dialog"</code> — non-modal variant (no <code>aria-modal</code>)',
			'Page behind remains interactive; useful for inspector / detail panels',
			'DialogTitle / DialogDescription wired as labelledby / describedby',
			'Focus moves into the dialog on open; Escape closes and restores focus'
		]}
	/>
</main>
