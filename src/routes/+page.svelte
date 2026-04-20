<script lang="ts">
	import {
		CheckCircle,
		ArrowRight,
		Keyboard,
		Eye,
		Palette,
		Code,
		Shield
	} from 'phosphor-svelte';

	interface ComponentCard {
		title: string;
		description: string;
		href: string;
		icon: typeof CheckCircle;
		iconColor: string;
		badge?: string;
	}

	const componentCards: ComponentCard[] = [
		{
			title: 'Button',
			description: 'Accessible button component with ARIA support, toggle states, and keyboard navigation',
			href: '/components/button',
			icon: CheckCircle,
			iconColor: 'text-green-600',
			badge: 'Available'
		},
		{
			title: 'Input',
			description: 'Text input component with validation, error states, and accessibility features',
			href: '/components/input',
			icon: Code,
			iconColor: 'text-blue-600',
			badge: 'Available'
		}
	];

	const featureCards = [
		{
			title: 'WCAG 2.1 AA Compliant',
			description: 'All components meet accessibility standards',
			icon: CheckCircle,
			color: 'text-green-600',
			bgColor: 'bg-green-50',
			borderColor: 'border-green-200'
		},
		{
			title: 'Full ARIA Support',
			description: 'aria-label, aria-labelledby, aria-describedby, and more',
			icon: Shield,
			color: 'text-blue-600',
			bgColor: 'bg-blue-50',
			borderColor: 'border-blue-200'
		},
		{
			title: 'Keyboard Navigation',
			description: 'Full keyboard support with visible focus indicators',
			icon: Keyboard,
			color: 'text-purple-600',
			bgColor: 'bg-purple-50',
			borderColor: 'border-purple-200'
		},
		{
			title: 'Screen Reader Support',
			description: 'Proper labels, descriptions, and live announcements',
			icon: Eye,
			color: 'text-orange-600',
			bgColor: 'bg-orange-50',
			borderColor: 'border-orange-200'
		},
		{
			title: 'Unstyled Components',
			description: 'Complete styling freedom with Tailwind CSS or any framework',
			icon: Palette,
			color: 'text-pink-600',
			bgColor: 'bg-pink-50',
			borderColor: 'border-pink-200'
		},
		{
			title: 'Svelte 5 Runes Mode',
			description: 'Modern reactive syntax with $props, $derived, $state',
			icon: Code,
			color: 'text-teal-600',
			bgColor: 'bg-teal-50',
			borderColor: 'border-teal-200'
		}
	];
</script>

<svelte:head>
	<title>Alus Component Library - Accessible Svelte 5 Components</title>
	<meta
		name="description"
		content="Unstyled, accessible Svelte 5 components with Tailwind CSS. WCAG 2.1 AA compliant."
	/>
</svelte:head>

<!-- Skip to main content link for keyboard users -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:font-semibold"
>
	Skip to main content
</a>

<!-- Main container -->
<main id="main-content" class="min-h-screen">
	<!-- Hero section -->
	<section
		aria-labelledby="hero-heading"
		class="relative bg-linear-to-br from-blue-50 to-indigo-100 border-b border-blue-200"
	>
		<div class="max-w-6xl mx-auto px-8 py-16">
			<div class="text-center">
				<h1
					id="hero-heading"
					class="text-4xl md:text-6xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-3"
				>
					<CheckCircle class="text-blue-600" weight="fill" />
					Alus Component Library
				</h1>
				<p class="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
					Unstyled, accessible Svelte 5 components with Tailwind CSS
				</p>
				<div class="flex flex-wrap gap-4 justify-center items-center mb-8">
					<div
						role="status"
						aria-live="polite"
						class="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm"
					>
						<Eye class="text-green-600" size={20} />
						<span>WCAG 2.1 AA Compliant</span>
					</div>
					<div
						role="status"
						aria-live="polite"
						class="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm"
					>
						<Keyboard class="text-purple-600" size={20} />
						<span>Keyboard Accessible</span>
					</div>
					<div
						role="status"
						aria-live="polite"
						class="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm"
					>
						<Palette class="text-pink-600" size={20} />
						<span>Unstyled & Flexible</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="max-w-6xl mx-auto px-8 py-12 space-y-16">
		<!-- Components Section -->
		<section aria-labelledby="components-heading">
			<div class="text-center mb-12">
				<h2
					id="components-heading"
					class="text-3xl font-bold text-gray-900 mb-4"
				>
					Available Components
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Explore our collection of accessible, unstyled UI components. Each component is
					designed with accessibility and flexibility in mind.
				</p>
			</div>

			<div class="grid md:grid-cols-2 gap-6">
				{#each componentCards as card}
					<a
						href={card.href}
						class="group block p-6 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all duration-200"
					>
						<div class="flex items-start gap-4">
							<div
								class="p-3 rounded-lg bg-gray-50 group-hover:bg-blue-50 transition-colors duration-200"
							>
								<card.icon
									class="{card.iconColor} group-hover:text-blue-600 transition-colors duration-200"
									size={32}
									weight="fill"
								/>
							</div>
							<div class="flex-1">
								<div class="flex items-center gap-2 mb-2">
									<h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
										{card.title}
									</h3>
									{#if card.badge}
										<span
											class="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full"
										>
											{card.badge}
										</span>
									{/if}
								</div>
								<p class="text-gray-600 mb-4">
									{card.description}
								</p>
								<div
									class="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all duration-200"
								>
									<span>View Component</span>
									<ArrowRight size={16} />
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- Features Section -->
		<section aria-labelledby="features-heading">
			<div class="text-center mb-12">
				<h2
					id="features-heading"
					class="text-3xl font-bold text-gray-900 mb-4"
				>
					Accessibility Features
				</h2>
				<p class="text-lg text-gray-600 max-w-2xl mx-auto">
					Every Alus component is built with accessibility as a core principle.
				</p>
			</div>

			<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each featureCards as feature}
					<div
						class="p-4 {feature.bgColor} border {feature.borderColor} rounded-lg flex items-start gap-3"
					>
						<feature.icon
							class="{feature.color} shrink-0 mt-0.5"
							size={24}
							weight="fill"
						/>
						<div>
							<h3 class="font-semibold {feature.color.replace('text-', 'text-').replace('600', '900')}">
								{feature.title}
							</h3>
							<p class="text-sm {feature.color.replace('text-', 'text-').replace('600', '800')} mt-1">
								{feature.description}
							</p>
						</div>
					</div>
				{/each}
			</div>
		</section>
	</div>

	<!-- Footer -->
	<footer class="mt-16 border-t border-gray-200 bg-gray-50">
		<div class="max-w-6xl mx-auto px-8 py-8 text-center">
			<p class="text-gray-600 mb-2">
				Built with <strong>Svelte 5</strong> + <strong>Tailwind CSS</strong> +
				<strong>Phosphor Icons</strong> + <strong>WCAG Compliance</strong>
			</p>
			<p class="text-sm text-gray-500">
				All components are unstyled and fully accessible
			</p>
		</div>
	</footer>
</main>
