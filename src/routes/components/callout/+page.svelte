<script lang="ts">
	import { CaretLeft, Info, CheckCircle, Warning, XCircle, Lightbulb, Note } from 'phosphor-svelte';
	import { Callout } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Callout variant="tip">
	{#snippet title()}Tip{/snippet}
	Bind both halves of a SplitView for nested layouts.
</Callout>`;

	type Variant = 'note' | 'info' | 'success' | 'warning' | 'error' | 'tip';

	function color(v: Variant) {
		if (v === 'success') return 'var(--matcha)';
		if (v === 'warning') return 'var(--muted-gold)';
		if (v === 'error') return 'var(--vermilion)';
		if (v === 'info') return 'var(--indigo-dye)';
		if (v === 'tip') return 'var(--matcha)';
		return 'var(--charcoal)';
	}

	function icon(v: Variant) {
		if (v === 'success') return CheckCircle;
		if (v === 'warning') return Warning;
		if (v === 'error') return XCircle;
		if (v === 'info') return Info;
		if (v === 'tip') return Lightbulb;
		return Note;
	}

	const items: { variant: Variant; title: string; body: string }[] = [
		{ variant: 'note', title: 'Note', body: 'A simple note for context that does not interrupt.' },
		{ variant: 'info', title: 'Heads up', body: 'You can configure this in your account settings.' },
		{ variant: 'tip', title: 'Tip', body: 'Bind both halves of a SplitView for nested layouts.' },
		{
			variant: 'success',
			title: 'Saved',
			body: 'Your preferences were synced across all devices.'
		},
		{
			variant: 'warning',
			title: 'Quota close',
			body: 'You are at 92% of your monthly upload limit.'
		},
		{
			variant: 'error',
			title: 'Action failed',
			body: 'We could not reach the server. Check your connection.'
		}
	];
</script>

<svelte:head>
	<title>Callout · Alus Components</title>
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
			<div class="hanko-seal">枠</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Callout</h1>
				<p class="tracking-widest text-(--bamboo)">引用</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Highlighted block for tips, notes, and gentle warnings. Unlike <code>Alert</code>, it is not a
			live region — meant for static content sitting alongside the page.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Variants</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			{#each items as item}
				{@const Icon = icon(item.variant)}
				<Callout
					variant={item.variant}
					class="flex items-start gap-3 rounded border border-(--charcoal)/15 bg-white p-4"
					titleClass="font-display text-sm text-(--ink) mb-1"
					style={`border-left:4px solid ${color(item.variant)};`}
				>
					{#snippet icon()}
						<Icon class="mt-0.5 h-5 w-5 shrink-0" style={`color:${color(item.variant)};`} />
					{/snippet}
					{#snippet title()}
						{item.title}
					{/snippet}
					<p class="text-sm text-(--charcoal)/70">{item.body}</p>
				</Callout>
			{/each}
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'variant', type: "'note' | 'info' | 'success' | 'warning' | 'error' | 'tip'", default: "'note'" },
			{ name: 'title', type: 'Snippet', default: 'undefined' },
			{ name: 'icon', type: 'Snippet', default: 'undefined' },
			{ name: 'titleClass', type: 'string', default: "''" },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Static block — not a live region (use <code>Alert</code> for dynamic announcements)',
			'Title renders as a real heading so it shows up in document outline',
			'Color is decorative — variant meaning must be in the text',
			'Icon is marked <code class="rounded bg-(--cream) px-1">aria-hidden</code> automatically'
		]}
	/>
</main>
