<script lang="ts">
	import { CaretLeft, Check } from 'phosphor-svelte';
	import { Radio } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Radio } from 'alus';
	let choice = $state('email');
<\/script>

<Radio name="contact" value="email" bind:group={choice} class="h-4 w-4" /> Email
<Radio name="contact" value="phone" bind:group={choice} class="h-4 w-4" /> Phone`;

	let preferredContact = $state('email');
	let plan = $state('free');
	let experience = $state('');
	let satisfaction = $state('');
</script>

<svelte:head>
	<title>Radio · Alus Components</title>
	<meta
		name="description"
		content="Accessible radio button component with proper ARIA support and keyboard navigation"
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
			<div class="hanko-seal">◎</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Radio</h1>
				<p class="tracking-widest text-(--bamboo)">ラジオボタン</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			An accessible radio button component with proper ARIA support and keyboard navigation.
		</p>
	</header>

	<!-- Basic Radio Group -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Basic Radio Group</span>
			<span class="ml-2 text-lg text-(--bamboo)">基本ラジオグループ</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<fieldset>
				<legend class="mb-4 px-2 font-semibold text-(--ink)">Preferred Contact Method</legend>

				<div class="space-y-3" role="group" aria-labelledby="contact-label">
					<div class="flex items-center gap-3">
						<Radio
							bind:group={preferredContact}
							value="email"
							name="contact"
							class="h-5 w-5 accent-(--indigo-dye)"
							id="contact-email"
							aria-label="Email contact"
						/>
						<label
							for="contact-email"
							class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>
							Email
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={preferredContact}
							value="phone"
							name="contact"
							class="h-5 w-5 accent-(--indigo-dye)"
							id="contact-phone"
							aria-label="Phone contact"
						/>
						<label
							for="contact-phone"
							class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>
							Phone
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={preferredContact}
							value="mail"
							name="contact"
							class="h-5 w-5 accent-(--indigo-dye)"
							id="contact-mail"
							aria-label="Mail contact"
						/>
						<label
							for="contact-mail"
							class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>
							Mail
						</label>
					</div>
				</div>

				<div role="status" aria-live="polite" class="mt-4 text-sm text-(--charcoal)/60">
					Selected: {preferredContact}
				</div>
			</fieldset>
		</div>
	</section>

	<!-- Plan Selection -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Plan Selection</span>
			<span class="ml-2 text-lg text-(--bamboo)">プラン選択</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<fieldset>
				<legend class="mb-4 px-2 font-semibold text-(--ink)">Choose Your Plan</legend>

				<div class="space-y-4">
					<div
						class="flex items-center gap-3 border-2 p-3 {plan === 'free'
							? 'border-(--indigo-dye)'
							: 'border-(--indigo-dye)/10'} rounded transition-colors"
					>
						<Radio
							bind:group={plan}
							value="free"
							name="plan"
							class="h-5 w-5 accent-(--indigo-dye)"
							id="plan-free"
							aria-label="Free plan"
						/>
						<label
							for="plan-free"
							class="flex-1 cursor-pointer transition-opacity duration-200 select-none hover:opacity-80"
						>
							<div class="font-medium text-(--ink)">Free Plan</div>
							<div class="text-sm text-(--charcoal)/60">
								Basic features, no credit card required
							</div>
						</label>
					</div>

					<div
						class="flex items-center gap-3 border-2 p-3 {plan === 'pro'
							? 'border-(--indigo-dye)'
							: 'border-(--indigo-dye)/10'} rounded transition-colors"
					>
						<Radio
							bind:group={plan}
							value="pro"
							name="plan"
							class="h-5 w-5 accent-(--indigo-dye)"
							id="plan-pro"
							aria-label="Pro plan"
						/>
						<label
							for="plan-pro"
							class="flex-1 cursor-pointer transition-opacity duration-200 select-none hover:opacity-80"
						>
							<div class="font-medium text-(--ink)">Pro Plan</div>
							<div class="text-sm text-(--charcoal)/60">$10/month, advanced features</div>
						</label>
					</div>

					<div
						class="flex items-center gap-3 border-2 p-3 {plan === 'enterprise'
							? 'border-(--indigo-dye)'
							: 'border-(--indigo-dye)/10'} rounded transition-colors"
					>
						<Radio
							bind:group={plan}
							value="enterprise"
							name="plan"
							class="h-5 w-5 accent-(--indigo-dye)"
							id="plan-enterprise"
							aria-label="Enterprise plan"
						/>
						<label
							for="plan-enterprise"
							class="flex-1 cursor-pointer transition-opacity duration-200 select-none hover:opacity-80"
						>
							<div class="font-medium text-(--ink)">Enterprise Plan</div>
							<div class="text-sm text-(--charcoal)/60">Custom pricing, dedicated support</div>
						</label>
					</div>
				</div>
			</fieldset>
		</div>
	</section>

	<!-- Disabled State -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Disabled State</span>
			<span class="ml-2 text-lg text-(--bamboo)">無効状態</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<fieldset>
				<legend class="mb-4 px-2 font-semibold text-(--ink)">Level of Experience</legend>

				<div class="space-y-3">
					<div class="flex items-center gap-3">
						<Radio
							bind:group={experience}
							value="beginner"
							name="experience"
							disabled
							class="h-5 w-5 accent-(--indigo-dye)"
							id="exp-beginner"
							aria-label="Beginner"
						/>
						<label
							for="exp-beginner"
							class="cursor-pointer text-(--charcoal) opacity-50 select-none"
						>
							Beginner (Disabled)
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={experience}
							value="intermediate"
							name="experience"
							disabled
							class="h-5 w-5 accent-(--indigo-dye)"
							id="exp-intermediate"
							aria-label="Intermediate"
						/>
						<label
							for="exp-intermediate"
							class="cursor-pointer text-(--charcoal) opacity-50 select-none"
						>
							Intermediate (Disabled)
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={experience}
							value="advanced"
							name="experience"
							disabled
							class="h-5 w-5 accent-(--indigo-dye)"
							id="exp-advanced"
							aria-label="Advanced"
						/>
						<label
							for="exp-advanced"
							class="cursor-pointer text-(--charcoal) opacity-50 select-none"
						>
							Advanced (Disabled)
						</label>
					</div>
				</div>
			</fieldset>
		</div>
	</section>

	<!-- Required Field -->
	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Required Field</span>
			<span class="ml-2 text-lg text-(--bamboo)">必須項目</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<fieldset>
				<legend class="mb-4 px-2 font-semibold text-(--ink)">
					Satisfaction Level
					<span class="text-(--vermilion)" aria-label="required">*</span>
				</legend>

				<div class="space-y-3">
					<div class="flex items-center gap-3">
						<Radio
							bind:group={satisfaction}
							value="very-satisfied"
							name="satisfaction"
							required
							class="h-5 w-5 accent-(--indigo-dye)"
							id="sat-very"
							aria-label="Very satisfied"
						/>
						<label
							for="sat-very"
							class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>
							Very Satisfied
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={satisfaction}
							value="satisfied"
							name="satisfaction"
							required
							class="h-5 w-5 accent-(--indigo-dye)"
							id="sat-satisfied"
							aria-label="Satisfied"
						/>
						<label
							for="sat-satisfied"
							class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>
							Satisfied
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={satisfaction}
							value="neutral"
							name="satisfaction"
							required
							class="h-5 w-5 accent-(--indigo-dye)"
							id="sat-neutral"
							aria-label="Neutral"
						/>
						<label
							for="sat-neutral"
							class="cursor-pointer text-(--charcoal) transition-colors duration-200 select-none hover:text-(--indigo-dye)"
						>
							Neutral
						</label>
					</div>
				</div>
			</fieldset>
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
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">group</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">unknown</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">undefined</code></td
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
							><code class="rounded bg-(--cream) px-2 py-1 text-sm">name</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">string</code></td
						>
						<td class="px-4 py-3 text-sm text-(--charcoal)/70"
							><code class="text-sm">undefined</code></td
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
					<tr>
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
							>&lt;input type="radio"&gt;</code
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
					<span class="text-(--charcoal)/80"
						>Keyboard navigation with arrow keys and Space/Enter</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)"><Check class="h-4 w-4" /></span>
					<span class="text-(--charcoal)/80"
						>Proper fieldset/legend grouping for screen readers</span
					>
				</li>
				<li class="flex items-start gap-3">
					<span class="mt-0.5 text-(--matcha)"><Check class="h-4 w-4" /></span>
					<span class="text-(--charcoal)/80">Name attribute groups radios for mutual exclusion</span
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
				<li>Tab to focus on a radio group</li>
				<li>
					Use <kbd class="rounded bg-white px-2 py-1 font-mono text-sm">Arrow</kbd> keys to navigate options
				</li>
				<li>
					Press <kbd class="rounded bg-white px-2 py-1 font-mono text-sm">Space</kbd> or
					<kbd class="rounded bg-white px-2 py-1 font-mono text-sm">Enter</kbd> to select
				</li>
				<li>Verify screen reader announces selection</li>
			</ol>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'name', type: 'string', default: 'undefined', description: 'Groups radios with the same name' },
			{ name: 'value', type: 'string', default: 'undefined' },
			{ name: 'group', type: 'string', default: 'undefined', description: 'Bindable — the selected value' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'aria-label', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Native <code class="rounded bg-(--cream) px-1">&lt;input type="radio"&gt;</code>',
			'Same <code class="rounded bg-(--cream) px-1">name</code> auto-groups for tab navigation (Tab to group, Arrows within)',
			'Use <code class="rounded bg-(--cream) px-1">&lt;RadioGroup&gt;</code> or <code class="rounded bg-(--cream) px-1">&lt;Fieldset&gt;</code> for an accessible group label',
			'Arrow keys cycle within group, Space selects',
			'Pair each Radio with a <code class="rounded bg-(--cream) px-1">&lt;Label&gt;</code>'
		]}
	/>
</main>
