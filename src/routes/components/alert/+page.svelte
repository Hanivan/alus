<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft, Info, CheckCircle, Warning, XCircle } from 'phosphor-svelte';
	import { Alert } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Alert variant="success" role="status" dismissible>
	{#snippet title()}Saved{/snippet}
	Your changes have been saved.
</Alert>`;

	let showInfo = $state(true);
</script>

<svelte:head>
	<title>Alert · Alus Components</title>
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
			<div class="hanko-seal">報</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Alert</h1>
				<p class="tracking-widest text-(--bamboo)">アラート</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Notification banner with variants, dismissible state, and ARIA live regions.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Variants</span>
			<span class="ml-2 text-lg text-(--bamboo)">種類</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<Alert
				variant="info"
				class="flex items-start gap-3 border border-sky-500/30 bg-sky-50 p-4 text-sky-900"
				titleClass="font-semibold"
			>
				{#snippet icon()}<Info class="mt-0.5 h-5 w-5 shrink-0" />{/snippet}
				{#snippet title()}Information{/snippet}
				This is an informational message.
			</Alert>

			<Alert
				variant="success"
				role="status"
				class="flex items-start gap-3 border border-(--matcha)/40 bg-(--matcha)/10 p-4 text-(--matcha)"
				titleClass="font-semibold"
			>
				{#snippet icon()}<CheckCircle class="mt-0.5 h-5 w-5 shrink-0" />{/snippet}
				{#snippet title()}Success{/snippet}
				Your changes have been saved.
			</Alert>

			<Alert
				variant="warning"
				class="flex items-start gap-3 border border-(--muted-gold)/40 bg-(--muted-gold)/10 p-4 text-(--bamboo)"
				titleClass="font-semibold"
			>
				{#snippet icon()}<Warning class="mt-0.5 h-5 w-5 shrink-0" />{/snippet}
				{#snippet title()}Warning{/snippet}
				Review your input before continuing.
			</Alert>

			<Alert
				variant="error"
				class="flex items-start gap-3 border border-(--vermilion)/40 bg-(--vermilion)/10 p-4 text-(--vermilion)"
				titleClass="font-semibold"
			>
				{#snippet icon()}<XCircle class="mt-0.5 h-5 w-5 shrink-0" />{/snippet}
				{#snippet title()}Error{/snippet}
				Something went wrong. Please try again.
			</Alert>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Dismissible</span>
			<span class="ml-2 text-lg text-(--bamboo)">閉じる</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			{#if !showInfo}
				<button
					type="button"
					onclick={() => (showInfo = true)}
					class="border border-(--indigo-dye)/20 px-3 py-1 text-sm transition-colors hover:border-(--vermilion)"
				>
					Show alert
				</button>
			{/if}
			<Alert
				bind:open={showInfo}
				dismissible
				class="flex items-start gap-3 border border-(--indigo-dye)/20 bg-white p-4 text-(--charcoal)"
				titleClass="font-semibold"
			>
				{#snippet title()}Heads up{/snippet}
				Click the × to dismiss this alert.
			</Alert>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'" },
			{
				name: 'role',
				type: "'alert' | 'status'",
				default: "'alert'",
				description: '<code>alert</code> interrupts, <code>status</code> waits'
			},
			{ name: 'dismissible', type: 'boolean', default: 'false' },
			{ name: 'open', type: 'boolean', default: 'true', description: 'Bindable visibility' },
			{ name: 'titleClass', type: 'string', default: "''" },
			{ name: 'title', type: 'Snippet', default: 'undefined' },
			{ name: 'icon', type: 'Snippet', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="alert"</code> for errors / warnings — interrupts SR immediately',
			'<code class="rounded bg-(--cream) px-1">role="status"</code> for success / info — queues politely',
			'Dismiss button has <code class="rounded bg-(--cream) px-1">aria-label="Close"</code> and is keyboard activated',
			'Title (when present) is associated with the alert region via aria attrs'
		]}
	/>
</main>
