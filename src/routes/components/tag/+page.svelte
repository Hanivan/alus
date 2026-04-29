<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Tag } from 'alus';

	let tags = $state([
		{ id: '1', label: 'React' },
		{ id: '2', label: 'Svelte' },
		{ id: '3', label: 'Vue' },
		{ id: '4', label: 'Angular' }
	]);

	function removeTag(id: string) {
		tags = tags.filter((t) => t.id !== id);
	}
</script>

<svelte:head>
	<title>Tag · Alus Components</title>
	<meta name="description" content="Accessible tag component with remove button support" />
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
			<div class="hanko-seal">標</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-(--ink) mb-2">Tag</h1>
				<p class="text-(--bamboo) tracking-widest">タグ</p>
			</div>
		</div>
		<p class="text-xl text-(--charcoal)/70 max-w-2xl">
			A removable tag/chip component with dismiss button and full keyboard support.
		</p>
	</header>

	<!-- Basic Tags -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Basic Tags</span>
			<span class="text-(--bamboo) text-lg ml-2">基本タグ</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-2">
				<Tag
					class="inline-flex items-center gap-1 px-3 py-1 bg-(--indigo-dye)/10 text-(--indigo-dye) text-sm rounded-full"
				>
					Design
				</Tag>
				<Tag
					class="inline-flex items-center gap-1 px-3 py-1 bg-(--matcha)/10 text-(--matcha) text-sm rounded-full"
				>
					Development
				</Tag>
				<Tag
					class="inline-flex items-center gap-1 px-3 py-1 bg-(--vermilion)/10 text-(--vermilion) text-sm rounded-full"
				>
					Marketing
				</Tag>
				<Tag
					class="inline-flex items-center gap-1 px-3 py-1 bg-amber-500/10 text-amber-600 text-sm rounded-full"
				>
					Business
				</Tag>
			</div>
		</div>
	</section>

	<!-- Removable Tags -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Removable Tags</span>
			<span class="text-(--bamboo) text-lg ml-2">リムーバブル</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="flex flex-wrap gap-2">
				{#each tags as tag (tag.id)}
					<Tag
						removable
						onremove={() => removeTag(tag.id)}
						class="inline-flex items-center gap-1 px-3 py-1 bg-(--indigo-dye)/10 text-(--indigo-dye) text-sm rounded-full group"
						aria-label="{tag.label} tag"
					>
						{tag.label}
					</Tag>
				{/each}
				{#if tags.length === 0}
					<p class="text-sm text-(--charcoal)/60 italic">All tags removed. Refresh to reset.</p>
				{/if}
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
					<span class="text-(--charcoal)/80">Semantic <code class="bg-(--cream) px-1 rounded">&lt;span&gt;</code> with button for removal</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Remove button has <code class="bg-(--cream) px-1 rounded">aria-label="Remove"</code></span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Keyboard accessible remove action</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Disabled state support</span>
				</li>
			</ul>
		</div>
	</section>
</main>
