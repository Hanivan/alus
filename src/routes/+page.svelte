<script lang="ts">
	import { Button, Input } from 'alus';
	import {
		CheckCircle,
		Envelope,
		PaperPlaneRight,
		Info,
		Warning,
		Keyboard,
		Eye,
		ArrowRight
	} from 'phosphor-svelte';

	let name = $state('');
	let email = $state('');
	let message = $state('');
	let newsletterSubscribed = $state(false);
	let subEmail = $state('');

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

	let subEmailError = $derived.by(() => {
		if (subEmail && !subEmail.includes('@')) {
			return 'Please enter a valid email address';
		}
		if (subEmail && subEmail.length < 5) {
			return 'Email address is too short';
		}
		return '';
	});
</script>

<svelte:head>
	<title>Alus Component Library - Accessible Svelte 5 Components</title>
	<meta
		name="description"
		content="Unstyled, accessible Svelte 5 components with Tailwind CSS. WCAG 2.1 AA compliant."
	/>
</svelte:head>

<!-- Skip to main content link for keyboard users -->
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:font-semibold"
>
	Skip to main content
</a>

<!-- Main container -->
<main id="main-content" class="min-h-screen">
	<!-- Hero section -->
	<section
		aria-labelledby="hero-heading"
		class="relative bg-linear-to-br from-blue-50 to-indigo-100 border-b border-blue-200"
	>
		<div class="max-w-4xl mx-auto px-8 py-16">
			<h1
				id="hero-heading"
				class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center gap-3"
			>
				<CheckCircle class="text-blue-600" weight="fill" />
				Alus Component Library
			</h1>
			<p class="text-xl text-gray-700 mb-6 leading-relaxed">
				Unstyled, accessible Svelte 5 components with Tailwind CSS
			</p>
			<div class="flex flex-wrap gap-4 items-center">
				<div
					role="status"
					aria-live="polite"
					class="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm"
				>
					<Eye class="text-green-600" size={20} />
					<span>WCAG 2.1 AA Compliant</span>
				</div>
				<div
					role="status"
					aria-live="polite"
					class="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm"
				>
					<Keyboard class="text-purple-600" size={20} />
					<span>Keyboard Accessible</span>
				</div>
			</div>
		</div>
	</section>

	<div class="max-w-4xl mx-auto px-8 py-12 space-y-12">
		<!-- Button Showcase -->
		<section aria-labelledby="button-heading">
			<h2
				id="button-heading"
				class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"
			>
				<CheckCircle class="text-green-600" />
				Button Components
			</h2>

			<div class="space-y-6">
				<!-- Basic buttons -->
				<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
					<h3 class="text-lg font-semibold text-gray-800 mb-4">Basic Buttons</h3>
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
							disabled
							aria-label="Disabled button"
						>
							Disabled
						</Button>
					</div>
				</div>

				<!-- Toggle buttons -->
				<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
					<h3 class="text-lg font-semibold text-gray-800 mb-4">Toggle Buttons</h3>
					<p class="text-sm text-gray-600 mb-4">
						Buttons that maintain state with aria-pressed attribute
					</p>
					<div class="flex flex-wrap gap-4">
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
			</div>
		</section>

		<!-- Input Showcase -->
		<section aria-labelledby="input-heading">
			<h2
				id="input-heading"
				class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"
			>
				<Envelope class="text-purple-600" />
				Input Components
			</h2>

			<div class="space-y-6">
				<!-- Name input -->
				<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
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
				<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
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
			</div>
		</section>

		<!-- Contact Form -->
		<section aria-labelledby="form-heading">
			<h2
				id="form-heading"
				class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"
			>
				<PaperPlaneRight class="text-blue-600" />
				Interactive Contact Form
			</h2>

			<form
				onsubmit={(e) => {
					e.preventDefault();
					if (name && email && message && !nameError && !emailError) {
						alert(`Thank you ${name}! We'll contact you at ${email}`);
						name = '';
						email = '';
						message = '';
					}
				}}
				class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
				aria-labelledby="form-heading"
			>
				<fieldset class="space-y-4">
					<legend class="text-lg font-semibold text-gray-800 mb-4">Send us a message</legend>

					<!-- Message textarea (using Input with type=text for demo) -->
					<div>
						<label for="message-input" class="block text-sm font-semibold text-gray-700 mb-2">
							Message <span class="text-red-500" aria-label="required">*</span>
						</label>
						<Input
							id="message-input"
							name="message"
							type='text'
							placeholder="Type your message here..."
							class="border border-gray-300 rounded px-3 py-2 text-base outline-none transition-border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
							bind:value={message}
							aria-label="Your message"
							aria-required="true"
							required
						/>
					</div>

					<!-- Submit button -->
					<Button
						type='submit'
						class="px-6 py-2 text-base font-semibold rounded transition-colors border-none bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
						aria-describedby="submit-help"
					>
						<PaperPlaneRight size={20} />
						Send Message
					</Button>
					<p id="submit-help" class="text-sm text-gray-500 mt-2">
						Press Enter or click to send your message. All fields are required.
					</p>
				</fieldset>
			</form>
		</section>

			<!-- Email Subscription Form -->
			<section aria-labelledby="email-form-heading">
				<h2
					id="email-form-heading"
					class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"
				>
					<Envelope class="text-purple-600" />
					Newsletter Subscription
				</h2>

				<div class="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
					<p class="text-gray-600 mb-4">
						Subscribe to our newsletter to receive updates on new components and accessibility features.
					</p>

					{#if newsletterSubscribed}
						<div
							role="status"
							aria-live="polite"
							class="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
						>
							<CheckCircle class="text-green-600 shrink-0" size={24} />
							<div>
								<h3 class="font-semibold text-green-900">Successfully Subscribed!</h3>
								<p class="text-sm text-green-800 mt-1">
									Thank you for subscribing to our newsletter.
								</p>
							</div>
						</div>
					{:else}
						<form
							onsubmit={(e) => {
								e.preventDefault();
								if (subEmail && !subEmailError) {
									newsletterSubscribed = true;
									setTimeout(() => {
										newsletterSubscribed = false;
										subEmail = '';
									}, 3000);
								}
							}}
							class="space-y-4"
							aria-labelledby="email-form-heading"
						>
							<div>
								<label for="sub-email-input" class="block text-sm font-semibold text-gray-700 mb-2">
									Email Address <span class="text-red-500" aria-label="required">*</span>
								</label>
								<Input
									id="sub-email-input"
									name="email"
									type='email'
									autocomplete='email'
									inputmode='email'
									placeholder="your@email.com"
									class="border {subEmailError ? 'border-red-300' : 'border-gray-300'} rounded px-3 py-2 text-base outline-none transition-border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 w-full"
									bind:value={subEmail}
									aria-label="Email address for newsletter"
									aria-describedby="sub-email-help sub-email-error"
									aria-invalid={!!subEmailError}
									required
								/>
								<p id="sub-email-help" class="mt-2 text-sm text-gray-500">
									We respect your privacy. Unsubscribe at any time.
								</p>
								{#if subEmailError}
									<p
										id="sub-email-error"
										class="mt-2 text-sm text-red-600 flex items-center gap-1"
										role="alert"
										aria-live="assertive"
									>
										<Warning size={16} />
										<span>{subEmailError}</span>
									</p>
								{/if}
							</div>

							<Button
								type='submit'
								class="px-6 py-2 text-base font-semibold rounded transition-colors border-none bg-purple-600 text-white hover:bg-purple-700 flex items-center gap-2"
								aria-describedby="sub-submit-help"
								disabled={!subEmail || !!subEmailError}
							>
								<Envelope size={20} />
								Subscribe to Newsletter
							</Button>
							<p id="sub-submit-help" class="text-sm text-gray-500">
								Press Enter to subscribe. You can unsubscribe anytime.
							</p>
						</form>
					{/if}
				</div>
			</section>

		<!-- Accessibility Features -->
		<section aria-labelledby="a11y-heading">
			<h2
				id="a11y-heading"
				class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"
			>
				<Keyboard class="text-purple-600" />
				Accessibility Features
			</h2>

			<div
				role="list"
				class="grid md:grid-cols-2 gap-4"
			>
				<div
					role="listitem"
					class="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
				>
					<CheckCircle class="text-green-600 shrink-0 mt-0.5" size={20} />
					<div>
						<h3 class="font-semibold text-green-900">WCAG 2.1 AA Compliant</h3>
						<p class="text-sm text-green-800 mt-1">
							All components meet accessibility standards
						</p>
					</div>
				</div>

				<div
					role="listitem"
					class="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3"
				>
					<Info class="text-blue-600 shrink-0 mt-0.5" size={20} />
					<div>
						<h3 class="font-semibold text-blue-900">Full ARIA Support</h3>
						<p class="text-sm text-blue-800 mt-1">
							aria-label, aria-labelledby, aria-describedby, and more
						</p>
					</div>
				</div>

				<div
					role="listitem"
					class="p-4 bg-purple-50 border border-purple-200 rounded-lg flex items-start gap-3"
				>
					<Keyboard class="text-purple-600 shrink-0 mt-0.5" size={20} />
					<div>
						<h3 class="font-semibold text-purple-900">Keyboard Navigation</h3>
						<p class="text-sm text-purple-800 mt-1">
							Full keyboard support with visible focus indicators
						</p>
					</div>
				</div>

				<div
					role="listitem"
					class="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-3"
				>
					<Eye class="text-orange-600 shrink-0 mt-0.5" size={20} />
					<div>
						<h3 class="font-semibold text-orange-900">Screen Reader Support</h3>
						<p class="text-sm text-orange-800 mt-1">
							Proper labels, descriptions, and live announcements
						</p>
					</div>
				</div>

				<div
					role="listitem"
					class="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
				>
					<Warning class="text-red-600 shrink-0 mt-0.5" size={20} />
					<div>
						<h3 class="font-semibold text-red-900">Form Validation</h3>
						<p class="text-sm text-red-800 mt-1">
							aria-invalid and aria-errormessage for errors
						</p>
					</div>
				</div>

				<div
					role="listitem"
					class="p-4 bg-teal-50 border border-teal-200 rounded-lg flex items-start gap-3"
				>
					<ArrowRight class="text-teal-600 shrink-0 mt-0.5" size={20} />
					<div>
						<h3 class="font-semibold text-teal-900">Semantic HTML</h3>
						<p class="text-sm text-teal-800 mt-1">
							Proper button, input, label, and form elements
						</p>
					</div>
				</div>
			</div>
		</section>
	</div>

	<!-- Footer -->
	<footer class="mt-16 border-t border-gray-200 bg-gray-50">
		<div class="max-w-4xl mx-auto px-8 py-8 text-center">
			<p class="text-gray-600 mb-2">
				Built with <strong>Svelte 5</strong> + <strong>Tailwind CSS</strong> +
				<strong>Phosphor Icons</strong> + <strong>WCAG Compliance</strong>
			</p>
			<p class="text-sm text-gray-500">
				All components are unstyled and fully accessible
			</p>
		</div>
	</footer>
</main>
