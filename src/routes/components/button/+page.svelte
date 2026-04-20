<script lang="ts">
	import { Button } from 'alus';
	import { CheckCircle, ArrowLeft, Info, Keyboard } from 'phosphor-svelte';

	let newsletterSubscribed = $state(false);
	let toggleState = $state(false);
	let disabled = $state(false);

	function toggleDisabled() {
		disabled = !disabled;
	}
</script>

<svelte:head>
	<title>Button Component - Alus</title>
	<meta
		name="description"
		content="Accessible button component with ARIA support, toggle states, and keyboard navigation"
	/>
</svelte:head>

<!-- Back navigation -->
<a
	href="/"
	class="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
>
	<ArrowLeft size={20} />
	<span>Back to Components</span>
</a>

<!-- Main content -->
<main class="max-w-4xl mx-auto px-8 py-12">
	<!-- Header -->
	<header class="mb-12">
		<div class="flex items-center gap-3 mb-4">
			<CheckCircle class="text-green-600" size={40} weight="fill" />
			<h1 class="text-4xl font-bold text-gray-900">Button Component</h1>
		</div>
		<p class="text-xl text-gray-600 leading-relaxed">
			An accessible button component with full ARIA support, toggle states, and keyboard
			navigation.
		</p>
	</header>

	<!-- Basic Buttons -->
	<section aria-labelledby="basic-heading" class="mb-12">
		<h2 id="basic-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Basic Buttons
		</h2>

		<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
			<h3 class="text-lg font-semibold text-gray-800 mb-4">Variants</h3>
			<div class="flex flex-wrap gap-4">
				<Button
					type='button'
					class="px-4 py-2 text-base font-semibold rounded transition-colors border-none bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
					aria-label="Primary action"
				>
					Primary Action
				</Button>
				<Button
					type='button'
					class="px-4 py-2 text-base font-semibold rounded transition-colors border-none bg-gray-600 text-white hover:bg-gray-700 flex items-center gap-2"
					aria-label="Secondary action"
				>
					Secondary Action
				</Button>
				<Button
					type='button'
					class="px-4 py-2 text-base font-semibold rounded transition-colors border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-50"
					aria-label="Outline action"
				>
					Outline Action
				</Button>
				<Button
					type='button'
					class="px-4 py-2 text-base font-semibold rounded transition-colors border-none bg-green-600 text-white hover:bg-green-700 opacity-50 cursor-not-allowed"
					disabled={disabled}
					onclick={toggleDisabled}
					aria-label="Toggle disabled button"
				>
					{disabled ? 'Disabled' : 'Toggle Disabled'}
				</Button>
			</div>
		</div>
	</section>

	<!-- Toggle Buttons -->
	<section aria-labelledby="toggle-heading" class="mb-12">
		<h2 id="toggle-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Toggle Buttons
		</h2>

		<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
			<p class="text-sm text-gray-600 mb-4">
				Buttons that maintain state with <code class="bg-gray-100 px-1 rounded">aria-pressed</code> attribute.
			</p>
			<div class="flex flex-wrap gap-4 items-center">
				<Button
					type='button'
					class="px-4 py-2 text-base font-semibold rounded transition-colors border-none {newsletterSubscribed
						? 'bg-green-600 text-white hover:bg-green-700'
						: 'bg-gray-200 text-gray-700 hover:bg-gray-300'}"
					aria-pressed={newsletterSubscribed}
					onclick={() => (newsletterSubscribed = !newsletterSubscribed)}
				>
					{newsletterSubscribed ? 'Subscribed' : 'Subscribe'}
				</Button>
				<div
					role="status"
					aria-live="polite"
					class="text-sm text-gray-600 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded"
				>
					<Info class="text-blue-600" size={16} />
					<span>Status: {newsletterSubscribed ? 'Subscribed' : 'Not subscribed'}</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Props Reference -->
	<section aria-labelledby="props-heading" class="mb-12">
		<h2 id="props-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Props Reference
		</h2>

		<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
			<div class="overflow-x-auto">
				<table class="w-full text-left">
					<thead>
						<tr class="border-b border-gray-200">
							<th class="py-3 px-4 font-semibold text-gray-900">Prop</th>
							<th class="py-3 px-4 font-semibold text-gray-900">Type</th>
							<th class="py-3 px-4 font-semibold text-gray-900">Default</th>
							<th class="py-3 px-4 font-semibold text-gray-900">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">type</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">'button' | 'submit' | 'reset'</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">'button'</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Button type</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">disabled</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">boolean</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">false</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Disabled state</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">aria-pressed</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">boolean</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">undefined</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Toggle button state</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">class</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">string</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">''</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">CSS classes for styling</td>
						</tr>
						<tr>
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">onclick</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">(e: Event) => void</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">undefined</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Click event handler</td>
						</tr>
					</tbody>
				</table>
			</div>
			<p class="text-sm text-gray-600 mt-4">
				Accepts all standard HTML button attributes.
			</p>
		</div>
	</section>

	<!-- Accessibility -->
	<section aria-labelledby="a11y-heading" class="mb-12">
		<h2 id="a11y-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Accessibility Features
		</h2>

		<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
			<ul class="space-y-3" role="list">
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Semantic HTML:</strong> Uses native <code class="bg-gray-100 px-1 rounded">&lt;button&gt;</code> element</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>ARIA Support:</strong> Full support for aria-label, aria-pressed, aria-describedby</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Keyboard Navigation:</strong> Enter and Space keys supported</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Focus Management:</strong> Visible focus indicators</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Screen Reader:</strong> Proper button role and state announcements</span>
				</li>
			</ul>
		</div>
	</section>

	<!-- Testing -->
	<section aria-labelledby="testing-heading" class="mb-12">
		<h2 id="testing-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Keyboard Testing
		</h2>

		<div class="p-6 bg-blue-50 border border-blue-200 rounded-lg">
			<h3 class="font-semibold text-blue-900 mb-3 flex items-center gap-2">
				<Keyboard class="text-blue-600" size={20} />
				Test keyboard navigation:
			</h3>
			<ol class="list-decimal list-inside space-y-2 text-blue-800">
				<li>Tab to focus on any button</li>
				<li>Press <kbd class="bg-white px-2 py-0.5 rounded text-sm font-mono">Enter</kbd> or <kbd class="bg-white px-2 py-0.5 rounded text-sm font-mono">Space</kbd> to activate</li>
				<li>Toggle buttons announce state changes to screen readers</li>
			</ol>
		</div>
	</section>
</main>
