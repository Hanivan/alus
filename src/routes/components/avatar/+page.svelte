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
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">顔</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Avatar</h1>
				<p class="tracking-widest text-(--bamboo)">アバター</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			An avatar component with image fallback to initials or placeholder.
		</p>
	</header>

	<!-- With Image -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>With Image</span>
			<span class="ml-2 text-lg text-(--bamboo)">画像あり</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap items-end gap-4">
				<Avatar
					src="https://i.pravatar.cc/150?img=1"
					alt="User avatar"
					size="xs"
					class="h-8 w-8 overflow-hidden rounded-full"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=2"
					alt="User avatar"
					size="sm"
					class="h-10 w-10 overflow-hidden rounded-full"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=3"
					alt="User avatar"
					size="md"
					class="h-12 w-12 overflow-hidden rounded-full"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=4"
					alt="User avatar"
					size="lg"
					class="h-16 w-16 overflow-hidden rounded-full"
				/>
				<Avatar
					src="https://i.pravatar.cc/150?img=5"
					alt="User avatar"
					size="xl"
					class="h-20 w-20 overflow-hidden rounded-full"
				/>
			</div>
		</div>
	</section>

	<!-- With Fallback -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>With Fallback</span>
			<span class="ml-2 text-lg text-(--bamboo)">フォールバック</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap gap-4">
				<Avatar
					fallback="Yuki Tanaka"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-(--indigo-dye)/10 font-semibold text-(--indigo-dye)"
					aria-label="Yuki Tanaka"
				/>
				<Avatar
					fallback="Sato"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-(--matcha)/10 font-semibold text-(--matcha)"
					aria-label="Sato"
				/>
				<Avatar
					fallback="Hanako Yamamoto"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-(--vermilion)/10 font-semibold text-(--vermilion)"
					aria-label="Hanako Yamamoto"
				/>
			</div>
		</div>
	</section>

	<!-- Broken Image Fallback -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Broken Image</span>
			<span class="ml-2 text-lg text-(--bamboo)">画像エラー</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap items-center gap-4">
				<Avatar
					src={brokenUrl}
					alt="Broken image"
					fallback="John Doe"
					class="flex h-12 w-12 items-center justify-center rounded-full bg-(--indigo-dye)/10 font-semibold text-(--indigo-dye)"
					aria-label="John Doe"
				/>
				<span class="text-sm text-(--charcoal)/60">Broken image falls back to initials</span>
			</div>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Accessibility</span>
			<span class="ml-2 text-lg text-(--bamboo)">アクセシビリティ</span>
		</h2>

		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						><code class="rounded bg-(--cream) px-1">aria-label</code> from
						<code class="rounded bg-(--cream) px-1">alt</code> prop or explicit label</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Image has <code class="rounded bg-(--cream) px-1">aria-hidden</code> to avoid double announcements</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Fallback text hidden from screen readers (visual only)</span
					>
				</li>
			</ul>
		</div>
	</section>
</main>
