<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Button } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	let subscribed = $state(false);
	let disabled = $state(false);

	const code = `<script lang="ts">
	import { Button } from 'alus-ui';
	let pressed = $state(false);
<\/script>

<Button
	type="button"
	aria-pressed={pressed}
	onclick={() => (pressed = !pressed)}
	class="rounded bg-(--indigo-dye) px-6 py-3 text-white hover:bg-(--vermilion)"
>
	{pressed ? 'Subscribed' : 'Subscribe'}
</Button>`;
</script>

<svelte:head>
	<title>Button · Alus Components</title>
	<meta
		name="description"
		content="Accessible button component with ARIA support and toggle states"
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
			<div class="hanko-seal">ボ</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Button</h1>
				<p class="tracking-widest text-(--bamboo)">ボタン</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			An accessible button with full ARIA support, toggle states, and keyboard navigation.
		</p>
	</header>

	<!-- Basic Buttons -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Basic Buttons</span>
			<span class="ml-2 text-lg text-(--bamboo)">基本的なボタン</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap gap-4">
				<Button
					type="button"
					class="rounded bg-(--indigo-dye) px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-(--vermilion)"
					aria-label="Primary action"
				>
					Primary
				</Button>
				<Button
					type="button"
					class="rounded bg-(--charcoal) px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-(--bamboo)"
					aria-label="Secondary action"
				>
					Secondary
				</Button>
				<Button
					type="button"
					class="rounded border-2 border-(--indigo-dye) px-6 py-3 font-medium text-(--indigo-dye) transition-all duration-300 hover:bg-(--indigo-dye) hover:text-white"
					aria-label="Outline action"
				>
					Outline
				</Button>
				<Button
					type="button"
					class="cursor-not-allowed rounded bg-(--matcha) px-6 py-3 font-medium text-white opacity-50"
					{disabled}
					onclick={() => (disabled = !disabled)}
					aria-label="Toggle disabled"
				>
					{disabled ? 'Disabled' : 'Toggle'}
				</Button>
			</div>
		</div>
	</section>

	<!-- Toggle Button -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Toggle Button</span>
			<span class="ml-2 text-lg text-(--bamboo)">トグルボタン</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap items-center gap-6">
				<Button
					type="button"
					class="rounded px-6 py-3 font-medium transition-all duration-300 {subscribed
						? 'bg-(--vermilion) text-white'
						: 'bg-(--charcoal)/10 text-(--charcoal) hover:bg-(--charcoal) hover:text-white'}"
					aria-pressed={subscribed}
					onclick={() => (subscribed = !subscribed)}
				>
					{subscribed ? 'Subscribed' : 'Subscribe'}
				</Button>

				<div
					role="status"
					aria-live="polite"
					class="rounded border border-(--indigo-dye)/10 bg-(--cream) px-4 py-2 text-sm"
				>
					Status: <span class="font-medium text-(--indigo-dye)"
						>{subscribed ? 'Subscribed' : 'Not subscribed'}</span
					>
				</div>
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'" },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'aria-pressed', type: 'boolean', default: 'undefined', description: 'Toggle state' },
			{ name: 'aria-label', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" },
			{ name: 'onclick', type: '(e: MouseEvent) => void', default: 'undefined' }
		]}
		a11y={[
			'Semantic native <code class="rounded bg-(--cream) px-1">&lt;button&gt;</code> element',
			'Full ARIA support: <code class="rounded bg-(--cream) px-1">aria-label</code>, <code class="rounded bg-(--cream) px-1">aria-pressed</code>, <code class="rounded bg-(--cream) px-1">aria-describedby</code>',
			'Keyboard activation with Enter and Space',
			'Visible focus indicator for keyboard users',
			'Screen-reader announcements on state changes'
		]}
	/>

	<!-- Keyboard Testing -->
	<section>
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Keyboard Testing</span>
			<span class="ml-2 text-lg text-(--bamboo)">キーボードテスト</span>
		</h2>

		<div class="japanese-border bg-(--indigo-dye)/5 p-8">
			<h3 class="mb-4 font-semibold text-(--ink)">Test keyboard navigation:</h3>
			<ol class="list-inside list-decimal space-y-2 text-(--charcoal)/80">
				<li>Tab to focus on any button</li>
				<li>
					Press <kbd class="rounded bg-white px-2 py-1 font-mono text-sm">Enter</kbd> or
					<kbd class="rounded bg-white px-2 py-1 font-mono text-sm">Space</kbd> to activate
				</li>
				<li>Toggle buttons announce state changes to screen readers</li>
			</ol>
		</div>
	</section>
</main>
