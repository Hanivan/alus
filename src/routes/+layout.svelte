<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen bg-(--paper-white) paper-texture">
	<!-- Minimal Header -->
	<header class="border-b border-(--indigo-dye)/10 bg-white/50 backdrop-blur-sm">
		<div class="max-w-6xl mx-auto px-6 py-4">
			<a href="/" class="inline-flex items-center gap-3 group">
				<div class="w-10 h-10 rounded-full bg-(--indigo-dye) flex items-center justify-center group-hover:bg-(--vermilion) transition-colors duration-300">
					<span class="text-white font-display font-bold text-xl">阿</span>
				</div>
				<div>
					<h1 class="font-display text-2xl font-semibold text-(--ink)">Alus</h1>
					<p class="text-xs text-(--bamboo) tracking-widest">ACCESSIBLE COMPONENTS</p>
				</div>
			</a>
		</div>
	</header>

	<main class="max-w-6xl mx-auto px-6 py-12">
		{@render children()}
	</main>

	<!-- Minimal Footer -->
	<footer class="mt-20 border-t border-(--indigo-dye)/10 py-8">
		<div class="max-w-6xl mx-auto px-6 text-center">
			<div class="hanko-seal mb-4">至</div>
			<p class="text-sm text-(--charcoal)/70">
				Handcrafted with precision · Svelte 5 · Accessibility First
			</p>
		</div>
	</footer>
</div>
