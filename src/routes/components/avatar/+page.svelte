<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Avatar } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Avatar
	src="/u/yuki.jpg"
	alt="Yuki Tanaka"
	fallback="Yuki Tanaka"
	size="md"
/>`;

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

	<DemoFooter
		{code}
		props={[
			{
				name: 'src',
				type: 'string',
				default: 'undefined',
				description: 'Image URL — falls back if missing or broken'
			},
			{
				name: 'alt',
				type: 'string',
				default: 'undefined',
				description: 'Used for label + img alt'
			},
			{
				name: 'fallback',
				type: 'string',
				default: 'undefined',
				description: 'Shown when no image; auto-initialized from name'
			},
			{
				name: 'size',
				type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
				default: "'md'",
				description: 'Used as a data attr; sizing comes from class'
			},
			{
				name: 'aria-label',
				type: 'string',
				default: 'undefined',
				description: 'Overrides alt for SRs'
			}
		]}
		a11y={[
			'Root <code class="rounded bg-(--cream) px-1">&lt;span&gt;</code> uses the alt / aria-label as accessible name',
			'Inner <code class="rounded bg-(--cream) px-1">&lt;img&gt;</code> marked <code>aria-hidden</code> to avoid double announcement',
			'Fallback text is visual only — SRs read the avatar label, not the initials',
			'On broken image load, the component swaps to fallback without losing the accessible name'
		]}
	/>
</main>
