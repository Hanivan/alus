<script lang="ts">
	import { Checkbox } from 'alus';

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
	<meta name="description" content="Accessible checkbox component with indeterminate state and ARIA support" />
</svelte:head>

<a
	href="/"
	class="inline-flex items-center gap-2 text-(--indigo-dye) hover:text-(--vermilion) transition-colors duration-300 mb-8"
>
	<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
	</svg>
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="flex items-center gap-6 mb-6">
			<div class="hanko-seal">✓</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-(--ink) mb-2">Checkbox</h1>
				<p class="text-(--bamboo) tracking-widest">チェックボックス</p>
			</div>
		</div>
		<p class="text-xl text-(--charcoal)/70 max-w-2xl">
			An accessible checkbox component with indeterminate state, proper ARIA support, and keyboard navigation.
		</p>
	</header>

	<!-- Basic Checkboxes -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Basic Checkboxes</span>
			<span class="text-(--bamboo) text-lg ml-2">基本チェックボックス</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm space-y-4">
			<div class="flex items-center gap-3">
				<Checkbox
					bind:checked={acceptedTerms}
					class="w-5 h-5 accent-(--indigo-dye)"
					id="terms"
					aria-label="Accept terms and conditions"
				/>
				<label
					for="terms"
					class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
				>
					I accept the terms and conditions
				</label>
			</div>

			<div class="flex items-center gap-3">
				<Checkbox
					bind:checked={newsletter}
					class="w-5 h-5 accent-(--indigo-dye)"
					id="newsletter"
					aria-label="Subscribe to newsletter"
				/>
				<label
					for="newsletter"
					class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
				>
					Subscribe to our newsletter
				</label>
			</div>

			<div class="flex items-center gap-3">
				<Checkbox
					bind:checked={notifications}
					class="w-5 h-5 accent-(--indigo-dye)"
					id="notifications"
					aria-label="Enable notifications"
				/>
				<label
					for="notifications"
					class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
				>
					Enable push notifications
				</label>
			</div>
		</div>
	</section>

	<!-- Indeterminate State -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Indeterminate State</span>
			<span class="text-(--bamboo) text-lg ml-2">不確定状態</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm space-y-4">
			<div class="flex items-center gap-3 mb-4">
				<Checkbox
					bind:checked={selectAll}
					indeterminate={someItemsChecked}
					onchange={toggleAll}
					class="w-5 h-5 accent-(--indigo-dye)"
					id="selectAll"
					aria-label="Select all items"
				/>
				<label
					for="selectAll"
					class="font-medium text-(--ink) cursor-pointer select-none hover:text-(--vermilion) transition-colors duration-200"
				>
					Select All
				</label>
			</div>

			<div class="pl-8 space-y-3 border-l-2 border-(--indigo-dye)/10">
				<div class="flex items-center gap-3">
					<Checkbox
						bind:checked={item1}
						class="w-5 h-5 accent-(--indigo-dye)"
						id="item1"
						aria-label="Select item 1"
					/>
					<label
						for="item1"
						class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
					>Item 1</label>
				</div>
				<div class="flex items-center gap-3">
					<Checkbox
						bind:checked={item2}
						class="w-5 h-5 accent-(--indigo-dye)"
						id="item2"
						aria-label="Select item 2"
					/>
					<label
						for="item2"
						class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
					>Item 2</label>
				</div>
				<div class="flex items-center gap-3">
					<Checkbox
						bind:checked={item3}
						class="w-5 h-5 accent-(--indigo-dye)"
						id="item3"
						aria-label="Select item 3"
					/>
					<label
						for="item3"
						class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
					>Item 3</label>
				</div>
			</div>

			<div
				role="status"
				aria-live="polite"
				class="mt-4 text-sm text-(--charcoal)/60"
			>
				Selected: {allItemsChecked ? 'All' : someItemsChecked ? 'Some' : 'None'}
			</div>
		</div>
	</section>

	<!-- Disabled State -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Disabled State</span>
			<span class="text-(--bamboo) text-lg ml-2">無効状態</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm space-y-4">
			<div class="flex items-center gap-3 opacity-50">
				<Checkbox
					checked={true}
					disabled
					class="w-5 h-5 accent-(--indigo-dye)"
					id="disabled-checked"
					aria-label="Disabled checked checkbox"
				/>
				<label
					for="disabled-checked"
					class="text-(--charcoal) cursor-pointer select-none"
				>
					Disabled (Checked)
				</label>
			</div>

			<div class="flex items-center gap-3 opacity-50">
				<Checkbox
					checked={false}
					disabled
					class="w-5 h-5 accent-(--indigo-dye)"
					id="disabled-unchecked"
					aria-label="Disabled unchecked checkbox"
				/>
				<label
					for="disabled-unchecked"
					class="text-(--charcoal) cursor-pointer select-none"
				>
					Disabled (Unchecked)
				</label>
			</div>
		</div>
	</section>

	<!-- Props Reference -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Props</span>
			<span class="text-(--bamboo) text-lg ml-2">プロパティ</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm overflow-x-auto">
			<table class="w-full text-left">
				<thead>
					<tr class="border-b border-(--indigo-dye)/20">
						<th class="py-3 px-4 font-semibold text-(--ink)">Prop</th>
						<th class="py-3 px-4 font-semibold text-(--ink)">Type</th>
						<th class="py-3 px-4 font-semibold text-(--ink)">Default</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">checked</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">false</code></td>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">disabled</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">false</code></td>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">indeterminate</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">false</code></td>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">required</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">false</code></td>
					</tr>
					<tr>
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">class</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">''</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Accessibility</span>
			<span class="text-(--bamboo) text-lg ml-2">アクセシビリティ</span>
		</h2>

		<div class="japanese-border p-8 bg-linear-to-br from-white to-(--cream)">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Semantic HTML with native <code class="bg-(--cream) px-1 rounded">&lt;input type="checkbox"&gt;</code> element</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Full ARIA support (aria-label, aria-labelledby, aria-describedby)</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Keyboard navigation with Space key</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Proper label association for screen readers</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5">✓</span>
					<span class="text-(--charcoal)/80">Indeterminate state support for "select all" patterns</span>
				</li>
			</ul>
		</div>
	</section>

	<!-- Keyboard Testing -->
	<section>
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Keyboard Testing</span>
			<span class="text-(--bamboo) text-lg ml-2">キーボードテスト</span>
		</h2>

		<div class="japanese-border p-8 bg-(--indigo-dye)/5">
			<h3 class="font-semibold text-(--ink) mb-4">Test keyboard navigation:</h3>
			<ol class="list-decimal list-inside space-y-2 text-(--charcoal)/80">
				<li>Tab to focus on any checkbox</li>
				<li>Press <kbd class="px-2 py-1 bg-white rounded text-sm font-mono">Space</kbd> to toggle</li>
				<li>Verify screen reader announces state changes</li>
			</ol>
		</div>
	</section>
</main>
