<script lang="ts">
	import { CaretLeft, CaretUp, CaretDown } from 'phosphor-svelte';
	import {
		Table,
		TableCaption,
		TableHead,
		TableBody,
		TableFoot,
		TableRow,
		TableHeader,
		TableCell
	} from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Table>
	<TableCaption>Team scoreboard</TableCaption>
	<TableHead>
		<TableRow>
			<TableHeader scope="col" sort="ascending">Name</TableHeader>
			<TableHeader scope="col">Score</TableHeader>
		</TableRow>
	</TableHead>
	<TableBody>
		<TableRow>
			<TableHeader scope="row">Akira</TableHeader>
			<TableCell>92</TableCell>
		</TableRow>
	</TableBody>
</Table>`;

	interface Row {
		id: number;
		name: string;
		role: string;
		score: number;
	}

	let rows: Row[] = [
		{ id: 1, name: 'Akira', role: 'Engineer', score: 92 },
		{ id: 2, name: 'Hana', role: 'Designer', score: 88 },
		{ id: 3, name: 'Ren', role: 'Manager', score: 95 },
		{ id: 4, name: 'Yuki', role: 'Engineer', score: 76 }
	];

	let sortKey = $state<'name' | 'role' | 'score'>('name');
	let sortDir = $state<'ascending' | 'descending'>('ascending');

	let sorted = $derived(
		[...rows].sort((a, b) => {
			const av = a[sortKey];
			const bv = b[sortKey];
			const cmp =
				typeof av === 'number' ? av - (bv as number) : String(av).localeCompare(String(bv));
			return sortDir === 'ascending' ? cmp : -cmp;
		})
	);

	function toggleSort(key: 'name' | 'role' | 'score') {
		if (sortKey === key) sortDir = sortDir === 'ascending' ? 'descending' : 'ascending';
		else {
			sortKey = key;
			sortDir = 'ascending';
		}
	}
</script>

<svelte:head>
	<title>Table · Alus Components</title>
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
			<div class="hanko-seal">表</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Table</h1>
				<p class="tracking-widest text-(--bamboo)">表</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantic table with scope, aria-sort, caption, headers, rows, and cells.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Sortable</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Table class="w-full border-collapse text-left">
				<TableCaption class="mb-3 text-sm text-(--charcoal)/60">
					Team performance scoreboard
				</TableCaption>
				<TableHead>
					<TableRow>
						{#each [{ k: 'name', label: 'Name' }, { k: 'role', label: 'Role' }, { k: 'score', label: 'Score' }] as col (col.k)}
							<TableHeader
								scope="col"
								sort={sortKey === col.k ? sortDir : 'none'}
								class="border-b border-(--indigo-dye)/30 px-3 py-2 font-medium text-(--ink)"
							>
								<button
									type="button"
									class="inline-flex items-center gap-1 hover:text-(--vermilion)"
									onclick={() => toggleSort(col.k as 'name' | 'role' | 'score')}
								>
									{col.label}
									{#if sortKey === col.k}
										{#if sortDir === 'ascending'}
											<CaretUp class="h-3 w-3" />
										{:else}
											<CaretDown class="h-3 w-3" />
										{/if}
									{/if}
								</button>
							</TableHeader>
						{/each}
					</TableRow>
				</TableHead>
				<TableBody>
					{#each sorted as r (r.id)}
						<TableRow class="border-b border-(--indigo-dye)/10 hover:bg-(--cream)">
							<TableHeader scope="row" class="px-3 py-2 font-normal">{r.name}</TableHeader>
							<TableCell class="px-3 py-2 text-(--charcoal)/70">{r.role}</TableCell>
							<TableCell class="px-3 py-2 font-mono text-(--vermilion)">{r.score}</TableCell>
						</TableRow>
					{/each}
				</TableBody>
				<TableFoot>
					<TableRow>
						<TableHeader scope="row" class="px-3 py-2 text-(--bamboo)">Average</TableHeader>
						<TableCell class="px-3 py-2"></TableCell>
						<TableCell class="px-3 py-2 font-mono text-(--bamboo)">
							{(rows.reduce((s, r) => s + r.score, 0) / rows.length).toFixed(1)}
						</TableCell>
					</TableRow>
				</TableFoot>
			</Table>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'scope',
				type: "'col' | 'row' | 'colgroup' | 'rowgroup'",
				default: 'undefined',
				description: '<code>TableHeader</code>'
			},
			{
				name: 'sort',
				type: "'ascending' | 'descending' | 'none' | 'other'",
				default: 'undefined',
				description: 'Sets aria-sort'
			},
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;table&gt;</code>, <code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code> — full table semantics',
			'<code class="rounded bg-(--cream) px-1">scope</code> wires headers to their data cells for SR reading',
			'<code class="rounded bg-(--cream) px-1">aria-sort</code> announces sort state on sortable columns',
			'<code class="rounded bg-(--cream) px-1">TableCaption</code> provides the table\'s accessible name'
		]}
	/>
</main>
