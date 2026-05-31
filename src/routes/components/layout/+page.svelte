<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft } from 'phosphor-svelte';
	import { Stack, Flex, Grid, Container, Spacer, Columns } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Stack gap="1rem">
	<Flex justify="between" align="center" gap="1rem">
		<span>Logo</span>
		<Spacer />
		<span>Profile</span>
	</Flex>
	<Grid cols={3} gap="0.75rem">
		<div>a</div><div>b</div><div>c</div>
	</Grid>
	<Container maxWidth="md" padding="1.5rem">centered</Container>
	<Columns count={2} gap="2rem">…</Columns>
</Stack>`;

	const tiles = Array.from({ length: 8 }, (_, i) => i + 1);
	const paragraphs = [
		'In old Edo, paper lanterns hung from every eave, glowing through summer rain.',
		'The carpenter shaped beams with a single chisel, listening for hollow notes.',
		'Tea bowls held warmth long after the steam had drifted into morning fog.',
		'Cherry petals fell on still water, drifting where unseen currents carried them.',
		'A stone garden teaches patience: rake, pause, rake again.',
		'Lacquered black, brushed gold — the box held nothing but quiet.'
	];

	const card =
		'flex items-center justify-center rounded border border-(--charcoal)/15 bg-white text-(--ink) font-display';
</script>

<svelte:head>
	<title>Layout Primitives · Alus Components</title>
</svelte:head>

<a
	href={resolve('/')}
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">構</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Layout</h1>
				<p class="tracking-widest text-(--bamboo)">配置</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Six structure primitives: <code>Stack</code>, <code>Flex</code>, <code>Grid</code>,
			<code>Container</code>, <code>Spacer</code>, <code>Columns</code>. Props map directly to CSS —
			they emit inline styles, no opinion on visuals.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Stack — vertical</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Stack gap="0.75rem" align="stretch">
				{#each tiles.slice(0, 4) as n, i (i)}
					<div class="{card} h-12">{n}</div>
				{/each}
			</Stack>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Stack — horizontal with wrap</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Stack direction="horizontal" gap="0.5rem" wrap>
				{#each tiles as n, i (i)}
					<div class="{card} h-12 w-24">{n}</div>
				{/each}
			</Stack>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">
			Flex — justify between, gap, align center
		</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Flex justify="between" align="center" gap="1rem">
				<div class="{card} h-12 w-16">左</div>
				<div class="{card} h-16 w-16">中</div>
				<div class="{card} h-12 w-16">右</div>
			</Flex>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Spacer — push to ends</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Flex align="center" gap="0.5rem">
				<div class="{card} h-10 px-3">Logo</div>
				<Spacer />
				<div class="{card} h-10 px-3">Search</div>
				<Spacer size="2rem" axis="horizontal" />
				<div class="{card} h-10 px-3">Profile</div>
			</Flex>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Grid — fixed columns</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Grid cols={4} gap="0.75rem">
				{#each tiles as n, i (i)}
					<div class="{card} h-20">{n}</div>
				{/each}
			</Grid>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Grid — auto-fill with minColWidth</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Grid minColWidth="140px" gap="0.75rem">
				{#each tiles as n, i (i)}
					<div class="{card} h-20">{n}</div>
				{/each}
			</Grid>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Container — max-width md, centered</h2>
		<div class="japanese-border bg-white/50 p-6 backdrop-blur-sm">
			<Container
				maxWidth="md"
				padding="1.5rem"
				class="rounded border border-dashed border-(--charcoal)/30 bg-white"
			>
				<p class="text-(--ink)">
					This container caps at <code>768px</code> and centers itself with auto margins. Use
					<code>maxWidth="full"</code> or pass a raw value like <code>"900px"</code> to override.
				</p>
			</Container>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Columns — multi-column text flow</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Columns count={3} gap="2rem" class="text-sm text-(--charcoal)/80">
				{#each paragraphs as p, i (i)}
					<p class="mb-3" style={i === 0 ? '' : 'break-inside:avoid;'}>{p}</p>
				{/each}
			</Columns>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'gap',
				type: 'string',
				default: "'0'",
				description:
					'<code>Stack</code> / <code>Flex</code> / <code>Grid</code> / <code>Columns</code>'
			},
			{
				name: 'direction',
				type: "'vertical' | 'horizontal'",
				default: "'vertical'",
				description: '<code>Stack</code>'
			},
			{
				name: 'justify / align',
				type: "'start' | 'center' | 'end' | 'between' | 'around' | 'stretch'",
				default: 'undefined',
				description: '<code>Flex</code>'
			},
			{
				name: 'cols / minColWidth',
				type: 'number | string',
				default: 'undefined',
				description: '<code>Grid</code>'
			},
			{
				name: 'maxWidth',
				type: "'sm' | 'md' | 'lg' | 'xl' | 'full' | string",
				default: "'full'",
				description: '<code>Container</code>'
			},
			{
				name: 'size / axis',
				type: "string | 'horizontal' | 'vertical'",
				default: "'1' / 'auto'",
				description: '<code>Spacer</code>'
			},
			{ name: 'count', type: 'number', default: 'required', description: '<code>Columns</code>' }
		]}
		a11y={[
			'Pure layout primitives — none add semantics or roles',
			'Children retain their own ARIA — wrap meaningful sections in <code>&lt;section&gt;</code> / <code>&lt;nav&gt;</code> / <code>&lt;article&gt;</code>',
			'Visual order should match DOM order so SR + keyboard navigation stay consistent',
			'Avoid <code class="rounded bg-(--cream) px-1">order</code> tricks that reshuffle tab order — bad for keyboard users'
		]}
	/>
</main>
