<script lang="ts">
	import { CaretLeft, X } from 'phosphor-svelte';
	import {
		Modal,
		ModalTrigger,
		ModalContent,
		ModalTitle,
		ModalDescription,
		ModalClose
	} from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';
	import { resolve } from '$app/paths';

	const code = `<Modal>
	<ModalTrigger>Open</ModalTrigger>
	<ModalContent>
		<ModalTitle>Confirm delete</ModalTitle>
		<ModalDescription>This cannot be undone.</ModalDescription>
		<ModalClose>Cancel</ModalClose>
		<button onclick={remove}>Delete</button>
	</ModalContent>
</Modal>`;
</script>

<svelte:head>
	<title>Modal · Alus Components</title>
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
			<div class="hanko-seal">壁</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Modal</h1>
				<p class="tracking-widest text-(--bamboo)">モーダル</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Modal dialog with backdrop, focus trap, Escape close, and return focus.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<Modal>
				<ModalTrigger
					class="border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:border-(--vermilion)"
				>
					Open Modal
				</ModalTrigger>
				<ModalContent
					backdropClass="fixed inset-0 z-50 grid place-items-center bg-(--ink)/50 backdrop-blur-sm p-4"
					class="relative w-full max-w-md border border-(--indigo-dye)/20 bg-white p-6 shadow-2xl focus:outline-none"
				>
					<ModalClose
						aria-label="Close"
						class="absolute top-3 right-3 grid h-8 w-8 place-items-center text-(--charcoal)/60 hover:text-(--vermilion)"
					>
						<X class="h-4 w-4" />
					</ModalClose>
					<ModalTitle class="font-display mb-2 text-2xl text-(--ink)">Confirm action</ModalTitle>
					<ModalDescription class="mb-6 text-(--charcoal)/70">
						This action cannot be undone. Are you sure you want to proceed?
					</ModalDescription>
					<div class="flex justify-end gap-2">
						<ModalClose
							class="border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:bg-(--cream)"
						>
							Cancel
						</ModalClose>
						<ModalClose class="bg-(--vermilion) px-4 py-2 text-white hover:bg-(--vermilion)/90">
							Confirm
						</ModalClose>
					</div>
				</ModalContent>
			</Modal>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'open',
				type: 'boolean',
				default: 'false',
				description: 'Bindable. <code>Modal</code>'
			},
			{
				name: 'closeOnEscape',
				type: 'boolean',
				default: 'true',
				description: '<code>Modal</code>'
			},
			{
				name: 'closeOnOutsideClick',
				type: 'boolean',
				default: 'true',
				description: '<code>Modal</code>'
			},
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="dialog"</code> + <code class="rounded bg-(--cream) px-1">aria-modal="true"</code>',
			'Focus trapped while open; restored to trigger on close',
			'ModalTitle wired as <code class="rounded bg-(--cream) px-1">aria-labelledby</code>, ModalDescription as <code class="rounded bg-(--cream) px-1">aria-describedby</code>',
			'Escape closes; outside click closes; backdrop is <code class="rounded bg-(--cream) px-1">aria-hidden</code>',
			'Portalled to <code class="rounded bg-(--cream) px-1">document.body</code> to escape stacking contexts'
		]}
	/>
</main>
