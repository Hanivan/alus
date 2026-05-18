<script lang="ts">
	import { CaretLeft, UploadSimple } from 'phosphor-svelte';
	import { FileInput, Label } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<FileInput
	accept="image/*"
	multiple
	onChange={(files) => console.log(files)}
	aria-label="Upload photos"
>
	{#snippet trigger({ open })}
		<button onclick={open}>Choose files</button>
	{/snippet}
</FileInput>`;

	let files = $state<FileList | null>(null);
	let multi = $state<FileList | null>(null);
</script>

<svelte:head>
	<title>FileInput · Alus Components</title>
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
			<div class="hanko-seal">档</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">FileInput</h1>
				<p class="tracking-widest text-(--bamboo)">ファイル</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			File upload with optional custom trigger snippet. Native input is visually hidden but fully
			focusable.
		</p>
	</header>

	<section class="mb-12">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Native</span>
			<span class="ml-2 text-lg text-(--bamboo)">既定</span>
		</h2>
		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<Label for="resume">Resume (PDF)</Label>
			<FileInput
				id="resume"
				accept="application/pdf"
				bind:files
				class="block text-sm file:mr-4 file:border file:border-(--indigo-dye)/20 file:bg-white file:px-4 file:py-2 file:text-(--ink) file:hover:border-(--vermilion)"
			/>
			{#if files?.[0]}
				<p class="text-sm text-(--charcoal)/70">{files[0].name} · {files[0].size} bytes</p>
			{/if}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Custom Trigger</span>
			<span class="ml-2 text-lg text-(--bamboo)">独自</span>
		</h2>
		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<FileInput accept="image/*" multiple bind:files={multi}>
				{#snippet children({ files: f, open })}
					<button
						type="button"
						onclick={open}
						class="inline-flex items-center gap-2 border border-(--indigo-dye)/20 px-4 py-2 transition-colors hover:border-(--vermilion)"
					>
						<UploadSimple class="h-5 w-5" />
						<span>Choose images</span>
					</button>
					{#if f?.length}
						<ul class="mt-3 space-y-1 text-sm text-(--charcoal)/70">
							{#each Array.from(f) as file}
								<li>{file.name}</li>
							{/each}
						</ul>
					{/if}
				{/snippet}
			</FileInput>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'accept',
				type: 'string',
				default: 'undefined',
				description: 'MIME / extension filter'
			},
			{ name: 'multiple', type: 'boolean', default: 'false' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'onChange', type: '(files: FileList) => void', default: 'undefined' },
			{
				name: 'trigger',
				type: 'Snippet<[{ open: () => void; files: FileList | null }]>',
				default: 'undefined'
			},
			{ name: 'aria-label', type: 'string', default: 'undefined' }
		]}
		a11y={[
			'Hidden native <code class="rounded bg-(--cream) px-1">&lt;input type="file"&gt;</code> for full browser support',
			'Custom <code class="rounded bg-(--cream) px-1">trigger</code> snippet is keyboard accessible',
			'<code class="rounded bg-(--cream) px-1">aria-invalid</code> + <code class="rounded bg-(--cream) px-1">aria-errormessage</code> for validation'
		]}
	/>
</main>
