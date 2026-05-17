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
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">標</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Tag</h1>
				<p class="tracking-widest text-(--bamboo)">タグ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			A removable tag/chip component with dismiss button and full keyboard support.
		</p>
	</header>

	<!-- Basic Tags -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Basic Tags</span>
			<span class="ml-2 text-lg text-(--bamboo)">基本タグ</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap gap-2">
				<Tag
					class="inline-flex items-center gap-1 rounded-full bg-(--indigo-dye)/10 px-3 py-1 text-sm text-(--indigo-dye)"
				>
					Design
				</Tag>
				<Tag
					class="inline-flex items-center gap-1 rounded-full bg-(--matcha)/10 px-3 py-1 text-sm text-(--matcha)"
				>
					Development
				</Tag>
				<Tag
					class="inline-flex items-center gap-1 rounded-full bg-(--vermilion)/10 px-3 py-1 text-sm text-(--vermilion)"
				>
					Marketing
				</Tag>
				<Tag
					class="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-600"
				>
					Business
				</Tag>
			</div>
		</div>
	</section>

	<!-- Removable Tags -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Removable Tags</span>
			<span class="ml-2 text-lg text-(--bamboo)">リムーバブル</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-wrap gap-2">
				{#each tags as tag (tag.id)}
					<Tag
						removable
						onremove={() => removeTag(tag.id)}
						class="group inline-flex items-center gap-1 rounded-full bg-(--indigo-dye)/10 px-3 py-1 text-sm text-(--indigo-dye)"
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
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Accessibility</span>
			<span class="ml-2 text-lg text-(--bamboo)">アクセシビリティ</span>
		</h2>

		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Semantic <code class="rounded bg-(--cream) px-1">&lt;span&gt;</code> with button for removal</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Remove button has <code class="rounded bg-(--cream) px-1">aria-label="Remove"</code
						></span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80">Keyboard accessible remove action</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80">Disabled state support</span>
				</li>
			</ul>
		</div>
	</section>
</main>
