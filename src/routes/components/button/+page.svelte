<script lang="ts">
	import { Button } from 'alus';

	let subscribed = $state(false);
	let disabled = $state(false);
</script>

<svelte:head>
	<title>Button · Alus Components</title>
	<meta name="description" content="Accessible button component with ARIA support and toggle states" />
</svelte:head>

<a
	href="/"
	class="inline-flex items-center gap-2 text-[var(--indigo-dye)] hover:text-[var(--vermilion)] transition-colors duration-300 mb-8"
>
	<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
	</svg>
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="flex items-center gap-6 mb-6">
			<div class="hanko-seal">ボ</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-[var(--ink)] mb-2">Button</h1>
				<p class="text-[var(--bamboo)] tracking-widest">ボタン</p>
			</div>
		</div>
		<p class="text-xl text-[var(--charcoal)]/70 max-w-2xl">
			An accessible button with full ARIA support, toggle states, and keyboard navigation.
		</p>
	</header>

	<!-- Basic Buttons -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Basic Buttons</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">基本的なボタン</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-4">
				<Button
					type='button'
					class="px-6 py-3 bg-[var(--indigo-dye)] text-white font-medium rounded hover:bg-[var(--vermilion)] transition-all duration-300"
					aria-label="Primary action"
				>
					Primary
				</Button>
				<Button
					type='button'
					class="px-6 py-3 bg-[var(--charcoal)] text-white font-medium rounded hover:bg-[var(--bamboo)] transition-all duration-300"
					aria-label="Secondary action"
				>
					Secondary
				</Button>
				<Button
					type='button'
					class="px-6 py-3 border-2 border-[var(--indigo-dye)] text-[var(--indigo-dye)] font-medium rounded hover:bg-[var(--indigo-dye)] hover:text-white transition-all duration-300"
					aria-label="Outline action"
				>
					Outline
				</Button>
				<Button
					type='button'
					class="px-6 py-3 bg-[var(--matcha)] text-white font-medium rounded opacity-50 cursor-not-allowed"
					disabled={disabled}
					onclick={() => disabled = !disabled}
					aria-label="Toggle disabled"
				>
					{disabled ? 'Disabled' : 'Toggle'}
				</Button>
			</div>
		</div>
	</section>

	<!-- Toggle Button -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Toggle Button</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">トグルボタン</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap items-center gap-6">
				<Button
					type='button'
					class="px-6 py-3 font-medium rounded transition-all duration-300 {
						subscribed
							? 'bg-[var(--vermilion)] text-white'
							: 'bg-[var(--charcoal)]/10 text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white'
					}"
					aria-pressed={subscribed}
					onclick={() => subscribed = !subscribed}
				>
					{subscribed ? 'Subscribed' : 'Subscribe'}
				</Button>

				<div
					role="status"
					aria-live="polite"
					class="px-4 py-2 bg-[var(--cream)] border border-[var(--indigo-dye)]/10 rounded text-sm"
				>
					Status: <span class="font-medium text-[var(--indigo-dye)]">{subscribed ? 'Subscribed' : 'Not subscribed'}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Props Reference -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Props</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">プロパティ</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm overflow-x-auto">
			<table class="w-full text-left">
				<thead>
					<tr class="border-b border-[var(--indigo-dye)]/20">
						<th class="py-3 px-4 font-semibold text-[var(--ink)]">Prop</th>
						<th class="py-3 px-4 font-semibold text-[var(--ink)]">Type</th>
						<th class="py-3 px-4 font-semibold text-[var(--ink)]">Default</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">type</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">'button' | 'submit' | 'reset'</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">'button'</code></td>
					</tr>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">disabled</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">false</code></td>
					</tr>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">aria-pressed</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">undefined</code></td>
					</tr>
					<tr>
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">class</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">''</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Accessibility</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">アクセシビリティ</span>
		</h2>

		<div class="japanese-border p-8 bg-gradient-to-br from-white to-[var(--cream)]">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Semantic HTML with native <code class="bg-[var(--cream)] px-1 rounded">&lt;button&gt;</code> element</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Full ARIA support (aria-label, aria-pressed, aria-describedby)</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Keyboard navigation with Enter and Space keys</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Visible focus indicators for keyboard users</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Screen reader announcements for state changes</span>
				</li>
			</ul>
		</div>
	</section>

	<!-- Keyboard Testing -->
	<section>
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Keyboard Testing</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">キーボードテスト</span>
		</h2>

		<div class="japanese-border p-8 bg-[var(--indigo-dye)]/5">
			<h3 class="font-semibold text-[var(--ink)] mb-4">Test keyboard navigation:</h3>
			<ol class="list-decimal list-inside space-y-2 text-[var(--charcoal)]/80">
				<li>Tab to focus on any button</li>
				<li>Press <kbd class="px-2 py-1 bg-white rounded text-sm font-mono">Enter</kbd> or <kbd class="px-2 py-1 bg-white rounded text-sm font-mono">Space</kbd> to activate</li>
				<li>Toggle buttons announce state changes to screen readers</li>
			</ol>
		</div>
	</section>
</main>
