<script lang="ts">
	import { CaretLeft, DotsSixVertical } from 'phosphor-svelte';
	import { Sortable } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Sortable bind:items={tasks} getKey={(t) => t.id} aria-label="Tasks">
	{#snippet item({ value, grabbed, itemAttrs })}
		<li {...itemAttrs} class:grabbed>
			{value.label}
		</li>
	{/snippet}
</Sortable>`;

	let tasks = $state([
		{ id: 'a', label: 'Write the proposal', kanji: '書' },
		{ id: 'b', label: 'Brew tea', kanji: '茶' },
		{ id: 'c', label: 'Send the parcel', kanji: '送' },
		{ id: 'd', label: 'Review yesterday notes', kanji: '記' },
		{ id: 'e', label: 'Walk the garden path', kanji: '歩' }
	]);

	let tags = $state(['春', '夏', '秋', '冬']);
</script>

<svelte:head>
	<title>Sortable · Alus Components</title>
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
			<div class="hanko-seal">並</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Sortable</h1>
				<p class="tracking-widest text-(--bamboo)">順序</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Drag with pointer or use keyboard. Press <kbd
				class="rounded border border-(--charcoal)/20 bg-white px-1.5 py-0.5 text-xs">Space</kbd
			>
			to grab, arrows to move,
			<kbd class="rounded border border-(--charcoal)/20 bg-white px-1.5 py-0.5 text-xs">Space</kbd>
			to drop,
			<kbd class="rounded border border-(--charcoal)/20 bg-white px-1.5 py-0.5 text-xs">Esc</kbd> to cancel.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Vertical list</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Sortable
				bind:items={tasks}
				getKey={(t) => t.id}
				aria-label="Tasks"
				class="flex flex-col gap-3"
			>
				{#snippet item({ value, grabbed, isDragging, over, itemAttrs })}
					<li
						{...itemAttrs}
						class="flex cursor-grab items-center gap-4 rounded border border-(--charcoal)/15 bg-white px-4 py-3 transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-(--vermilion)"
						style={grabbed
							? 'background:var(--cherry-blossom);box-shadow:0 6px 16px rgba(0,0,0,0.12);'
							: isDragging
								? 'opacity:0.55;'
								: over
									? 'border-color:var(--indigo-dye);'
									: ''}
					>
						<DotsSixVertical class="h-5 w-5 text-(--charcoal)/40" />
						<span class="font-display text-(--bamboo)">{value.kanji}</span>
						<span class="text-(--ink)">{value.label}</span>
					</li>
				{/snippet}
			</Sortable>
		</div>

		<p class="mt-4 font-mono text-sm text-(--charcoal)/60">
			order: {tasks.map((t) => t.id).join(' · ')}
		</p>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Horizontal tags</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Sortable
				bind:items={tags}
				orientation="horizontal"
				aria-label="Seasons"
				class="flex flex-wrap gap-3"
			>
				{#snippet item({ value, grabbed, isDragging, over, itemAttrs })}
					<li
						{...itemAttrs}
						class="font-display flex h-12 min-w-12 cursor-grab items-center justify-center rounded-full border border-(--charcoal)/20 bg-white px-4 text-xl text-(--ink) outline-none focus-visible:ring-2 focus-visible:ring-(--vermilion)"
						style={grabbed
							? 'background:var(--matcha);color:white;'
							: isDragging
								? 'opacity:0.55;'
								: over
									? 'border-color:var(--vermilion);'
									: ''}
					>
						{value}
					</li>
				{/snippet}
			</Sortable>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'items', type: 'T[]', default: 'required', description: 'Bindable' },
			{
				name: 'getKey',
				type: '(item) => string | number',
				default: 'undefined',
				description: 'Stable key for keyed each'
			},
			{ name: 'orientation', type: "'vertical' | 'horizontal'", default: "'vertical'" },
			{
				name: 'item',
				type: 'Snippet<[{ value, grabbed, isDragging, over, itemAttrs }]>',
				default: 'required'
			},
			{ name: 'aria-label', type: 'string', default: 'required' }
		]}
		a11y={[
			'Each item is keyboard-grabbable: <code class="rounded bg-(--cream) px-1">Space</code> to grab, arrows to move, Space drops, Esc cancels',
			'<code class="rounded bg-(--cream) px-1">aria-grabbed</code> + <code class="rounded bg-(--cream) px-1">aria-dropeffect</code> reflect drag state',
			'Live region announces position changes ("moved item N to position M")',
			'Drag handle is the entire item — focusable with <code>tabindex</code>'
		]}
	/>
</main>
