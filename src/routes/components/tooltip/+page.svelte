<script lang="ts">
	import { CaretLeft, Info } from 'phosphor-svelte';
	import { Tooltip, TooltipTrigger, TooltipContent } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Tooltip>
	<TooltipTrigger>Hover me</TooltipTrigger>
	<TooltipContent>Helpful hint</TooltipContent>
</Tooltip>`;
</script>

<svelte:head>
	<title>Tooltip · Alus Components</title>
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
			<div class="hanko-seal">説</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Tooltip</h1>
				<p class="tracking-widest text-(--bamboo)">ツールチップ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Hover/focus tooltip with floating-ui positioning + aria-describedby on trigger.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border flex flex-wrap gap-6 bg-white/50 p-8 backdrop-blur-sm">
			{#each ['top', 'bottom', 'left', 'right'] as placement (placement)}
				<Tooltip>
					<TooltipTrigger
						class="inline-flex items-center gap-2 border border-(--indigo-dye)/20 bg-transparent px-4 py-2 text-(--ink) hover:border-(--vermilion)"
					>
						<Info class="h-4 w-4" />
						<span>{placement}</span>
					</TooltipTrigger>
					<TooltipContent
						placement={placement as 'top' | 'bottom' | 'left' | 'right'}
						class="z-50 rounded-sm border border-(--ink)/80 bg-(--ink) px-3 py-1.5 text-xs font-medium tracking-wide text-(--cream) shadow-lg"
					>
						Tooltip on {placement}
					</TooltipContent>
				</Tooltip>
			{/each}
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'placement', type: 'Placement', default: "'top'", description: 'Floating-UI placement' },
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'openDelay', type: 'number', default: '300' },
			{ name: 'closeDelay', type: 'number', default: '100' },
			{ name: 'offset', type: 'number', default: '6' },
			{ name: 'class', type: 'string', default: "''", description: 'On TooltipContent' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="tooltip"</code>; trigger gets <code class="rounded bg-(--cream) px-1">aria-describedby</code>',
			'Opens on hover AND keyboard focus (required by WCAG 1.4.13)',
			'Escape dismisses without losing focus',
			'Floating-UI with flip + shift keeps it inside viewport',
			'Never put interactive content inside — use Popover instead'
		]}
	/>
</main>
