<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Avatar } from 'alus';

	let brokenUrl = $state('https://invalid-url.example/avatar.jpg');
</script>

<svelte:head>
	<title>Avatar · Alus Components</title>
	<meta name="description" content="Accessible avatar component with fallback support" />
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
			<div class="hanko-seal">顔</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-(--ink) mb-2">Avatar</h1>
				<p class="text-(--bamboo) tracking-widest">アバター</p>
			</div>
		</div>
		<p class="text-xl text-(--charcoal)/70 max-w-2xl">
			An avatar component with image fallback to initials or placeholder.
		</p>
	</header>

	<!-- With Image -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>With Image</span>
			<span class="text-(--bamboo) text-lg ml-2">画像あり</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-4 items-end">
				<Avatar
					src="https://i.pravatar.cc/150?img=1"
					alt="User avatar"
					size="xs"
					class="w-8 h-8 rounded-full overflow-hidden"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=2"
					alt="User avatar"
					size="sm"
					class="w-10 h-10 rounded-full overflow-hidden"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=3"
					alt="User avatar"
					size="md"
					class="w-12 h-12 rounded-full overflow-hidden"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=4"
					alt="User avatar"
					size="lg"
					class="w-16 h-16 rounded-full overflow-hidden"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=5"
					alt="User avatar"
					size="xl"
					class="w-20 h-20 rounded-full overflow-hidden"
				/>
			</div>
		</div>
	</section>

	<!-- With Fallback -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>With Fallback</span>
			<span class="text-(--bamboo) text-lg ml-2">フォールバック</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-4">
				<Avatar
					fallback="Yuki Tanaka"
					class="w-12 h-12 rounded-full bg-(--indigo-dye)/10 flex items-center justify-center text-(--indigo-dye) font-semibold"
					aria-label="Yuki Tanaka"
				/>
				<Avatar
					fallback="Sato"
					class="w-12 h-12 rounded-full bg-(--matcha)/10 flex items-center justify-center text-(--matcha) font-semibold"
					aria-label="Sato"
				/>
				<Avatar
					fallback="Hanako Yamamoto"
					class="w-12 h-12 rounded-full bg-(--vermilion)/10 flex items-center justify-center text-(--vermilion) font-semibold"
					aria-label="Hanako Yamamoto"
				/>
			</div>
		</div>
	</section>

	<!-- Broken Image Fallback -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Broken Image</span>
			<span class="text-(--bamboo) text-lg ml-2">画像エラー</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-4 items-center">
				<Avatar
					src={brokenUrl}
					alt="Broken image"
					fallback="John Doe"
					class="w-12 h-12 rounded-full bg-(--indigo-dye)/10 flex items-center justify-center text-(--indigo-dye) font-semibold"
					aria-label="John Doe"
				/>
				<span class="text-sm text-(--charcoal)/60">Broken image falls back to initials</span>
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
					<span class="text-(--charcoal)/80"><code class="bg-(--cream) px-1 rounded">aria-label</code> from <code class="bg-(--cream) px-1 rounded">alt</code> prop or explicit label</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Image has <code class="bg-(--cream) px-1 rounded">aria-hidden</code> to avoid double announcements</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Fallback text hidden from screen readers (visual only)</span>
				</li>
			</ul>
		</div>
	</section>
</main>