<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Badge } from 'alus';
</script>

<svelte:head>
	<title>Badge · Alus Components</title>
	<meta name="description" content="Accessible badge component with ARIA support for status indicators" />
</svelte:head>

<a
	href="/"
	class="inline-flex items-center gap-2 text-(--indigo-dye) hover:text-(--vermilion) transition-colors duration-300 mb-8"
>
	<CaretLeft class="w-5 h-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="flex items-center gap-6 mb-6">
			<div class="hanko-seal">章</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-(--ink) mb-2">Badge</h1>
				<p class="text-(--bamboo) tracking-widest">バッジ</p>
			</div>
		</div>
		<p class="text-xl text-(--charcoal)/70 max-w-2xl">
			An accessible badge for status indicators, counts, and labels with full ARIA support.
		</p>
	</header>

	<!-- Variants -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Variants</span>
			<span class="text-(--bamboo) text-lg ml-2">バリアント</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-4 items-center">
				<Badge
					class="px-3 py-1 bg-(--indigo-dye)/10 text-(--indigo-dye) font-medium text-sm rounded"
				>
					Default
				</Badge>
				<Badge
					variant="success"
					class="px-3 py-1 bg-(--matcha)/10 text-(--matcha) font-medium text-sm rounded"
				>
					Success
				</Badge>
				<Badge
					variant="warning"
					class="px-3 py-1 bg-amber-500/10 text-amber-600 font-medium text-sm rounded"
				>
					Warning
				</Badge>
				<Badge
					variant="error"
					class="px-3 py-1 bg-(--vermilion)/10 text-(--vermilion) font-medium text-sm rounded"
				>
					Error
				</Badge>
				<Badge
					variant="info"
					class="px-3 py-1 bg-sky-500/10 text-sky-600 font-medium text-sm rounded"
				>
					Info
				</Badge>
			</div>
		</div>
	</section>

	<!-- With Counts -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Count Badges</span>
			<span class="text-(--bamboo) text-lg ml-2">カウント</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-6 items-center">
				<!-- Notification count -->
				<div class="relative">
					<div class="w-10 h-10 rounded-full bg-(--indigo-dye)/10 flex items-center justify-center text-(--indigo-dye)">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"><path d="M221.8 175.94c-5.55-9.56-13.8-36.61-13.8-71.94a80 80 0 1 0-160 0c0 35.34-8.26 62.38-13.81 71.94A16 16 0 0 0 48 200h40.81a40 40 0 0 0 78.38 0H208a16 16 0 0 0 13.8-24.06ZM128 216a24 24 0 0 1-22.62-16h45.24A24 24 0 0 1 128 216Z"/></svg>
					</div>
					<Badge
						variant="error"
						class="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-(--vermilion) text-white text-xs font-bold rounded-full"
						aria-label="3 unread notifications"
						aria-live="polite"
					>
						3
					</Badge>
				</div>

			<!-- Simple count badge -->
				<Badge
					variant="success"
					class="px-2 py-0.5 bg-(--matcha) text-white text-xs font-bold rounded-full"
					aria-label="12 items completed"
				>
					12
				</Badge>
			</div>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Accessibility</span>
			<span class="text-(--bamboo) text-lg ml-2">アクセシビリティ</span>
		</h2>

		<div class="japanese-border p-8 bg-linear-to-br from-white to-(--cream)">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Semantic <code class="bg-(--cream) px-1 rounded">&lt;span&gt;</code> element</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">ARIA live regions for dynamic content</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Configurable <code class="bg-(--cream) px-1 rounded">aria-label</code> for screen readers</span>
				</li>
			</ul>
		</div>
	</section>
</main>
