<script lang="ts">
	import { CaretRight } from 'phosphor-svelte';

	let hoverCard = $state<string | null>(null);

	interface ComponentCard {
		title: string;
		description: string;
		href: string;
		kanji: string;
	}

	const components: ComponentCard[] = [
		{
			title: 'Button',
			description: 'Accessible button with ARIA support and toggle states',
			href: '/components/button',
			kanji: 'ボタン'
		},
		{
			title: 'Input',
			description: 'Text input with validation, error states, and accessibility',
			href: '/components/input',
			kanji: '入力'
		},
		{
			title: 'Checkbox',
			description: 'Checkbox with indeterminate state and proper ARIA support',
			href: '/components/checkbox',
			kanji: 'チェック'
		},
		{
			title: 'Radio',
			description: 'Radio button with keyboard navigation and accessibility',
			href: '/components/radio',
			kanji: '選択'
		}
	];

	const features = [
		{ title: 'Accessibility', kanji: 'アクセシビリティ', desc: 'WCAG 2.1 AA compliant' },
		{ title: 'Unstyled', kanji: '自由', desc: 'Complete styling freedom' },
		{ title: 'Keyboard', kanji: 'キーボード', desc: 'Full navigation support' },
		{ title: 'Svelte 5', kanji: '最新', desc: 'Modern runes mode' }
	];
</script>

<svelte:head>
	<title>Alus · Accessible Svelte 5 Components</title>
	<meta
		name="description"
		content="Unstyled, accessible Svelte 5 components. WCAG 2.1 AA compliant with traditional Japanese aesthetic."
	/>
</svelte:head>

<a
	href="#main"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-(--indigo-dye) focus:text-white focus:rounded"
>
	Skip to content
</a>

<main id="main">
	<!-- Hero Section -->
	<section class="mb-20 relative overflow-hidden">
		<!-- Background Pattern -->
		<div class="absolute inset-0 seigaiha-pattern opacity-30"></div>

		<div class="relative">
			<!-- Vertical Text -->
			<div class="absolute right-0 top-0 hidden lg:block">
				<div class="vertical-text font-display text-[8rem] font-light text-(--indigo-dye)/5 leading-none">
					美
				</div>
			</div>

			<div class="py-16 lg:py-24">
				<!-- Hanko Seal -->
				<div class="mb-8 animate-fade-in-up">
					<div class="hanko-seal text-2xl">至</div>
				</div>

				<!-- Main Title -->
				<h1 class="font-display text-5xl md:text-7xl lg:text-8xl font-light text-(--ink) mb-6 animate-fade-in-up animation-delay-100">
					Alus
				</h1>

				<!-- Subtitle -->
				<p class="text-xl md:text-2xl text-(--charcoal)/70 mb-4 animate-fade-in-up animation-delay-200">
					Accessible Svelte Components
				</p>

				<!-- Japanese Subtitle -->
				<p class="font-display text-lg text-(--bamboo) mb-12 animate-fade-in-up animation-delay-300">
					美しさと accessibility の調和
				</p>

				<!-- Feature Badges -->
				<div class="flex flex-wrap gap-3 animate-fade-in-up animation-delay-400">
					{#each features as feature}
						<div class="japanese-border px-4 py-2 bg-white/50 backdrop-blur-sm">
							<span class="text-sm text-(--charcoal)/80">
								<span class="font-display text-(--bamboo)">{feature.kanji}</span>
								<span class="mx-2">·</span>
								{feature.desc}
							</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</section>

	<!-- Components Section -->
	<section class="mb-20">
		<div class="flex items-center gap-4 mb-12">
			<div class="h-px flex-1 bg-linear-to-r from-transparent to-(--indigo-dye)/20"></div>
			<div>
				<h2 class="font-display text-3xl md:text-4xl text-center text-(--ink)">Components</h2>
				<p class="text-sm text-(--bamboo) text-center tracking-widest mt-1">コンポーネント</p>
			</div>
			<div class="h-px flex-1 bg-linear-to-l from-transparent to-(--indigo-dye)/20"></div>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			{#each components as comp, index}
				<a
					href={comp.href}
					class="group relative p-8 bg-white japanese-border hover:border-(--vermilion) transition-all duration-300"
					onmouseenter={() => hoverCard = comp.title}
					onmouseleave={() => hoverCard = null}
					style="animation: fadeInUp 0.6s ease-out {index * 0.1}s both;"
				>
					<!-- Hover Effect -->
					<div class="absolute inset-0 bg-(--indigo-dye)/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

					<div class="relative">
						<!-- Kanji Character -->
						<div class="font-display text-6xl text-(--indigo-dye)/10 absolute -top-4 -right-2 group-hover:text-(--vermilion)/20 transition-colors duration-300">
							{comp.kanji}
						</div>

						<!-- Title -->
						<h3 class="font-display text-2xl text-(--ink) mb-3 group-hover:text-(--vermilion) transition-colors duration-300">
							{comp.title}
						</h3>

						<!-- Description -->
						<p class="text-(--charcoal)/70 mb-4">
							{comp.description}
						</p>

						<!-- Arrow Indicator -->
						<div class="flex items-center gap-2 text-(--indigo-dye) group-hover:text-(--vermilion) transition-colors duration-300">
							<span class="text-sm font-medium">Explore</span>
							<CaretRight class="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Philosophy Section -->
	<section class="mb-16">
		<div class="japanese-border p-8 md:p-12 bg-linear-to-br from-white to-(--cream)">
			<div class="grid md:grid-cols-2 gap-12 items-center">
				<div>
					<h2 class="font-display text-3xl md:text-4xl text-(--ink) mb-6">
						Philosophy
					</h2>
					<p class="text-(--charcoal)/70 leading-relaxed mb-6">
						Alus embodies the Japanese principle of <span class="font-display text-(--bamboo)">間 (ma)</span> —
						the conscious use of negative space. Our components are unstyled canvases,
						allowing your creativity to flow freely while maintaining accessibility at their core.
					</p>
					<p class="text-(--charcoal)/70 leading-relaxed">
						Each component is crafted with precision, inspired by traditional Japanese aesthetics
						where simplicity meets functionality.
					</p>
				</div>
				<div class="text-center">
					<div class="font-display text-[10rem] text-(--indigo-dye)/10 leading-none">和</div>
					<p class="text-sm text-(--bamboo) tracking-widest mt-4">HARMONY · PEACE · JAPAN</p>
				</div>
			</div>
		</div>
	</section>
</main>
