<script lang="ts">
	import { Input } from 'alus';

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
	<meta name="description" content="Text input component with validation, error states, and accessibility features" />
</svelte:head>

<a
	href="/"
	class="inline-flex items-center gap-2 text-[var(--indigo-dye)] hover:text-[var(--vermilion)] transition-colors duration-300 mb-8"
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
			<div class="hanko-seal">入</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-[var(--ink)] mb-2">Input</h1>
				<p class="text-[var(--bamboo)] tracking-widest">入力</p>
			</div>
		</div>
		<p class="text-xl text-[var(--charcoal)]/70 max-w-2xl">
			An accessible text input with validation, error states, and keyboard navigation support.
		</p>
	</header>

	<!-- Basic Input -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Basic Input</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">基本入力</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div>
				<label for="basic-input" class="block text-sm font-medium text-[var(--ink)] mb-2">
					Name
				</label>
				<Input
					id="basic-input"
					name="name"
					type='text'
					autocomplete='name'
					placeholder="Enter your name"
					class="border-2 border-[var(--indigo-dye)]/20 rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					bind:value={name}
					aria-label="Your name"
				/>
			</div>
		</div>
	</section>

	<!-- Input with Validation -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>With Validation</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">検証</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm space-y-8">
			<!-- Name input -->
			<div>
				<label for="name-input" class="block text-sm font-medium text-[var(--ink)] mb-2">
					Name <span class="text-[var(--vermilion)]" aria-label="required">*</span>
				</label>
				<Input
					id="name-input"
					name="name"
					type='text'
					autocomplete='name'
					placeholder="Enter your full name"
					class="border-2 {
						nameError ? 'border-[var(--vermilion)]' : 'border-[var(--indigo-dye)]/20'
					} rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					bind:value={name}
					aria-label="Your name"
					aria-describedby="name-help name-error"
					aria-invalid={!!nameError}
					required
				/>
				<p id="name-help" class="mt-2 text-sm text-[var(--charcoal)]/60">
					Enter your full name for personalized greeting
				</p>
				{#if nameError}
					<p
						id="name-error"
						class="mt-2 text-sm text-[var(--vermilion)] flex items-center gap-2"
						role="alert"
						aria-live="assertive"
					>
						<span>⚠</span>
						<span>{nameError}</span>
					</p>
				{/if}
				{#if name && !nameError}
					<p
						class="mt-2 text-sm text-[var(--matcha)] flex items-center gap-2"
						role="status"
						aria-live="polite"
					>
						<span>✓</span>
						<span>Hello, {name}!</span>
					</p>
				{/if}
			</div>

			<!-- Email input -->
			<div>
				<label for="email-input" class="block text-sm font-medium text-[var(--ink)] mb-2">
					Email Address <span class="text-[var(--vermilion)]" aria-label="required">*</span>
				</label>
				<Input
					id="email-input"
					name="email"
					type='email'
					autocomplete='email'
					inputmode='email'
					placeholder="you@example.com"
					class="border-2 {
						emailError ? 'border-[var(--vermilion)]' : 'border-[var(--indigo-dye)]/20'
					} rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					bind:value={email}
					aria-label="Email address"
					aria-describedby="email-help email-error"
					aria-invalid={!!emailError}
					required
				/>
				<p id="email-help" class="mt-2 text-sm text-[var(--charcoal)]/60">
					We'll never share your email with anyone else
				</p>
				{#if emailError}
					<p
						id="email-error"
						class="mt-2 text-sm text-[var(--vermilion)] flex items-center gap-2"
						role="alert"
						aria-live="assertive"
					>
						<span>⚠</span>
						<span>{emailError}</span>
					</p>
				{/if}
			</div>

			<!-- Password input -->
			<div>
				<label for="password-input" class="block text-sm font-medium text-[var(--ink)] mb-2">
					Password <span class="text-[var(--vermilion)]" aria-label="required">*</span>
				</label>
				<Input
					id="password-input"
					name="password"
					type='password'
					autocomplete='new-password'
					placeholder="Enter a secure password"
					class="border-2 {
						passwordError ? 'border-[var(--vermilion)]' : 'border-[var(--indigo-dye)]/20'
					} rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					bind:value={password}
					aria-label="Password"
					aria-describedby="password-help password-error"
					aria-invalid={!!passwordError}
					required
				/>
				<p id="password-help" class="mt-2 text-sm text-[var(--charcoal)]/60">
					Must be at least 8 characters long
				</p>
				{#if passwordError}
					<p
						id="password-error"
						class="mt-2 text-sm text-[var(--vermilion)] flex items-center gap-2"
						role="alert"
						aria-live="assertive"
					>
						<span>⚠</span>
						<span>{passwordError}</span>
					</p>
				{/if}
				{#if password && !passwordError}
					<p
						class="mt-2 text-sm text-[var(--matcha)] flex items-center gap-2"
						role="status"
						aria-live="polite"
					>
						<span>✓</span>
						<span>Password strength: Good</span>
					</p>
				{/if}
			</div>
		</div>
	</section>

	<!-- Input Types -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Input Types</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">入力タイプ</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<div class="grid md:grid-cols-2 gap-6">
				<div>
					<label for="text-example" class="block text-sm font-medium text-[var(--ink)] mb-2">Text</label>
					<Input
						id="text-example"
						type='text'
						placeholder="Text input"
						class="border-2 border-[var(--indigo-dye)]/20 rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					/>
				</div>

				<div>
					<label for="email-example" class="block text-sm font-medium text-[var(--ink)] mb-2">Email</label>
					<Input
						id="email-example"
						type='email'
						inputmode='email'
						placeholder="you@example.com"
						class="border-2 border-[var(--indigo-dye)]/20 rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					/>
				</div>

				<div>
					<label for="password-example" class="block text-sm font-medium text-[var(--ink)] mb-2">Password</label>
					<Input
						id="password-example"
						type='password'
						placeholder="••••••••"
						class="border-2 border-[var(--indigo-dye)]/20 rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					/>
				</div>

				<div>
					<label for="url-example" class="block text-sm font-medium text-[var(--ink)] mb-2">URL</label>
					<Input
						id="url-example"
						type='url'
						inputmode='url'
						placeholder="https://example.com"
						class="border-2 border-[var(--indigo-dye)]/20 rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					/>
				</div>

				<div>
					<label for="tel-example" class="block text-sm font-medium text-[var(--ink)] mb-2">Phone</label>
					<Input
						id="tel-example"
						type='tel'
						inputmode='tel'
						placeholder="+1 (555) 000-0000"
						class="border-2 border-[var(--indigo-dye)]/20 rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					/>
				</div>

				<div>
					<label for="search-example" class="block text-sm font-medium text-[var(--ink)] mb-2">Search</label>
					<Input
						id="search-example"
						type='search'
						placeholder="Search..."
						class="border-2 border-[var(--indigo-dye)]/20 rounded px-4 py-3 w-full focus:border-[var(--indigo-dye)] focus:outline-none transition-colors"
					/>
				</div>
			</div>
		</div>
	</section>

	<!-- Props Reference -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Props</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">プロパティ</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm overflow-x-auto">
			<table class="w-full text-left">
				<thead>
					<tr class="border-b border-[var(--indigo-dye)]/20">
						<th class="py-3 px-4 font-semibold text-[var(--ink)]">Prop</th>
						<th class="py-3 px-4 font-semibold text-[var(--ink)]">Type</th>
						<th class="py-3 px-4 font-semibold text-[var(--ink)]">Default</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">type</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">HTMLInputTypeAttribute</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">'text'</code></td>
					</tr>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">value</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">''</code></td>
					</tr>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">autocomplete</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">'off'</code></td>
					</tr>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">inputmode</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">'text'</code></td>
					</tr>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">aria-invalid</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">false</code></td>
					</tr>
					<tr class="border-b border-[var(--indigo-dye)]/10">
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">aria-label</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">undefined</code></td>
					</tr>
					<tr>
						<td class="py-3 px-4"><code class="text-sm bg-[var(--cream)] px-2 py-1 rounded">class</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-[var(--charcoal)]/70"><code class="text-sm">''</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Accessibility</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">アクセシビリティ</span>
		</h2>

		<div class="japanese-border p-8 bg-gradient-to-br from-white to-[var(--cream)]">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Semantic HTML with native <code class="bg-[var(--cream)] px-1 rounded">&lt;input&gt;</code> element</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">ARIA attributes for labels, descriptions, and error states</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Form validation with proper error announcements</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Works with <code class="bg-[var(--cream)] px-1 rounded">&lt;label&gt;</code> for implicit labeling</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Full keyboard support with visible focus indicators</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Screen reader support with proper input types and roles</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-[var(--matcha)] mt-0.5">✓</span>
					<span class="text-[var(--charcoal)]/80">Mobile support with inputmode for appropriate keyboards</span>
				</li>
			</ul>
		</div>
	</section>

	<!-- Keyboard Testing -->
	<section>
		<h2 class="font-display text-2xl text-[var(--ink)] mb-8">
			<span>Keyboard Testing</span>
			<span class="text-[var(--bamboo)] text-lg ml-2">キーボードテスト</span>
		</h2>

		<div class="japanese-border p-8 bg-[var(--indigo-dye)]/5">
			<h3 class="font-semibold text-[var(--ink)] mb-4">Test keyboard navigation:</h3>
			<ol class="list-decimal list-inside space-y-2 text-[var(--charcoal)]/80">
				<li>Tab to focus on any input</li>
				<li>Type to enter text</li>
				<li>Check error messages appear with invalid data</li>
				<li>Verify screen reader announces errors</li>
			</ol>
		</div>
	</section>
</main>
