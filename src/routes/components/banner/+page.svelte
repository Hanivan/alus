<script lang="ts">
	import { CaretLeft, Info, CheckCircle, Warning, XCircle, Megaphone } from 'phosphor-svelte';
	import { Banner, Button } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Banner variant="warning" role="alert" dismissible bind:open={open}>
	{#snippet icon()}<Warning class="h-5 w-5" />{/snippet}
	You are nearing your storage quota (92%).
</Banner>`;

	let infoOpen = $state(true);
	let warnOpen = $state(true);
	let errorOpen = $state(true);
	let announceOpen = $state(true);

	function reset() {
		infoOpen = warnOpen = errorOpen = announceOpen = true;
	}
</script>

<svelte:head>
	<title>Banner · Alus Components</title>
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
			<div class="hanko-seal">幕</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Banner</h1>
				<p class="tracking-widest text-(--bamboo)">幕板</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Page-level alert / announcement strip. Variants, optional <code>dismissible</code>, switchable
			role between <code>region</code>, <code>status</code>, and <code>alert</code>.
		</p>
	</header>

	<section class="mb-16">
		<div class="japanese-border space-y-3 bg-white/50 p-6 backdrop-blur-sm">
			<Banner
				bind:open={announceOpen}
				variant="announcement"
				dismissible
				class="flex items-center gap-3 rounded border border-(--indigo-dye)/30 bg-(--indigo-dye)/5 p-3 text-sm text-(--ink)"
			>
				{#snippet icon()}
					<Megaphone class="h-5 w-5 shrink-0 text-(--indigo-dye)" />
				{/snippet}
				{#snippet title()}
					<span class="font-display">New release</span>
				{/snippet}
				<span class="text-(--charcoal)/80">Alus v0.0.2 ships with Toast and Layout primitives.</span>
			</Banner>

			<Banner
				bind:open={infoOpen}
				variant="info"
				dismissible
				class="flex items-center gap-3 rounded border border-(--indigo-dye)/30 bg-white p-3 text-sm text-(--ink)"
			>
				{#snippet icon()}<Info class="h-5 w-5 shrink-0 text-(--indigo-dye)" />{/snippet}
				Maintenance window scheduled tonight at 23:00 JST.
			</Banner>

			<Banner
				bind:open={warnOpen}
				variant="warning"
				role="alert"
				dismissible
				class="flex items-center gap-3 rounded border border-(--muted-gold)/40 bg-(--muted-gold)/10 p-3 text-sm text-(--ink)"
			>
				{#snippet icon()}<Warning class="h-5 w-5 shrink-0 text-(--muted-gold)" />{/snippet}
				You are nearing your storage quota (92%).
			</Banner>

			<Banner
				bind:open={errorOpen}
				variant="error"
				role="alert"
				dismissible
				class="flex items-center gap-3 rounded border border-(--vermilion)/40 bg-(--vermilion)/10 p-3 text-sm text-(--ink)"
			>
				{#snippet icon()}<XCircle class="h-5 w-5 shrink-0 text-(--vermilion)" />{/snippet}
				<strong class="font-medium">Critical:</strong> Sync failed for 3 documents.
			</Banner>

			<Banner
				variant="success"
				class="flex items-center gap-3 rounded border border-(--matcha)/40 bg-(--matcha)/10 p-3 text-sm text-(--ink)"
			>
				{#snippet icon()}<CheckCircle class="h-5 w-5 shrink-0 text-(--matcha)" />{/snippet}
				Settings saved successfully.
			</Banner>

			<Button
				onclick={reset}
				class="mt-4 inline-flex rounded border border-(--charcoal)/20 px-3 py-1.5 text-xs text-(--charcoal)"
			>
				Reset dismissed
			</Button>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'variant', type: "'announcement' | 'info' | 'success' | 'warning' | 'error'", default: "'info'" },
			{ name: 'role', type: "'region' | 'status' | 'alert'", default: "'region'" },
			{ name: 'dismissible', type: 'boolean', default: 'false' },
			{ name: 'open', type: 'boolean', default: 'true', description: 'Bindable' },
			{ name: 'icon', type: 'Snippet', default: 'undefined' },
			{ name: 'title', type: 'Snippet', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="region"</code> with <code class="rounded bg-(--cream) px-1">aria-label</code> for non-urgent context',
			'Promote to <code class="rounded bg-(--cream) px-1">role="alert"</code> only for critical interrupts',
			'Dismiss button has <code class="rounded bg-(--cream) px-1">aria-label="Dismiss"</code> + restores focus on close',
			'Mount near top of the page so SRs encounter it before main content'
		]}
	/>
</main>
