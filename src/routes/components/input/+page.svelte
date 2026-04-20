<script lang="ts">
	import { Input } from 'alus';
	import { Envelope, ArrowLeft, Warning, CheckCircle, Info } from 'phosphor-svelte';

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
	<title>Input Component - Alus</title>
	<meta
		name="description"
		content="Text input component with validation, error states, and accessibility features"
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
			<Envelope class="text-purple-600" size={40} weight="fill" />
			<h1 class="text-4xl font-bold text-gray-900">Input Component</h1>
		</div>
		<p class="text-xl text-gray-600 leading-relaxed">
			An accessible text input component with validation, error states, and keyboard
			navigation support.
		</p>
	</header>

	<!-- Basic Input -->
	<section aria-labelledby="basic-heading" class="mb-12">
		<h2 id="basic-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Basic Input
		</h2>

		<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
			<div>
				<label for="basic-input" class="block text-sm font-semibold text-gray-700 mb-2">
					Name
				</label>
				<Input
					id="basic-input"
					name="name"
					type='text'
					autocomplete='name'
					placeholder="Enter your name"
					class="border border-gray-300 rounded px-3 py-2 text-base outline-none transition-border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
					bind:value={name}
					aria-label="Your name"
				/>
			</div>
		</div>
	</section>

	<!-- Input with Validation -->
	<section aria-labelledby="validation-heading" class="mb-12">
		<h2 id="validation-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Input with Validation
		</h2>

		<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
			<div class="space-y-6">
				<!-- Name input -->
				<div>
					<label for="name-input" class="block text-sm font-semibold text-gray-700 mb-2">
						Name <span class="text-red-500" aria-label="required">*</span>
					</label>
					<Input
						id="name-input"
						name="name"
						type='text'
						autocomplete='name'
						placeholder="Enter your full name"
						class="border {nameError ? 'border-red-300' : 'border-gray-300'} rounded px-3 py-2 text-base outline-none transition-border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
						bind:value={name}
						aria-label="Your name"
						aria-describedby="name-help name-error"
						aria-invalid={!!nameError}
						required
					/>
					<p id="name-help" class="mt-2 text-sm text-gray-500">
						Enter your full name for personalized greeting
					</p>
					{#if nameError}
						<p
							id="name-error"
							class="mt-2 text-sm text-red-600 flex items-center gap-1"
							role="alert"
							aria-live="assertive"
						>
							<Warning size={16} />
							<span>{nameError}</span>
						</p>
					{/if}
					{#if name && !nameError}
						<p
							class="mt-2 text-sm text-green-600 flex items-center gap-1"
							role="status"
							aria-live="polite"
						>
							<CheckCircle size={16} />
							<span>Hello, {name}!</span>
						</p>
					{/if}
				</div>

				<!-- Email input -->
				<div>
					<label for="email-input" class="block text-sm font-semibold text-gray-700 mb-2">
						Email Address <span class="text-red-500" aria-label="required">*</span>
					</label>
					<Input
						id="email-input"
						name="email"
						type='email'
						autocomplete='email'
						inputmode='email'
						placeholder="you@example.com"
						class="border {emailError ? 'border-red-300' : 'border-gray-300'} rounded px-3 py-2 text-base outline-none transition-border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
						bind:value={email}
						aria-label="Email address"
						aria-describedby="email-help email-error"
						aria-invalid={!!emailError}
						required
					/>
					<p id="email-help" class="mt-2 text-sm text-gray-500">
						We'll never share your email with anyone else
					</p>
					{#if emailError}
						<p
							id="email-error"
							class="mt-2 text-sm text-red-600 flex items-center gap-1"
							role="alert"
							aria-live="assertive"
						>
							<Warning size={16} />
							<span>{emailError}</span>
						</p>
					{/if}
				</div>

				<!-- Password input -->
				<div>
					<label for="password-input" class="block text-sm font-semibold text-gray-700 mb-2">
						Password <span class="text-red-500" aria-label="required">*</span>
					</label>
					<Input
						id="password-input"
						name="password"
						type='password'
						autocomplete='new-password'
						placeholder="Enter a secure password"
						class="border {passwordError ? 'border-red-300' : 'border-gray-300'} rounded px-3 py-2 text-base outline-none transition-border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
						bind:value={password}
						aria-label="Password"
						aria-describedby="password-help password-error"
						aria-invalid={!!passwordError}
						required
					/>
					<p id="password-help" class="mt-2 text-sm text-gray-500">
						Must be at least 8 characters long
					</p>
					{#if passwordError}
						<p
							id="password-error"
							class="mt-2 text-sm text-red-600 flex items-center gap-1"
							role="alert"
							aria-live="assertive"
						>
							<Warning size={16} />
							<span>{passwordError}</span>
						</p>
					{/if}
					{#if password && !passwordError}
						<p
							class="mt-2 text-sm text-green-600 flex items-center gap-1"
							role="status"
							aria-live="polite"
						>
							<CheckCircle size={16} />
							<span>Password strength: Good</span>
						</p>
					{/if}
				</div>
			</div>
		</div>
	</section>

	<!-- Input Types -->
	<section aria-labelledby="types-heading" class="mb-12">
		<h2 id="types-heading" class="text-2xl font-bold text-gray-900 mb-6">
			Common Input Types
		</h2>

		<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
			<div class="grid md:grid-cols-2 gap-6">
				<div>
					<label for="text-example" class="block text-sm font-semibold text-gray-700 mb-2">
						Text
					</label>
					<Input
						id="text-example"
						type='text'
						placeholder="Text input"
						class="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>

				<div>
					<label for="email-example" class="block text-sm font-semibold text-gray-700 mb-2">
						Email
					</label>
					<Input
						id="email-example"
						type='email'
						inputmode='email'
						placeholder="you@example.com"
						class="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>

				<div>
					<label for="password-example" class="block text-sm font-semibold text-gray-700 mb-2">
						Password
					</label>
					<Input
						id="password-example"
						type='password'
						placeholder="••••••••"
						class="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>

				<div>
					<label for="url-example" class="block text-sm font-semibold text-gray-700 mb-2">
						URL
					</label>
					<Input
						id="url-example"
						type='url'
						inputmode='url'
						placeholder="https://example.com"
						class="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>

				<div>
					<label for="tel-example" class="block text-sm font-semibold text-gray-700 mb-2">
						Phone
					</label>
					<Input
						id="tel-example"
						type='tel'
						inputmode='tel'
						placeholder="+1 (555) 000-0000"
						class="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>

				<div>
					<label for="search-example" class="block text-sm font-semibold text-gray-700 mb-2">
						Search
					</label>
					<Input
						id="search-example"
						type='search'
						placeholder="Search..."
						class="border border-gray-300 rounded px-3 py-2 w-full"
					/>
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
								<code class="text-sm">HTMLInputTypeAttribute</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">'text'</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Input type</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">value</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">string</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">''</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Input value (use bind:value)</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">autocomplete</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">string</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">'off'</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Autocomplete attribute</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">inputmode</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">string</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">'text'</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Mobile keyboard mode</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">aria-invalid</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">boolean</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">false</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Invalid state for validation</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">aria-label</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">string</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">undefined</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">Accessibility label</td>
						</tr>
						<tr class="border-b border-gray-100">
							<td class="py-3 px-4">
								<code class="text-sm bg-gray-100 px-2 py-1 rounded">aria-describedby</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">string</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-600">
								<code class="text-sm">undefined</code>
							</td>
							<td class="py-3 px-4 text-sm text-gray-700">ID of describing element</td>
						</tr>
						<tr>
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
					</tbody>
				</table>
			</div>
			<p class="text-sm text-gray-600 mt-4">
				Accepts all standard HTML input attributes.
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
					<span class="text-gray-700"><strong>Semantic HTML:</strong> Uses native <code class="bg-gray-100 px-1 rounded">&lt;input&gt;</code> element</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>ARIA Support:</strong> aria-label, aria-describedby, aria-invalid for error states</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Form Validation:</strong> Proper error announcements with role="alert"</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Label Association:</strong> Works with <code class="bg-gray-100 px-1 rounded">&lt;label&gt;</code> for implicit labeling</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Keyboard Navigation:</strong> Full keyboard support with visible focus</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Screen Reader:</strong> Proper input type, role, and state announcements</span>
				</li>
				<li class="flex items-start gap-3">
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<span class="text-gray-700"><strong>Mobile Support:</strong> inputmode attribute for appropriate keyboards</span>
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
				<Info class="text-blue-600" size={20} />
				Test keyboard navigation:
			</h3>
			<ol class="list-decimal list-inside space-y-2 text-blue-800">
				<li>Tab to focus on any input</li>
				<li>Type to enter text</li>
				<li>Check error messages appear with invalid data</li>
				<li>Verify screen reader announces errors</li>
			</ol>
		</div>
	</section>
</main>
