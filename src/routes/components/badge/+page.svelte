<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Badge } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Badge variant="success" aria-label="3 unread">
	3
</Badge>`;
</script>

<svelte:head>
	<title>Badge · Alus Components</title>
	<meta
		name="description"
		content="Accessible badge component with ARIA support for status indicators"
	/>
</svelte:head>

<a
	href="/"
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">章</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Badge</h1>
				<p class="tracking-widest text-(--bamboo)">バッジ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			An accessible badge for status indicators, counts, and labels with full ARIA support.
		</p>
	</header>

	<!-- Variants -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Variants</span>
			<span class="ml-2 text-lg text-(--bamboo)">バリアント</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap items-center gap-4">
				<Badge
					class="rounded bg-(--indigo-dye)/10 px-3 py-1 text-sm font-medium text-(--indigo-dye)"
				>
					Default
				</Badge>
				<Badge
					variant="success"
					class="rounded bg-(--matcha)/10 px-3 py-1 text-sm font-medium text-(--matcha)"
				>
					Success
				</Badge>
				<Badge
					variant="warning"
					class="rounded bg-amber-500/10 px-3 py-1 text-sm font-medium text-amber-600"
				>
					Warning
				</Badge>
				<Badge
					variant="error"
					class="rounded bg-(--vermilion)/10 px-3 py-1 text-sm font-medium text-(--vermilion)"
				>
					Error
				</Badge>
				<Badge
					variant="info"
					class="rounded bg-sky-500/10 px-3 py-1 text-sm font-medium text-sky-600"
				>
					Info
				</Badge>
			</div>
		</div>
	</section>

	<!-- With Counts -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Count Badges</span>
			<span class="ml-2 text-lg text-(--bamboo)">カウント</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap items-center gap-6">
				<!-- Notification count -->
				<div class="relative">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full bg-(--indigo-dye)/10 text-(--indigo-dye)"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="currentColor"
							viewBox="0 0 256 256"
							><path
								d="M221.8 175.94c-5.55-9.56-13.8-36.61-13.8-71.94a80 80 0 1 0-160 0c0 35.34-8.26 62.38-13.81 71.94A16 16 0 0 0 48 200h40.81a40 40 0 0 0 78.38 0H208a16 16 0 0 0 13.8-24.06ZM128 216a24 24 0 0 1-22.62-16h45.24A24 24 0 0 1 128 216Z"
							/></svg
						>
					</div>
					<Badge
						variant="error"
						class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-(--vermilion) text-xs font-bold text-white"
						aria-label="3 unread notifications"
						aria-live="polite"
					>
						3
					</Badge>
				</div>

				<!-- Simple count badge -->
				<Badge
					variant="success"
					class="rounded-full bg-(--matcha) px-2 py-0.5 text-xs font-bold text-white"
					aria-label="12 items completed"
				>
					12
				</Badge>
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'variant',
				type: "'default' | 'success' | 'warning' | 'error' | 'info'",
				default: "'default'"
			},
			{
				name: 'aria-label',
				type: 'string',
				default: 'undefined',
				description: 'Critical for icon-only or count badges'
			},
			{
				name: 'aria-live',
				type: "'off' | 'polite' | 'assertive'",
				default: "'off'",
				description: 'Announce count changes'
			},
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Renders a semantic <code class="rounded bg-(--cream) px-1">&lt;span&gt;</code>',
			'For changing counts set <code class="rounded bg-(--cream) px-1">aria-live="polite"</code> so SRs announce updates',
			'Always provide an <code class="rounded bg-(--cream) px-1">aria-label</code> when the badge shows only a number ("3 unread notifications")',
			'Color is decorative — meaning must come from text or label'
		]}
	/>
</main>
