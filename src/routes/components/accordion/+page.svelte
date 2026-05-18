<script lang="ts">
	import { CaretLeft, Plus } from 'phosphor-svelte';
	import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Accordion type="single">
	<AccordionItem value="a">
		<AccordionTrigger>What is Alus?</AccordionTrigger>
		<AccordionContent>Unstyled, accessible Svelte 5 primitives.</AccordionContent>
	</AccordionItem>
	<AccordionItem value="b">
		<AccordionTrigger>Tailwind compatible?</AccordionTrigger>
		<AccordionContent>Yes — bring your own classes.</AccordionContent>
	</AccordionItem>
</Accordion>`;

	let single = $state<string[]>(['a']);
	let multi = $state<string[]>([]);
</script>

<svelte:head>
	<title>Accordion · Alus Components</title>
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
			<div class="hanko-seal">畳</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Accordion</h1>
				<p class="tracking-widest text-(--bamboo)">アコーディオン</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Collapsible sections. <code class="rounded bg-(--cream) px-1">single</code> or
			<code class="rounded bg-(--cream) px-1">multiple</code>.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Single</span>
			<span class="ml-2 text-lg text-(--bamboo)">単一</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Accordion type="single" bind:value={single} class="divide-y divide-(--indigo-dye)/10">
				{#each [{ v: 'a', q: 'What is Alus?', a: 'Unstyled accessible Svelte 5 component library.' }, { v: 'b', q: 'Why unstyled?', a: 'Full styling freedom with Tailwind or any CSS approach.' }, { v: 'c', q: 'Svelte 5 only?', a: 'Yes — runes mode exclusively.' }] as item (item.v)}
					<AccordionItem value={item.v}>
						<AccordionTrigger
							class="group flex w-full items-center justify-between py-4 text-left text-(--ink) hover:text-(--vermilion)"
						>
							{#snippet children({ open })}
								<span class="font-medium">{item.q}</span>
								<Plus class="h-4 w-4 transition-transform {open ? 'rotate-45' : ''}" />
							{/snippet}
						</AccordionTrigger>
						<AccordionContent class="pb-4 text-(--charcoal)/70">
							{item.a}
						</AccordionContent>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Multiple</span>
			<span class="ml-2 text-lg text-(--bamboo)">複数</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Accordion type="multiple" bind:value={multi} class="divide-y divide-(--indigo-dye)/10">
				{#each ['One', 'Two', 'Three'] as label, i}
					<AccordionItem value={`m${i}`}>
						<AccordionTrigger class="py-4 text-left text-(--ink) hover:text-(--vermilion)">
							{label}
						</AccordionTrigger>
						<AccordionContent class="pb-4 text-(--charcoal)/70">
							Content for {label}. Multiple panels can open at once.
						</AccordionContent>
					</AccordionItem>
				{/each}
			</Accordion>
			<p class="mt-4 text-sm text-(--charcoal)/60">Open: {multi.join(', ') || '—'}</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'type',
				type: "'single' | 'multiple'",
				default: "'single'",
				description: '<code>Accordion</code>'
			},
			{
				name: 'value',
				type: 'string[]',
				default: '[]',
				description: 'Bindable open items. <code>Accordion</code>'
			},
			{
				name: 'collapsible',
				type: 'boolean',
				default: 'true',
				description: 'Single mode: allow closing all'
			},
			{
				name: 'value (item)',
				type: 'string',
				default: 'required',
				description: '<code>AccordionItem</code>'
			},
			{
				name: 'disabled',
				type: 'boolean',
				default: 'false',
				description: '<code>AccordionItem</code>'
			},
			{ name: 'class', type: 'string', default: "''", description: 'On any sub-component' }
		]}
		a11y={[
			'Trigger uses <code class="rounded bg-(--cream) px-1">aria-expanded</code> + <code class="rounded bg-(--cream) px-1">aria-controls</code>',
			'Content uses <code class="rounded bg-(--cream) px-1">aria-labelledby</code> pointing to trigger',
			'Arrow keys cycle triggers, Home/End jump, Enter/Space toggle',
			'<code class="rounded bg-(--cream) px-1">data-state="open"|"closed"</code> for animation styling'
		]}
	/>
</main>
