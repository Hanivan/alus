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
		},
		{
			title: 'Badge',
			description: 'Status indicator with ARIA live regions and variant support',
			href: '/components/badge',
			kanji: '章'
		},
		{
			title: 'Tag',
			description: 'Removable tag with dismiss button and keyboard support',
			href: '/components/tag',
			kanji: '標'
		},
		{
			title: 'Divider',
			description: 'Visual separator with horizontal and vertical orientations',
			href: '/components/divider',
			kanji: '線'
		},
		{
			title: 'Avatar',
			description: 'User avatar with image fallback to initials or placeholder',
			href: '/components/avatar',
			kanji: '顔'
		},
		{
			title: 'VisuallyHidden',
			description: 'Screen-reader only content, visually hidden but accessible',
			href: '/components/visually-hidden',
			kanji: '隠'
		},
		{
			title: 'Portal',
			description: 'Teleport content to document.body or any target element',
			href: '/components/portal',
			kanji: '門'
		},
		{
			title: 'FocusTrap',
			description: 'Trap keyboard focus within a container for modals and dialogs',
			href: '/components/focus-trap',
			kanji: '罠'
		},
		{
			title: 'Textarea',
			description: 'Multi-line text input with validation and accessibility',
			href: '/components/textarea',
			kanji: '文'
		},
		{
			title: 'Select',
			description: 'Native dropdown select with single/multiple selection',
			href: '/components/select',
			kanji: '択'
		},
		{
			title: 'Fieldset',
			description: 'Group related form fields with legend and accessibility',
			href: '/components/fieldset',
			kanji: '組'
		},
		{
			title: 'RadioGroup',
			description: 'Radio button group with shared name context and orientation',
			href: '/components/radio-group',
			kanji: '群'
		},
		{
			title: 'Form',
			description: 'Form wrapper with submit handling and ARIA labels',
			href: '/components/form',
			kanji: '式'
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
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-(--indigo-dye) focus:px-4 focus:py-2 focus:text-white"
>
	Skip to content
</a>

<main id="main">
	<!-- Hero Section -->
	<section class="relative mb-20 overflow-hidden">
		<!-- Background Pattern -->
		<div class="seigaiha-pattern absolute inset-0 opacity-30"></div>

		<div class="relative">
			<!-- Vertical Text -->
			<div class="absolute top-0 right-0 hidden lg:block">
				<div
					class="vertical-text font-display text-[8rem] leading-none font-light text-(--indigo-dye)/5"
				>
					美
				</div>
			</div>

			<div class="py-16 lg:py-24">
				<!-- Hanko Seal -->
				<div class="animate-fade-in-up mb-8">
					<div class="hanko-seal text-2xl">至</div>
				</div>

				<!-- Main Title -->
				<h1
					class="font-display animate-fade-in-up animation-delay-100 mb-6 text-5xl font-light text-(--ink) md:text-7xl lg:text-8xl"
				>
					Alus
				</h1>

				<!-- Subtitle -->
				<p
					class="animate-fade-in-up animation-delay-200 mb-4 text-xl text-(--charcoal)/70 md:text-2xl"
				>
					Accessible Svelte Components
				</p>

				<!-- Japanese Subtitle -->
				<p
					class="font-display animate-fade-in-up animation-delay-300 mb-12 text-lg text-(--bamboo)"
				>
					美しさと accessibility の調和
				</p>

				<!-- Feature Badges -->
				<div class="animate-fade-in-up animation-delay-400 flex flex-wrap gap-3">
					{#each features as feature}
						<div class="japanese-border bg-white/50 px-4 py-2 backdrop-blur-sm">
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
		<div class="mb-12 flex items-center gap-4">
			<div class="h-px flex-1 bg-linear-to-r from-transparent to-(--indigo-dye)/20"></div>
			<div>
				<h2 class="font-display text-center text-3xl text-(--ink) md:text-4xl">Components</h2>
				<p class="mt-1 text-center text-sm tracking-widest text-(--bamboo)">コンポーネント</p>
			</div>
			<div class="h-px flex-1 bg-linear-to-l from-transparent to-(--indigo-dye)/20"></div>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			{#each components as comp, index}
				<a
					href={comp.href}
					class="group japanese-border relative bg-white p-8 transition-all duration-300 hover:border-(--vermilion)"
					onmouseenter={() => (hoverCard = comp.title)}
					onmouseleave={() => (hoverCard = null)}
					style="animation: fadeInUp 0.6s ease-out {index * 0.1}s both;"
				>
					<!-- Hover Effect -->
					<div
						class="absolute inset-0 bg-(--indigo-dye)/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>

					<div class="relative">
						<!-- Kanji Character -->
						<div
							class="font-display absolute -top-4 -right-2 text-6xl text-(--indigo-dye)/10 transition-colors duration-300 group-hover:text-(--vermilion)/20"
						>
							{comp.kanji}
						</div>

						<!-- Title -->
						<h3
							class="font-display mb-3 text-2xl text-(--ink) transition-colors duration-300 group-hover:text-(--vermilion)"
						>
							{comp.title}
						</h3>

						<!-- Description -->
						<p class="mb-4 text-(--charcoal)/70">
							{comp.description}
						</p>

						<!-- Arrow Indicator -->
						<div
							class="flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 group-hover:text-(--vermilion)"
						>
							<span class="text-sm font-medium">Explore</span>
							<CaretRight
								class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
							/>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Philosophy Section -->
	<section class="mb-16">
		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8 md:p-12">
			<div class="grid items-center gap-12 md:grid-cols-2">
				<div>
					<h2 class="font-display mb-6 text-3xl text-(--ink) md:text-4xl">Philosophy</h2>
					<p class="mb-6 leading-relaxed text-(--charcoal)/70">
						Alus embodies the Japanese principle of <span class="font-display text-(--bamboo)"
							>間 (ma)</span
						> — the conscious use of negative space. Our components are unstyled canvases, allowing your
						creativity to flow freely while maintaining accessibility at their core.
					</p>
					<p class="leading-relaxed text-(--charcoal)/70">
						Each component is crafted with precision, inspired by traditional Japanese aesthetics
						where simplicity meets functionality.
					</p>
				</div>
				<div class="text-center">
					<div class="font-display text-[10rem] leading-none text-(--indigo-dye)/10">和</div>
					<p class="mt-4 text-sm tracking-widest text-(--bamboo)">HARMONY · PEACE · JAPAN</p>
				</div>
			</div>
		</div>
	</section>
</main>
