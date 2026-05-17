<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Label, Input } from 'alus';
</script>

<svelte:head>
	<title>Label · Alus Components</title>
</svelte:head>

<a
	href="/"
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">札</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Label</h1>
				<p class="tracking-widest text-(--bamboo)">ラベル</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Form label with for-association and optional required indicator.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Basic</span>
			<span class="ml-2 text-lg text-(--bamboo)">基本</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<Label for="username" class="block text-sm font-medium text-(--charcoal)">Username</Label>
			<Input
				id="username"
				class="w-full border border-(--indigo-dye)/20 bg-white p-2 focus:border-(--vermilion)"
			/>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Required</span>
			<span class="ml-2 text-lg text-(--bamboo)">必須</span>
		</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<Label for="email" required class="block text-sm font-medium text-(--charcoal)">Email</Label>
			<Input
				id="email"
				type="email"
				required
				class="w-full border border-(--indigo-dye)/20 bg-white p-2 focus:border-(--vermilion)"
			/>
		</div>
	</section>
</main>
