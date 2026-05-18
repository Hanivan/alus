<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Fieldset, Input } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Fieldset legend="Contact details" class="rounded border-2 border-(--indigo-dye)/20 p-4">
	<Input type="text" placeholder="Name" />
	<Input type="email" placeholder="Email" />
</Fieldset>`;

	let street = $state('');
	let city = $state('');
</script>

<svelte:head>
	<title>Fieldset · Alus Components</title>
	<meta name="description" content="Group related form fields" />
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
			<div class="hanko-seal">組</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Fieldset</h1>
				<p class="tracking-widest text-(--bamboo)">フィールドセット</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Semantically group related form controls with a legend.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>With Legend</span>
			<span class="ml-2 text-lg text-(--bamboo)">凡例</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Fieldset
				class="space-y-4 border border-(--indigo-dye)/20 p-6"
				legendClass="px-2 text-sm font-medium text-(--charcoal)"
			>
				{#snippet legend()}Shipping Address{/snippet}

				<div class="space-y-1">
					<label for="street" class="block text-sm text-(--charcoal)/80">Street</label>
					<Input
						id="street"
						bind:value={street}
						class="w-full border border-(--indigo-dye)/20 bg-white p-2 focus:border-(--vermilion) focus:outline-none"
					/>
				</div>
				<div class="space-y-1">
					<label for="city" class="block text-sm text-(--charcoal)/80">City</label>
					<Input
						id="city"
						bind:value={city}
						class="w-full border border-(--indigo-dye)/20 bg-white p-2 focus:border-(--vermilion) focus:outline-none"
					/>
				</div>
			</Fieldset>

			<p class="mt-4 text-sm text-(--charcoal)/70">
				Address:
				<span class="text-(--ink)">{street || '—'}, {city || '—'}</span>
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Disabled Group</span>
			<span class="ml-2 text-lg text-(--bamboo)">無効</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Fieldset
				disabled
				class="space-y-4 border border-(--indigo-dye)/20 p-6 opacity-60"
				legendClass="px-2 text-sm font-medium text-(--charcoal)"
			>
				{#snippet legend()}Account (disabled){/snippet}
				<Input placeholder="Username" class="w-full border border-(--indigo-dye)/20 bg-white p-2" />
				<Input
					type="password"
					placeholder="Password"
					class="w-full border border-(--indigo-dye)/20 bg-white p-2"
				/>
			</Fieldset>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'legend', type: 'string', default: 'undefined', description: 'Visible group label' },
			{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all child form controls' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;fieldset&gt;</code> + <code class="rounded bg-(--cream) px-1">&lt;legend&gt;</code> — semantic grouping',
			'Screen readers announce the legend when entering any child field',
			'<code class="rounded bg-(--cream) px-1">disabled</code> cascades to all descendants natively'
		]}
	/>
</main>
