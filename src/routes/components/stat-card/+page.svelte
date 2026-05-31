<script lang="ts">
	import {
		CaretLeft,
		ArrowUp,
		ArrowDown,
		Minus,
		Users,
		ShoppingBag,
		Cpu,
		Heart
	} from 'phosphor-svelte';
	import { StatCard } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';
	import { resolve } from '$app/paths';

	const code = `<StatCard
	label="Active users"
	value="12,481"
	change="+8.2%"
	trend="up"
	hint="vs last week"
>
	{#snippet icon()}<Users class="h-5 w-5" />{/snippet}
</StatCard>`;

	type Trend = 'up' | 'down' | 'flat';

	function trendColor(t: Trend) {
		return t === 'up' ? 'var(--matcha)' : t === 'down' ? 'var(--vermilion)' : 'var(--charcoal)';
	}
</script>

<svelte:head>
	<title>StatCard · Alus Components</title>
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
			<div class="hanko-seal">数</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">StatCard</h1>
				<p class="tracking-widest text-(--bamboo)">指標</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Metric card with label, value, optional change indicator and trend (up / down / flat). Custom
			change rendering via the <code>change_snippet</code>.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Dashboard tiles</h2>
		<div
			class="japanese-border grid grid-cols-1 gap-4 bg-white/50 p-8 backdrop-blur-sm md:grid-cols-2 lg:grid-cols-4"
		>
			<StatCard
				label="Active users"
				value="12,481"
				change="+8.2%"
				trend="up"
				hint="vs last week"
				class="flex items-start gap-3 rounded border border-(--charcoal)/15 bg-white p-4"
				labelClass="text-xs uppercase tracking-wider text-(--charcoal)/60"
				valueClass="font-display mt-1 text-3xl text-(--ink)"
				hintClass="mt-2 text-xs text-(--charcoal)/50"
			>
				{#snippet icon()}
					<div class="rounded bg-(--indigo-dye)/10 p-2 text-(--indigo-dye)">
						<Users class="h-5 w-5" />
					</div>
				{/snippet}
				{#snippet change_snippet({ trend, change })}
					<span
						class="mt-1 inline-flex items-center gap-1 text-xs font-medium"
						style={`color:${trendColor(trend)};`}
					>
						{#if trend === 'up'}<ArrowUp class="h-3 w-3" />{/if}
						{#if trend === 'down'}<ArrowDown class="h-3 w-3" />{/if}
						{#if trend === 'flat'}<Minus class="h-3 w-3" />{/if}
						{change}
					</span>
				{/snippet}
			</StatCard>

			<StatCard
				label="Revenue"
				value="¥4,210k"
				change="-2.1%"
				trend="down"
				hint="vs last week"
				class="flex items-start gap-3 rounded border border-(--charcoal)/15 bg-white p-4"
				labelClass="text-xs uppercase tracking-wider text-(--charcoal)/60"
				valueClass="font-display mt-1 text-3xl text-(--ink)"
				hintClass="mt-2 text-xs text-(--charcoal)/50"
			>
				{#snippet icon()}
					<div class="rounded bg-(--vermilion)/10 p-2 text-(--vermilion)">
						<ShoppingBag class="h-5 w-5" />
					</div>
				{/snippet}
				{#snippet change_snippet({ trend, change })}
					<span
						class="mt-1 inline-flex items-center gap-1 text-xs font-medium"
						style={`color:${trendColor(trend)};`}
					>
						{#if trend === 'down'}<ArrowDown class="h-3 w-3" />{/if}
						{change}
					</span>
				{/snippet}
			</StatCard>

			<StatCard
				label="CPU load"
				value="38%"
				change="±0%"
				trend="flat"
				hint="last 5 min"
				class="flex items-start gap-3 rounded border border-(--charcoal)/15 bg-white p-4"
				labelClass="text-xs uppercase tracking-wider text-(--charcoal)/60"
				valueClass="font-display mt-1 text-3xl text-(--ink)"
				hintClass="mt-2 text-xs text-(--charcoal)/50"
			>
				{#snippet icon()}
					<div class="rounded bg-(--muted-gold)/15 p-2 text-(--muted-gold)">
						<Cpu class="h-5 w-5" />
					</div>
				{/snippet}
			</StatCard>

			<StatCard
				label="Likes today"
				value="2,184"
				change="+12%"
				trend="up"
				class="flex items-start gap-3 rounded border border-(--charcoal)/15 bg-white p-4"
				labelClass="text-xs uppercase tracking-wider text-(--charcoal)/60"
				valueClass="font-display mt-1 text-3xl text-(--ink)"
				hintClass="mt-2 text-xs text-(--charcoal)/50"
			>
				{#snippet icon()}
					<div class="rounded bg-(--matcha)/15 p-2 text-(--matcha)">
						<Heart class="h-5 w-5" />
					</div>
				{/snippet}
			</StatCard>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'label', type: 'string', default: 'required' },
			{ name: 'value', type: 'string | number', default: 'required' },
			{ name: 'change', type: 'string', default: 'undefined' },
			{ name: 'trend', type: "'up' | 'down' | 'flat'", default: 'undefined' },
			{ name: 'hint', type: 'string', default: 'undefined' },
			{ name: 'icon', type: 'Snippet', default: 'undefined' },
			{ name: 'change_snippet', type: 'Snippet<[{ trend, change }]>', default: 'undefined' }
		]}
		a11y={[
			'Value uses a heading so it shows in the document outline',
			'Trend is conveyed via the change text, not just colour — SRs read "+8.2% up"',
			'Icons are decorative — marked <code class="rounded bg-(--cream) px-1">aria-hidden</code>',
			'Hint text is associated with the value via <code class="rounded bg-(--cream) px-1">aria-describedby</code>'
		]}
	/>
</main>
