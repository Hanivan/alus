<script lang="ts" module>
	export interface DemoProp {
		name: string;
		type: string;
		default?: string;
		description?: string;
	}
</script>

<script lang="ts">
	import { CodeBlock } from 'alus-ui';

	interface Props {
		code: string;
		language?: string;
		props: DemoProp[];
		a11y: string[];
	}

	let { code, language = 'svelte', props, a11y }: Props = $props();
</script>

<!-- Implementation -->
<section class="mb-16">
	<h2 class="font-display mb-8 text-2xl text-(--ink)">
		<span>Implementation</span>
		<span class="ml-2 text-lg text-(--bamboo)">実装</span>
	</h2>

	<CodeBlock
		{code}
		{language}
		class="japanese-border bg-(--ink) text-(--paper-white)"
		preClass="overflow-x-auto p-6 text-sm leading-relaxed"
		codeClass="font-mono text-(--paper-white)"
		aria-label="{language} implementation example"
	>
		{#snippet actions({ copy, copied })}
			<div
				class="flex items-center justify-between border-b border-(--paper-white)/15 px-4 py-2 text-xs"
			>
				<span class="font-display tracking-widest text-(--paper-white)/70">
					{language.toUpperCase()}
				</span>
				<button
					type="button"
					onclick={copy}
					class="rounded border border-(--paper-white)/20 px-2.5 py-1 font-medium text-(--paper-white)/80 transition-colors hover:border-(--vermilion) hover:text-(--vermilion)"
				>
					{copied ? 'Copied ✓' : 'Copy'}
				</button>
			</div>
		{/snippet}
	</CodeBlock>
</section>

<!-- Props -->
<section class="mb-16">
	<h2 class="font-display mb-8 text-2xl text-(--ink)">
		<span>Props</span>
		<span class="ml-2 text-lg text-(--bamboo)">プロパティ</span>
	</h2>

	<div class="japanese-border overflow-x-auto bg-white/50 p-8 backdrop-blur-sm">
		<table class="w-full text-left">
			<thead>
				<tr class="border-b border-(--indigo-dye)/20">
					<th class="px-4 py-3 font-semibold text-(--ink)">Prop</th>
					<th class="px-4 py-3 font-semibold text-(--ink)">Type</th>
					<th class="px-4 py-3 font-semibold text-(--ink)">Default</th>
				</tr>
			</thead>
			<tbody>
				{#each props as p, i (p.name)}
					<tr class={i < props.length - 1 ? 'border-b border-(--indigo-dye)/10' : ''}>
						<td class="px-4 py-3 align-top">
							<code class="rounded bg-(--cream) px-2 py-1 text-sm">{p.name}</code>
							{#if p.description}
								<div class="mt-1 text-xs text-(--charcoal)/60">{p.description}</div>
							{/if}
						</td>
						<td class="px-4 py-3 align-top text-sm text-(--charcoal)/70">
							<code class="text-sm">{p.type}</code>
						</td>
						<td class="px-4 py-3 align-top text-sm text-(--charcoal)/70">
							<code class="text-sm">{p.default ?? '—'}</code>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
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
			{#each a11y as item, i (i)}
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80">{@html item}</span>
				</li>
			{/each}
		</ul>
	</div>
</section>
