<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$components/Navbar.svelte';
	import Footer from '$components/Footer.svelte';

	const navLinks = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' },
		{ label: 'Components', href: '/components' },
		{ label: 'Docs', href: '/docs' }
	];

	const footerSections = [
		{
			title: 'Product',
			links: [
				{ label: 'Features', href: '/features' },
				{ label: 'Pricing', href: '/pricing' },
				{ label: 'Changelog', href: '/changelog' }
			]
		},
		{
			title: 'Resources',
			links: [
				{ label: 'Documentation', href: '/docs' },
				{ label: 'Examples', href: '/examples' },
				{ label: 'Blog', href: '/blog' }
			]
		},
		{
			title: 'Company',
			links: [
				{ label: 'About', href: '/about' },
				{ label: 'Careers', href: '/careers' },
				{ label: 'Contact', href: '/contact' }
			]
		}
	];

	const currentYear = new Date().getFullYear();
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen flex flex-col">
	<Navbar
		links={navLinks}
		class="flex items-center justify-between gap-4 px-4 py-4 border-b border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-800"
	>
		{#snippet brand()}
			<a href="/" class="flex items-center gap-2 font-bold text-xl text-gray-900 dark:text-white">
				<img src={favicon} alt="Logo" class="w-8 h-8" />
				<span>Alus</span>
			</a>
		{/snippet}

		{#snippet actions()}
			<div class="flex items-center gap-4">
				<button
					class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
				>
					Sign In
				</button>
				<button
					class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
				>
					Get Started
				</button>
			</div>
		{/snippet}
	</Navbar>

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer
		sections={footerSections}
		copyright={`&copy; ${currentYear} Alus UI. All rights reserved.`}
		class="border-t border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-800 mt-auto"
	>
		{#snippet additional()}
			<a href="/privacy" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Privacy Policy</a>
			<a href="/terms" class="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">Terms of Service</a>
		{/snippet}
	</Footer>
</div>
