<script lang="ts">
	import { resolve } from '$app/paths';
	import { CaretLeft, Check } from 'phosphor-svelte';
	import { Checkbox } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Checkbox } from 'alus-ui';
	let checked = $state(false);
<\/script>

<Checkbox
	bind:checked
	aria-label="Accept terms"
	class="h-5 w-5 rounded border-2 border-(--indigo-dye)/30 checked:bg-(--vermilion)"
/>`;

	let acceptedTerms = $state(false);
	let newsletter = $state(false);
	let notifications = $state(true);

	// Separate states for indeterminate section
	let selectAll = $state(false);
	let item1 = $state(false);
	let item2 = $state(false);
	let item3 = $state(false);

	let allItemsChecked = $derived.by(() => {
		return item1 && item2 && item3;
	});

	let someItemsChecked = $derived.by(() => {
		return (item1 || item2 || item3) && !allItemsChecked;
	});

	function toggleAll() {
		const newState = !allItemsChecked;
		item1 = newState;
		item2 = newState;
		item3 = newState;
	}

	// Update selectAll when individual items change
	$effect(() => {
		if (allItemsChecked) {
			selectAll = true;
		} else if (someItemsChecked) {
			selectAll = false; // Will be set to indeterminate in the component
		} else {
			selectAll = false;
		}
	});
</script>

<svelte:head>
	<title>Checkbox · Alus Components</title>
	<meta
		name="description"
		content="Accessible checkbox component with indeterminate state and ARIA support"
	/>
</svelte:head>

<a
	href={resolve('/')}
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">✓</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Checkbox</h1>
				<p class="tracking-widest text-(--bamboo)">チェックボックス</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			An accessible checkbox component with indeterminate state, proper ARIA support, and keyboard
			navigation.
		</p>
	</header>

	<!-- Basic Checkboxes -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Basic Checkboxes</span>
			<span class="ml-2 text-lg text-(--bamboo)">基本チェックボックス</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex items-center gap-3">
				<Checkbox
					bind:checked={acceptedTerms}
					class="h-5 w-5 accent-(--indigo-dye)"
					id="terms"
					aria-label="Accept terms and conditions"
				/>
				<label
					for="terms"
					class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
				>
					I accept the terms and conditions
				</label>
			</div>

			<div class="flex items-center gap-3">
				<Checkbox
					bind:checked={newsletter}
					class="h-5 w-5 accent-(--indigo-dye)"
					id="newsletter"
					aria-label="Subscribe to newsletter"
				/>
				<label
					for="newsletter"
					class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
				>
					Subscribe to our newsletter
				</label>
			</div>

			<div class="flex items-center gap-3">
				<Checkbox
					bind:checked={notifications}
					class="h-5 w-5 accent-(--indigo-dye)"
					id="notifications"
					aria-label="Enable notifications"
				/>
				<label
					for="notifications"
					class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
				>
					Enable push notifications
				</label>
			</div>
		</div>
	</section>

	<!-- Indeterminate State -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Indeterminate State</span>
			<span class="ml-2 text-lg text-(--bamboo)">不確定状態</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<div class="mb-4 flex items-center gap-3">
				<Checkbox
					bind:checked={selectAll}
					indeterminate={someItemsChecked}
					onchange={toggleAll}
					class="h-5 w-5 accent-(--indigo-dye)"
					id="selectAll"
					aria-label="Select all items"
				/>
				<label
					for="selectAll"
					class="cursor-pointer font-medium text-(--ink) transition-colors duration-200 select-none hover:text-(--vermilion)"
				>
					Select All
				</label>
			</div>

			<div class="space-y-3 border-l-2 border-(--indigo-dye)/10 pl-8">
				<div class="flex items-center gap-3">
					<Checkbox
						bind:checked={item1}
						class="h-5 w-5 accent-(--indigo-dye)"
						id="item1"
						aria-label="Select item 1"
					/>
					<label
						for="item1"
						class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>Item 1</label
					>
				</div>
				<div class="flex items-center gap-3">
					<Checkbox
						bind:checked={item2}
						class="h-5 w-5 accent-(--indigo-dye)"
						id="item2"
						aria-label="Select item 2"
					/>
					<label
						for="item2"
						class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>Item 2</label
					>
				</div>
				<div class="flex items-center gap-3">
					<Checkbox
						bind:checked={item3}
						class="h-5 w-5 accent-(--indigo-dye)"
						id="item3"
						aria-label="Select item 3"
					/>
					<label
						for="item3"
						class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>Item 3</label
					>
				</div>
			</div>

			<div role="status" aria-live="polite" class="mt-4 text-sm text-(--charcoal)/60">
				Selected: {allItemsChecked ? 'All' : someItemsChecked ? 'Some' : 'None'}
			</div>
		</div>
	</section>

	<!-- Disabled State -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Disabled State</span>
			<span class="ml-2 text-lg text-(--bamboo)">無効状態</span>
		</h2>

		<div class="japanese-border space-y-4 bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex items-center gap-3 opacity-50">
				<Checkbox
					checked={true}
					disabled
					class="h-5 w-5 accent-(--indigo-dye)"
					id="disabled-checked"
					aria-label="Disabled checked checkbox"
				/>
				<label for="disabled-checked" class="cursor-pointer text-(--charcoal) select-none">
					Disabled (Checked)
				</label>
			</div>

			<div class="flex items-center gap-3 opacity-50">
				<Checkbox
					checked={false}
					disabled
					class="h-5 w-5 accent-(--indigo-dye)"
					id="disabled-unchecked"
					aria-label="Disabled unchecked checkbox"
				/>
				<label for="disabled-unchecked" class="cursor-pointer text-(--charcoal) select-none">
					Disabled (Unchecked)
				</label>
			</div>
		</div>
	</section>

	<!-- Props Reference -->
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
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">checked</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">boolean</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">false</code></td
						>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">disabled</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">boolean</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">false</code></td
						>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">indeterminate</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">boolean</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">false</code></td
						>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">required</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">boolean</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">false</code></td
						>
					</tr>
					<tr>
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">class</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">string</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"><code class="text-sm">''</code></td>
					</tr>
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
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)"><Check class="h-4 w-4" /></span>
					<span class="text-(--charcoal)/80"
						>Semantic HTML with native <code class="rounded bg-(--cream) px-1"
							>&lt;input type="checkbox"&gt;</code
						> element</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)"><Check class="h-4 w-4" /></span>
					<span class="text-(--charcoal)/80"
						>Full ARIA support (aria-label, aria-labelledby, aria-describedby)</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)"><Check class="h-4 w-4" /></span>
					<span class="text-(--charcoal)/80">Keyboard navigation with Space key</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)"><Check class="h-4 w-4" /></span>
					<span class="text-(--charcoal)/80">Proper label association for screen readers</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)"><Check class="h-4 w-4" /></span>
					<span class="text-(--charcoal)/80"
						>Indeterminate state support for "select all" patterns</span
					>
				</li>
			</ul>
		</div>
	</section>

	<!-- Keyboard Testing -->
	<section>
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Keyboard Testing</span>
			<span class="ml-2 text-lg text-(--bamboo)">キーボードテスト</span>
		</h2>

		<div class="japanese-border bg-(--indigo-dye)/5 p-8">
			<h3 class="mb-4 font-semibold text-(--ink)">Test keyboard navigation:</h3>
			<ol class="list-inside list-decimal space-y-2 text-(--charcoal)/80">
				<li>Tab to focus on any checkbox</li>
				<li>
					Press <kbd class="rounded bg-white px-2 py-1 font-mono text-sm">Space</kbd> to toggle
				</li>
				<li>Verify screen reader announces state changes</li>
			</ol>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'checked', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'indeterminate', type: 'boolean', default: 'false' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'name', type: 'string', default: 'undefined' },
			{ name: 'value', type: 'string', default: 'undefined' },
			{ name: 'aria-label', type: 'string', default: 'undefined' },
			{ name: 'aria-describedby', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;input type="checkbox"&gt;</code>',
			'Indeterminate state propagated via DOM property (not just visual)',
			'<code class="rounded bg-(--cream) px-1">aria-checked="mixed"</code> when indeterminate',
			'Space toggles, no custom key handling needed',
			'Pair with <code class="rounded bg-(--cream) px-1">&lt;Label for&gt;</code> or wrap for click-anywhere'
		]}
	/>
</main>
