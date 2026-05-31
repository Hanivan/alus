<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft } from 'phosphor-svelte';
	import { LiveRegion, Button } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<LiveRegion politeness="polite" {message} />
<LiveRegion politeness="assertive" message={criticalMessage} />`;

	let message = $state('');
	let counter = 0;

	function announce() {
		counter += 1;
		message = `Update ${counter}: order received at ${new Date().toLocaleTimeString()}`;
	}

	function urgent() {
		counter += 1;
		message = `Critical alert ${counter}: action required`;
	}
</script>

<svelte:head>
	<title>LiveRegion · Alus Components</title>
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
			<div class="hanko-seal">声</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">LiveRegion</h1>
				<p class="tracking-widest text-(--bamboo)">通知</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Screen-reader announcer. Visually hidden by default. Set <code>politeness</code> to control
			urgency — <code>polite</code> waits, <code>assertive</code> interrupts.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Polite + assertive</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex gap-3">
				<Button
					onclick={announce}
					class="rounded border border-(--indigo-dye) px-4 py-2 text-(--indigo-dye) hover:bg-(--indigo-dye) hover:text-white"
				>
					Polite update
				</Button>
				<Button
					onclick={urgent}
					class="rounded border border-(--vermilion) bg-(--vermilion) px-4 py-2 text-white hover:bg-(--vermilion)/85"
				>
					Assertive alert
				</Button>
			</div>

			<LiveRegion politeness="polite" {message} />
			<LiveRegion politeness="assertive" />

			<div
				class="rounded border border-dashed border-(--charcoal)/30 bg-white/60 p-4 font-mono text-sm text-(--charcoal)/70"
			>
				{message || '(no announcements yet)'}
			</div>
			<p class="text-xs text-(--charcoal)/60">
				Hidden region is mirrored to assistive tech. Visual mirror above is for the demo only.
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'message',
				type: 'string',
				default: "''",
				description: 'Text to announce (changes trigger SR)'
			},
			{ name: 'politeness', type: "'polite' | 'assertive'", default: "'polite'" },
			{
				name: 'atomic',
				type: 'boolean',
				default: 'true',
				description: 'aria-atomic announces entire region'
			},
			{ name: 'relevant', type: 'string', default: "'additions text'" }
		]}
		a11y={[
			'Visually hidden via the same technique as <code>VisuallyHidden</code> — not <code>display:none</code>',
			'<code class="rounded bg-(--cream) px-1">aria-live="polite"</code> waits for SR idle; <code class="rounded bg-(--cream) px-1">assertive</code> interrupts',
			'Reserve <code>assertive</code> for truly critical info — overuse trains users to ignore announcements',
			'Mount once near the page root; update <code>message</code> reactively to trigger announcements'
		]}
	/>
</main>
