<script lang="ts">
	import { CaretLeft, Lock, Drop } from 'phosphor-svelte';
	import { ColorPicker } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { ColorPicker } from 'alus';
	let c = $state('#c84b31');
<\/script>

<ColorPicker bind:value={c} swatches={['#000','#c84b31','#005f73']} aria-label="Brand color" />`;

	let c1 = $state('#c84b31');
	let c2 = $state('#005f73');
	let c3 = $state('#3d2c8dcc');
	let c4 = $state('#1f1f1f');

	const palette = [
		'#000000',
		'#1f1f1f',
		'#c84b31',
		'#d4a017',
		'#84a98c',
		'#005f73',
		'#3d2c8d',
		'#ffffff'
	];

	const seasonal = [
		'#fad6d6',
		'#f8a5b0',
		'#a8d8b9',
		'#c2e0e8',
		'#fff2b3',
		'#dec1a1',
		'#6b5b95',
		'#8b4513'
	];

	let raw = $state('not-a-color');
	const normalized = $derived.by(() => {
		const m = raw.replace(/^#/, '');
		if (/^[0-9a-fA-F]{3}$/.test(m) || /^[0-9a-fA-F]{6}$/.test(m) || /^[0-9a-fA-F]{8}$/.test(m))
			return '#' + m.toLowerCase();
		return null;
	});
</script>

<svelte:head>
	<title>ColorPicker · Alus Components</title>
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
			<div class="hanko-seal">色</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">ColorPicker</h1>
				<p class="tracking-widest text-(--bamboo)">色選択</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Native color input + hex text field + optional swatch grid. Hex accepts 3 / 6 / 8 char forms
			and normalizes.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Native + hex</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ColorPicker
				bind:value={c1}
				aria-label="Brand color"
				class="inline-flex items-center gap-2 rounded border border-(--charcoal)/20 bg-white p-2"
				nativeClass="h-8 w-10 cursor-pointer rounded border-none bg-transparent"
				inputClass="w-28 rounded border border-(--charcoal)/15 px-2 py-1 text-sm text-(--ink) outline-none focus:border-(--indigo-dye)"
			/>
			<div class="mt-4 flex items-center gap-3">
				<div
					class="h-12 w-12 rounded border border-(--charcoal)/15"
					style={`background:${c1};`}
				></div>
				<code class="text-sm text-(--charcoal)/70">{c1}</code>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">With swatches</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ColorPicker
				bind:value={c2}
				swatches={palette}
				aria-label="Accent color"
				class="inline-flex flex-wrap items-center gap-2 rounded border border-(--charcoal)/20 bg-white p-2"
				nativeClass="h-8 w-10 cursor-pointer rounded border-none bg-transparent"
				inputClass="w-28 rounded border border-(--charcoal)/15 px-2 py-1 text-sm text-(--ink) outline-none focus:border-(--indigo-dye)"
				swatchesClass="flex items-center gap-1.5"
				swatchClass="h-6 w-6 rounded border border-(--charcoal)/15 data-selected:ring-2 data-selected:ring-(--indigo-dye) data-selected:ring-offset-1"
			/>
			<div class="mt-4 flex items-center gap-3">
				<div
					class="h-12 w-12 rounded border border-(--charcoal)/15"
					style={`background:${c2};`}
				></div>
				<code class="text-sm text-(--charcoal)/70">{c2}</code>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Alpha (8-char hex)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<ColorPicker
				bind:value={c3}
				swatches={['#3d2c8d40', '#3d2c8d80', '#3d2c8dcc', '#3d2c8dff']}
				aria-label="Alpha color"
				class="inline-flex flex-wrap items-center gap-2 rounded border border-(--charcoal)/20 bg-white p-2"
				nativeClass="h-8 w-10 cursor-pointer rounded border-none bg-transparent"
				inputClass="w-32 rounded border border-(--charcoal)/15 px-2 py-1 text-sm text-(--ink) outline-none focus:border-(--indigo-dye)"
				swatchesClass="flex items-center gap-1.5"
				swatchClass="h-6 w-6 rounded border border-(--charcoal)/15 data-selected:ring-2 data-selected:ring-(--indigo-dye) data-selected:ring-offset-1"
			/>
			<div class="mt-4 flex items-center gap-3">
				<div
					class="h-12 w-12 rounded border border-(--charcoal)/15 bg-[linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%),linear-gradient(45deg,#ccc_25%,transparent_25%,transparent_75%,#ccc_75%)] bg-[length:8px_8px] bg-[position:0_0,4px_4px]"
				>
					<div class="h-full w-full rounded" style={`background:${c3};`}></div>
				</div>
				<code class="text-sm text-(--charcoal)/70">{c3}</code>
				<span class="text-xs text-(--charcoal)/50">— note the alpha pair (last 2 chars)</span>
			</div>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Hex normalization (3 / 6 / 8 char)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<label class="block text-sm text-(--charcoal)/70">
				Try typing: <code>fa3</code>, <code>#FFAA00</code>, <code>1234abcd</code>, or junk
				<input
					type="text"
					bind:value={raw}
					class="mt-2 w-full max-w-md rounded border border-(--charcoal)/20 px-3 py-2 font-mono text-sm outline-none focus:border-(--indigo-dye)"
				/>
			</label>
			<p class="mt-3 inline-flex items-center gap-2 text-sm">
				<Drop class="h-4 w-4 {normalized ? 'text-(--matcha)' : 'text-(--vermilion)'}" />
				{#if normalized}
					<code class="text-(--matcha)">{normalized}</code>
					<span
						class="ml-2 inline-block h-5 w-5 rounded border border-(--charcoal)/15"
						style={`background:${normalized};`}
					></span>
				{:else}
					<span class="text-(--vermilion)">Not a valid hex.</span>
				{/if}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Disabled</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="inline-flex items-center gap-3">
				<ColorPicker
					bind:value={c4}
					disabled
					aria-label="Locked color"
					class="inline-flex items-center gap-2 rounded border border-(--charcoal)/15 bg-(--charcoal)/5 p-2"
					nativeClass="h-8 w-10 rounded border-none bg-transparent cursor-not-allowed opacity-50"
					inputClass="w-28 rounded border border-(--charcoal)/15 bg-transparent px-2 py-1 text-sm text-(--charcoal)/50 cursor-not-allowed"
				/>
				<Lock class="h-4 w-4 text-(--charcoal)/40" />
			</div>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Hide input / hide native</h2>
		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<div>
				<p class="mb-2 text-xs text-(--charcoal)/60">Swatch-only (no input, no native picker):</p>
				<ColorPicker
					value="#84a98c"
					swatches={seasonal}
					showInput={false}
					showNative={false}
					aria-label="Seasonal palette"
					class="inline-flex flex-wrap items-center gap-2 rounded border border-(--charcoal)/20 bg-white p-2"
					swatchesClass="flex flex-wrap items-center gap-1.5"
					swatchClass="h-7 w-7 rounded border border-(--charcoal)/15 data-selected:ring-2 data-selected:ring-(--indigo-dye) data-selected:ring-offset-1"
				/>
			</div>
			<div>
				<p class="mb-2 text-xs text-(--charcoal)/60">Hex-only (no native):</p>
				<ColorPicker
					value="#d4a017"
					showNative={false}
					aria-label="Hex only"
					class="inline-flex items-center gap-2 rounded border border-(--charcoal)/20 bg-white p-2"
					inputClass="w-28 rounded border border-(--charcoal)/15 px-2 py-1 text-sm text-(--ink) outline-none focus:border-(--indigo-dye)"
				/>
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'string', default: "'#000000'", description: 'Bindable hex' },
			{ name: 'swatches', type: 'string[]', default: 'undefined' },
			{ name: 'showInput', type: 'boolean', default: 'true' },
			{ name: 'showNative', type: 'boolean', default: 'true' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'aria-label', type: 'string', default: "'Color'" },
			{ name: 'onChange', type: '(v: string) => void', default: 'undefined' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="group"</code> wraps the native input + text + swatches',
			'Native <code class="rounded bg-(--cream) px-1">&lt;input type="color"&gt;</code> provides OS-level accessibility',
			'Swatch buttons are keyboard focusable with <code class="rounded bg-(--cream) px-1">aria-label</code> per colour',
			'Hex text accepts 3 / 6 / 8 character forms and normalises'
		]}
	/>
</main>
