<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="paper-texture min-h-screen bg-(--paper-white)">
	<!-- Minimal Header -->
	<header class="border-b border-(--indigo-dye)/10 bg-white/50 backdrop-blur-sm">
		<div class="mx-auto max-w-6xl px-6 py-4">
			<a href="/" class="group inline-flex items-center gap-3">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-full bg-(--indigo-dye) transition-colors duration-300 group-hover:bg-(--vermilion)"
				>
					<span class="font-display text-xl font-bold text-white">阿</span>
				</div>
				<div>
					<h1 class="font-display text-2xl font-semibold text-(--ink)">Alus</h1>
					<p class="text-xs tracking-widest text-(--bamboo)">ACCESSIBLE COMPONENTS</p>
				</div>
			</a>
		</div>
	</header>

	<main class="mx-auto max-w-6xl px-6 py-12">
		{@render children()}
	</main>

	<!-- Minimal Footer -->
	<footer class="mt-20 border-t border-(--indigo-dye)/10 py-8">
		<div class="mx-auto max-w-6xl px-6 text-center">
			<div class="hanko-seal mb-4">至</div>
			<p class="text-sm text-(--charcoal)/70">
				Handcrafted with precision · Svelte 5 · Accessibility First
			</p>
		</div>
	</footer>
</div>
