<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Form, Input, Textarea, Button, FieldError } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Form onsubmit={(data) => console.log(data)} class="space-y-3">
	<Input name="email" type="email" required placeholder="Email" />
	<Textarea name="message" required rows={4} placeholder="Message" />
	<Button type="submit">Send</Button>
</Form>`;

	let name = $state('');
	let email = $state('');
	let message = $state('');

	let errors = $state<{ name?: string; email?: string; message?: string }>({});
	let submitted = $state<string | null>(null);

	function validate() {
		const e: typeof errors = {};
		if (name.trim().length < 2) e.name = 'Name must be at least 2 characters';
		if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
		if (message.trim().length < 10) e.message = 'Message must be at least 10 characters';
		errors = e;
		return Object.keys(e).length === 0;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!validate()) {
			submitted = null;
			return;
		}
		submitted = JSON.stringify({ name, email, message }, null, 2);
	}
</script>

<svelte:head>
	<title>Form · Alus Components</title>
	<meta name="description" content="Form wrapper with validation" />
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
			<div class="hanko-seal">式</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Form</h1>
				<p class="tracking-widest text-(--bamboo)">フォーム</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Accessible form wrapper with submit/reset handlers. Uses <code
				class="rounded bg-(--cream) px-1">FieldError</code
			> for ARIA-live validation messages.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Contact</span>
			<span class="ml-2 text-lg text-(--bamboo)">問合せ</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Form onsubmit={handleSubmit} novalidate aria-label="Contact form" class="space-y-4">
				<div class="space-y-1">
					<label for="name" class="block text-sm font-medium text-(--charcoal)">Name</label>
					<Input
						id="name"
						name="name"
						bind:value={name}
						required
						aria-invalid={errors.name ? 'true' : undefined}
						aria-errormessage={errors.name ? 'name-error' : undefined}
						class="w-full border border-(--indigo-dye)/20 bg-white p-2 focus:border-(--vermilion) aria-invalid:border-(--vermilion)"
					/>
					<FieldError id="name-error" message={errors.name} class="text-sm text-(--vermilion)" />
				</div>

				<div class="space-y-1">
					<label for="email" class="block text-sm font-medium text-(--charcoal)">Email</label>
					<Input
						id="email"
						name="email"
						type="email"
						bind:value={email}
						required
						aria-invalid={errors.email ? 'true' : undefined}
						aria-errormessage={errors.email ? 'email-error' : undefined}
						class="w-full border border-(--indigo-dye)/20 bg-white p-2 focus:border-(--vermilion) aria-invalid:border-(--vermilion)"
					/>
					<FieldError id="email-error" message={errors.email} class="text-sm text-(--vermilion)" />
				</div>

				<div class="space-y-1">
					<label for="message" class="block text-sm font-medium text-(--charcoal)">Message</label>
					<Textarea
						id="message"
						name="message"
						bind:value={message}
						rows={4}
						required
						aria-invalid={errors.message ? 'true' : undefined}
						aria-errormessage={errors.message ? 'message-error' : undefined}
						class="w-full border border-(--indigo-dye)/20 bg-white p-2 focus:border-(--vermilion) aria-invalid:border-(--vermilion)"
					/>
					<FieldError
						id="message-error"
						message={errors.message}
						class="text-sm text-(--vermilion)"
					/>
				</div>

				<Button
					type="submit"
					class="bg-(--ink) px-6 py-2 text-white transition-colors hover:bg-(--vermilion)"
				>
					Submit
				</Button>
			</Form>

			{#if submitted}
				<pre
					class="mt-6 overflow-x-auto border border-(--matcha)/30 bg-(--matcha)/10 p-4 text-sm text-(--charcoal)">{submitted}</pre>
			{/if}
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>FieldError</span>
			<span class="ml-2 text-lg text-(--bamboo)">検証メッセージ</span>
		</h2>

		<div class="japanese-border bg-linear-to-br from-white to-(--cream) p-8">
			<ul class="space-y-4">
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Renders <code class="rounded bg-(--cream) px-1">role="alert"</code> +
						<code class="rounded bg-(--cream) px-1">aria-live</code> when message present</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80">Renders nothing when no message — clean DOM</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Pair with <code class="rounded bg-(--cream) px-1">aria-errormessage</code> +
						<code class="rounded bg-(--cream) px-1">aria-invalid</code> on the input</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)">✓</span>
					<span class="text-(--charcoal)/80"
						>Style invalid inputs with <code class="rounded bg-(--cream) px-1">aria-invalid:</code> Tailwind
						variant</span
					>
				</li>
			</ul>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'onsubmit', type: '(data: FormData) => void', default: 'undefined' },
			{ name: 'novalidate', type: 'boolean', default: 'false' },
			{ name: 'aria-label', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;form&gt;</code> — submit on Enter inside any field',
			'<code class="rounded bg-(--cream) px-1">&lt;FieldError&gt;</code> auto-wires <code class="rounded bg-(--cream) px-1">role="alert"</code> for live error announcement',
			'Group related fields with <code class="rounded bg-(--cream) px-1">&lt;Fieldset&gt;</code> for screen-reader context'
		]}
	/>
</main>
