<script lang="ts">
	import { CaretLeft, Info, CheckCircle, Warning, XCircle } from 'phosphor-svelte';
	import { InlineMessage, Input, Button } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<InlineMessage variant="error">
	{#snippet icon()}<XCircle class="h-4 w-4" />{/snippet}
	Please enter a valid email address.
</InlineMessage>`;

	let email = $state('');
	let submitted = $state(false);

	const emailValid = $derived(email === '' || /.+@.+\..+/.test(email));
	const showError = $derived(submitted && !emailValid);
	const showSuccess = $derived(submitted && emailValid && email !== '');
</script>

<svelte:head>
	<title>InlineMessage · Alus Components</title>
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
			<div class="hanko-seal">伝</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">InlineMessage</h1>
				<p class="tracking-widest text-(--bamboo)">注釈</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Small, inline message attached to a form field or paragraph. Picks
			<code>role=alert</code> for error / warning, otherwise <code>status</code>.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Form field validation</h2>

		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<label class="block">
				<span class="mb-1 block text-sm text-(--ink)">Email</span>
				<Input
					type="email"
					bind:value={email}
					placeholder="hello@example.com"
					class="w-full max-w-md rounded border border-(--charcoal)/20 bg-white px-3 py-2 text-(--ink) outline-none focus:border-(--indigo-dye)"
				/>
			</label>

			{#if showError}
				<InlineMessage
					variant="error"
					class="inline-flex items-center gap-1.5 text-sm text-(--vermilion)"
				>
					{#snippet icon()}<XCircle class="h-4 w-4" />{/snippet}
					Please enter a valid email address.
				</InlineMessage>
			{:else if showSuccess}
				<InlineMessage
					variant="success"
					class="inline-flex items-center gap-1.5 text-sm text-(--matcha)"
				>
					{#snippet icon()}<CheckCircle class="h-4 w-4" />{/snippet}
					Looks good.
				</InlineMessage>
			{:else}
				<InlineMessage class="inline-flex items-center gap-1.5 text-sm text-(--charcoal)/60">
					{#snippet icon()}<Info class="h-4 w-4" />{/snippet}
					We will only use this for account recovery.
				</InlineMessage>
			{/if}

			<Button
				onclick={() => (submitted = true)}
				class="rounded border border-(--indigo-dye) bg-(--indigo-dye) px-4 py-2 text-sm text-white"
			>
				Submit
			</Button>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Variants</h2>
		<div class="japanese-border space-y-2 bg-white/50 p-8 backdrop-blur-sm">
			<InlineMessage variant="info" class="inline-flex items-center gap-1.5 text-sm text-(--indigo-dye)">
				{#snippet icon()}<Info class="h-4 w-4" />{/snippet}
				This field is optional.
			</InlineMessage>
			<br />
			<InlineMessage variant="success" class="inline-flex items-center gap-1.5 text-sm text-(--matcha)">
				{#snippet icon()}<CheckCircle class="h-4 w-4" />{/snippet}
				Username available.
			</InlineMessage>
			<br />
			<InlineMessage
				variant="warning"
				class="inline-flex items-center gap-1.5 text-sm text-(--muted-gold)"
			>
				{#snippet icon()}<Warning class="h-4 w-4" />{/snippet}
				Weak password.
			</InlineMessage>
			<br />
			<InlineMessage variant="error" class="inline-flex items-center gap-1.5 text-sm text-(--vermilion)">
				{#snippet icon()}<XCircle class="h-4 w-4" />{/snippet}
				Username already taken.
			</InlineMessage>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'variant', type: "'info' | 'success' | 'warning' | 'error'", default: "'info'" },
			{ name: 'icon', type: 'Snippet', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Auto-picks <code class="rounded bg-(--cream) px-1">role="alert"</code> for error / warning, <code class="rounded bg-(--cream) px-1">role="status"</code> for info / success',
			'Associate with form fields via <code class="rounded bg-(--cream) px-1">aria-describedby</code> or <code class="rounded bg-(--cream) px-1">aria-errormessage</code>',
			'Pair invalid fields with <code class="rounded bg-(--cream) px-1">aria-invalid="true"</code>',
			'Icon is decorative — message text carries the meaning'
		]}
	/>
</main>
