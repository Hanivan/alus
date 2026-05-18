<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Popover, PopoverTrigger, PopoverContent } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Popover>
	<PopoverTrigger>Open</PopoverTrigger>
	<PopoverContent>
		<input placeholder="Type here…" />
	</PopoverContent>
</Popover>`;
</script>

<svelte:head>
	<title>Popover · Alus Components</title>
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
			<div class="hanko-seal">泡</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Popover</h1>
				<p class="tracking-widest text-(--bamboo)">ポップオーバー</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Click-toggled floating panel. Outside-click + Escape close, focus restore.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Popover>
				<PopoverTrigger
					class="border border-(--indigo-dye)/20 px-4 py-2 text-(--ink) hover:border-(--vermilion) data-[state=open]:border-(--vermilion)"
				>
					Show details
				</PopoverTrigger>
				<PopoverContent
					placement="bottom-start"
					class="z-50 w-72 border border-(--indigo-dye)/20 bg-white p-4 shadow-xl focus:outline-none"
				>
					<h3 class="font-display mb-1 text-lg text-(--ink)">Quick info</h3>
					<p class="text-sm text-(--charcoal)/70">
						Arbitrary content goes here. Popover stays open until you click outside or press Escape.
					</p>
				</PopoverContent>
			</Popover>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'placement',
				type: 'Placement',
				default: "'bottom'",
				description: 'Floating-UI placement'
			},
			{ name: 'open', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'closeOnEscape', type: 'boolean', default: 'true' },
			{ name: 'closeOnOutsideClick', type: 'boolean', default: 'true' },
			{ name: 'offset', type: 'number', default: '8' },
			{ name: 'class', type: 'string', default: "''", description: 'On PopoverContent' }
		]}
		a11y={[
			'Trigger uses <code class="rounded bg-(--cream) px-1">aria-haspopup="dialog"</code> + <code class="rounded bg-(--cream) px-1">aria-expanded</code>',
			'Content is <code class="rounded bg-(--cream) px-1">role="dialog"</code> — supports focusable controls (unlike Tooltip)',
			'Escape closes; outside click closes; focus restored to trigger',
			'Floating-UI flip + shift keeps inside viewport'
		]}
	/>
</main>
