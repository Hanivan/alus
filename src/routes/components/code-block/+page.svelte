<script lang="ts">
	import { CaretLeft, Copy, Check } from 'phosphor-svelte';
	import { CodeBlock } from 'alus';

	const tsSample = `function sum(a: number, b: number) {
	return a + b;
}

sum(1, 2);`;

	const svelteSample = `<script lang="ts">
	let count = $state(0);
<\/script>

<button onclick={() => count++}>
	clicks: {count}
</button>`;
</script>

<svelte:head>
	<title>CodeBlock · Alus Components</title>
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
			<div class="hanko-seal">码</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">CodeBlock</h1>
				<p class="tracking-widest text-(--bamboo)">原本</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Plain <code>&lt;pre&gt;&lt;code&gt;</code> wrapper. Optional line numbers, language data attr,
			filename, and a copy action snippet you wire to <code>navigator.clipboard</code>.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">With copy + line numbers</h2>
		<div class="japanese-border bg-white/50 p-6 backdrop-blur-sm">
			<CodeBlock
				code={tsSample}
				language="ts"
				filename="sum.ts"
				showLineNumbers
				class="overflow-hidden rounded border border-(--charcoal)/15 bg-(--ink)"
				preClass="m-0 flex gap-4 overflow-auto p-4 text-sm leading-relaxed text-white"
				codeClass="font-mono text-white"
				lineNumbersClass="select-none whitespace-pre text-right text-white/40"
			>
				{#snippet actions({ copy, copied })}
					<div class="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-2">
						<span class="font-mono text-xs text-white/70">sum.ts</span>
						<button
							type="button"
							onclick={copy}
							class="inline-flex items-center gap-1.5 rounded px-2 py-1 text-xs text-white/80 hover:bg-white/10"
							aria-label={copied ? 'Copied' : 'Copy code'}
						>
							{#if copied}
								<Check class="h-3.5 w-3.5" />
								copied
							{:else}
								<Copy class="h-3.5 w-3.5" />
								copy
							{/if}
						</button>
					</div>
				{/snippet}
			</CodeBlock>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Plain</h2>
		<div class="japanese-border bg-white/50 p-6 backdrop-blur-sm">
			<CodeBlock
				code={svelteSample}
				language="svelte"
				class="overflow-hidden rounded border border-(--charcoal)/15 bg-white"
				preClass="m-0 overflow-auto p-4 text-sm leading-relaxed text-(--ink)"
				codeClass="font-mono"
			/>
		</div>
	</section>
</main>
