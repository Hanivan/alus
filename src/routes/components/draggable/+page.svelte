<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Draggable, Droppable } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Droppable
	type="application/x-card"
	onDrop={({ data }) => moveCard(data.id, col)}
>
	{#each cards as card}
		<Draggable data={card} type="application/x-card">
			{card.title}
		</Draggable>
	{/each}
</Droppable>`;

	interface Card {
		id: number;
		title: string;
	}

	let cards = $state<Card[]>([
		{ id: 1, title: 'Design system' },
		{ id: 2, title: 'Launch playbook' },
		{ id: 3, title: 'Q3 retrospective' },
		{ id: 4, title: 'Onboarding flow' }
	]);

	type Status = 'todo' | 'doing' | 'done';
	let status = $state<Record<number, Status>>({ 1: 'todo', 2: 'todo', 3: 'doing', 4: 'done' });

	const cols: { id: Status; label: string }[] = [
		{ id: 'todo', label: 'To do' },
		{ id: 'doing', label: 'In progress' },
		{ id: 'done', label: 'Done' }
	];

	function inCol(s: Status) {
		return cards.filter((c) => status[c.id] === s);
	}
</script>

<svelte:head>
	<title>Draggable / Droppable · Alus Components</title>
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
			<div class="hanko-seal">掴</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Draggable + Droppable</h1>
				<p class="tracking-widest text-(--bamboo)">摘み入れ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			HTML5 drag-and-drop primitives. Pair <code>Draggable</code> with <code>Droppable</code> zones. Payload
			serialized as JSON via a custom MIME type.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Kanban</h2>
		<div class="japanese-border bg-white/50 p-6 backdrop-blur-sm">
			<div class="grid grid-cols-3 gap-4">
				{#each cols as col (col.id)}
					<Droppable
						type="application/x-card"
						onDrop={({ data }) => {
							if (data && typeof data === 'object' && 'id' in data) {
								status[(data as Card).id] = col.id;
							}
						}}
						class="rounded border border-dashed border-(--charcoal)/30 bg-white p-3 data-over:border-(--indigo-dye) data-over:bg-(--indigo-dye)/5"
					>
						<h3 class="mb-3 text-xs tracking-wider text-(--charcoal)/60 uppercase">{col.label}</h3>
						<div class="space-y-2">
							{#each inCol(col.id) as card (card.id)}
								<Draggable
									data={card}
									type="application/x-card"
									class="cursor-grab rounded border border-(--charcoal)/15 bg-white p-3 text-sm text-(--ink) shadow-sm data-dragging:opacity-40"
								>
									{card.title}
								</Draggable>
							{/each}
						</div>
					</Droppable>
				{/each}
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'data',
				type: 'unknown',
				default: 'required',
				description: '<code>Draggable</code> payload — serialized as JSON'
			},
			{
				name: 'type',
				type: 'string',
				default: "'application/json'",
				description: 'Custom MIME for matching'
			},
			{ name: 'onDragStart', type: '(e) => void', default: 'undefined' },
			{
				name: 'onDrop',
				type: '({ data, event }) => void',
				default: 'undefined',
				description: '<code>Droppable</code>'
			},
			{ name: 'accept', type: 'string[] | (type) => boolean', default: 'undefined' }
		]}
		a11y={[
			'HTML5 drag-and-drop is pointer-only — pair with keyboard alternatives (move buttons, context menu, or <code>Sortable</code> for lists)',
			'<code class="rounded bg-(--cream) px-1">data-dragging</code> + <code class="rounded bg-(--cream) px-1">data-over</code> attributes for styling state',
			'Drop targets must call <code>preventDefault</code> internally — handled by the component',
			"Provide visible drop-zone affordance — don't rely on hover alone"
		]}
	/>
</main>
