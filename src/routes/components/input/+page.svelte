<script lang="ts">
	import { CaretLeft, Warning, Check } from 'phosphor-svelte';
	import { Input } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Input } from 'alus-ui';
	let value = $state('');
	let error = $derived(value.length > 0 && value.length < 2 ? 'Too short' : '');
<\/script>

<Input
	type="text"
	bind:value
	placeholder="Your name"
	aria-invalid={!!error}
	aria-errormessage={error ? 'name-err' : undefined}
	class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 focus:border-(--indigo-dye) focus:outline-none"
/>
{#if error}<p id="name-err" role="alert">{error}</p>{/if}`;

	// Basic Input section
	let basicName = $state('');

	// With Validation section
	let name = $state('');
	let email = $state('');
	let password = $state('');

	let nameError = $derived.by(() => {
		if (name && name.length < 2) {
			return 'Name must be at least 2 characters';
		}
		return '';
	});

	let emailError = $derived.by(() => {
		if (email && !email.includes('@')) {
			return 'Please enter a valid email address';
		}
		return '';
	});

	let passwordError = $derived.by(() => {
		if (password && password.length < 8) {
			return 'Password must be at least 8 characters';
		}
		return '';
	});
</script>

<svelte:head>
	<title>Input · Alus Components</title>
	<meta
		name="description"
		content="Text input component with validation, error states, and accessibility features"
	/>
</svelte:head>

<a
	href="/"
	class="mb-8 inline-flex items-center gap-2 text-(--indigo-dye) transition-colors duration-300 hover:text-(--vermilion)"
>
	<CaretLeft class="h-5 w-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="mb-6 flex items-center gap-6">
			<div class="hanko-seal">入</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Input</h1>
				<p class="tracking-widest text-(--bamboo)">入力</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			An accessible text input with validation, error states, and keyboard navigation support.
		</p>
	</header>

	<!-- Basic Input -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Basic Input</span>
			<span class="ml-2 text-lg text-(--bamboo)">基本入力</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div>
				<label for="basic-input" class="mb-2 block text-sm font-medium text-(--ink)"> Name </label>
				<Input
					id="basic-input"
					name="name"
					type="text"
					autocomplete="name"
					placeholder="Enter your name"
					class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					bind:value={basicName}
					aria-label="Your name"
				/>
			</div>
		</div>
	</section>

	<!-- Input with Validation -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>With Validation</span>
			<span class="ml-2 text-lg text-(--bamboo)">検証</span>
		</h2>

		<div class="japanese-border space-y-8 bg-white/50 p-8 backdrop-blur-sm">
			<!-- Name input -->
			<div>
				<label for="name-input" class="mb-2 block text-sm font-medium text-(--ink)">
					Name <span class="text-(--vermilion)" aria-label="required">*</span>
				</label>
				<Input
					id="name-input"
					name="name"
					type="text"
					autocomplete="name"
					placeholder="Enter your full name"
					class="border-2 {nameError
						? 'border-(--vermilion)'
						: 'border-(--indigo-dye)/20'} w-full rounded px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					bind:value={name}
					aria-label="Your name"
					aria-describedby="name-help name-error"
					aria-invalid={!!nameError}
					required
				/>
				<p id="name-help" class="mt-2 text-sm text-(--charcoal)/60">
					Enter your full name for personalized greeting
				</p>
				{#if nameError}
					<p
						id="name-error"
						class="mt-2 flex items-center gap-2 text-sm text-(--vermilion)"
						role="alert"
						aria-live="assertive"
					>
						<Warning class="h-4 w-4" />
						<span>{nameError}</span>
					</p>
				{/if}
				{#if name && !nameError}
					<p
						class="mt-2 flex items-center gap-2 text-sm text-(--matcha)"
						role="status"
						aria-live="polite"
					>
						<Check class="h-4 w-4" />
						<span>Hello, {name}!</span>
					</p>
				{/if}
			</div>

			<!-- Email input -->
			<div>
				<label for="email-input" class="mb-2 block text-sm font-medium text-(--ink)">
					Email Address <span class="text-(--vermilion)" aria-label="required">*</span>
				</label>
				<Input
					id="email-input"
					name="email"
					type="email"
					autocomplete="email"
					inputmode="email"
					placeholder="you@example.com"
					class="border-2 {emailError
						? 'border-(--vermilion)'
						: 'border-(--indigo-dye)/20'} w-full rounded px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					bind:value={email}
					aria-label="Email address"
					aria-describedby="email-help email-error"
					aria-invalid={!!emailError}
					required
				/>
				<p id="email-help" class="mt-2 text-sm text-(--charcoal)/60">
					We'll never share your email with anyone else
				</p>
				{#if emailError}
					<p
						id="email-error"
						class="mt-2 flex items-center gap-2 text-sm text-(--vermilion)"
						role="alert"
						aria-live="assertive"
					>
						<Warning class="h-4 w-4" />
						<span>{emailError}</span>
					</p>
				{/if}
			</div>

			<!-- Password input -->
			<div>
				<label for="password-input" class="mb-2 block text-sm font-medium text-(--ink)">
					Password <span class="text-(--vermilion)" aria-label="required">*</span>
				</label>
				<Input
					id="password-input"
					name="password"
					type="password"
					autocomplete="new-password"
					placeholder="Enter a secure password"
					class="border-2 {passwordError
						? 'border-(--vermilion)'
						: 'border-(--indigo-dye)/20'} w-full rounded px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					bind:value={password}
					aria-label="Password"
					aria-describedby="password-help password-error"
					aria-invalid={!!passwordError}
					required
				/>
				<p id="password-help" class="mt-2 text-sm text-(--charcoal)/60">
					Must be at least 8 characters long
				</p>
				{#if passwordError}
					<p
						id="password-error"
						class="mt-2 flex items-center gap-2 text-sm text-(--vermilion)"
						role="alert"
						aria-live="assertive"
					>
						<Warning class="h-4 w-4" />
						<span>{passwordError}</span>
					</p>
				{/if}
				{#if password && !passwordError}
					<p
						class="mt-2 flex items-center gap-2 text-sm text-(--matcha)"
						role="status"
						aria-live="polite"
					>
						<Check class="h-4 w-4" />
						<span>Password strength: Good</span>
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Input Types -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Input Types</span>
			<span class="ml-2 text-lg text-(--bamboo)">入力タイプ</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<div class="grid gap-6 md:grid-cols-2">
				<div>
					<label for="text-example" class="mb-2 block text-sm font-medium text-(--ink)">Text</label>
					<Input
						id="text-example"
						type="text"
						placeholder="Text input"
						class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					/>
				</div>

				<div>
					<label for="email-example" class="mb-2 block text-sm font-medium text-(--ink)"
						>Email</label
					>
					<Input
						id="email-example"
						type="email"
						inputmode="email"
						placeholder="you@example.com"
						class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					/>
				</div>

				<div>
					<label for="password-example" class="mb-2 block text-sm font-medium text-(--ink)"
						>Password</label
					>
					<Input
						id="password-example"
						type="password"
						placeholder="••••••••"
						class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					/>
				</div>

				<div>
					<label for="url-example" class="mb-2 block text-sm font-medium text-(--ink)">URL</label>
					<Input
						id="url-example"
						type="url"
						inputmode="url"
						placeholder="https://example.com"
						class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					/>
				</div>

				<div>
					<label for="tel-example" class="mb-2 block text-sm font-medium text-(--ink)">Phone</label>
					<Input
						id="tel-example"
						type="tel"
						inputmode="tel"
						placeholder="+1 (555) 000-0000"
						class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					/>
				</div>

				<div>
					<label for="search-example" class="mb-2 block text-sm font-medium text-(--ink)"
						>Search</label
					>
					<Input
						id="search-example"
						type="search"
						placeholder="Search..."
						class="w-full rounded border-2 border-(--indigo-dye)/20 px-4 py-3 transition-colors focus:border-(--indigo-dye) focus:outline-none"
					/>
				</div>
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
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">type</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">HTMLInputTypeAttribute</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">'text'</code></td
						>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">value</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">string</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"><code class="text-sm">''</code></td>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">autocomplete</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">string</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">'off'</code></td
						>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">inputmode</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">string</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">'text'</code></td
						>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="px-4 py-3"
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">aria-invalid</code></td
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
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">aria-label</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">string</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">undefined</code></td
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
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Semantic HTML with native <code class="rounded bg-(--cream) px-1">&lt;input&gt;</code> element</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>ARIA attributes for labels, descriptions, and error states</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80">Form validation with proper error announcements</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Works with <code class="rounded bg-(--cream) px-1">&lt;label&gt;</code> for implicit labeling</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Full keyboard support with visible focus indicators</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Screen reader support with proper input types and roles</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Mobile support with inputmode for appropriate keyboards</span
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
				<li>Tab to focus on any input</li>
				<li>Type to enter text</li>
				<li>Check error messages appear with invalid data</li>
				<li>Verify screen reader announces errors</li>
			</ol>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{
				name: 'type',
				type: "'text' | 'email' | 'password' | 'tel' | 'url' | ...",
				default: "'text'"
			},
			{ name: 'value', type: 'string', default: "''", description: 'Bindable' },
			{ name: 'placeholder', type: 'string', default: 'undefined' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'aria-invalid', type: 'boolean', default: 'undefined' },
			{ name: 'aria-errormessage', type: 'string', default: 'undefined' },
			{ name: 'aria-describedby', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Semantic native <code class="rounded bg-(--cream) px-1">&lt;input&gt;</code> element',
			'<code class="rounded bg-(--cream) px-1">aria-invalid</code> + <code class="rounded bg-(--cream) px-1">aria-errormessage</code> for validation',
			'<code class="rounded bg-(--cream) px-1">aria-describedby</code> wires help text to the field',
			'Required state via native <code class="rounded bg-(--cream) px-1">required</code> attribute',
			'Keyboard accessible by default — no custom key handling needed'
		]}
	/>
</main>
