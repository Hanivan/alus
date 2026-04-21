<script lang="ts">
	import { CaretLeft, Check } from 'phosphor-svelte';
	import { Radio } from 'alus';

	let preferredContact = $state('email');
	let plan = $state('free');
	let experience = $state('');
	let satisfaction = $state('');
</script>

<svelte:head>
	<title>Radio · Alus Components</title>
	<meta name="description" content="Accessible radio button component with proper ARIA support and keyboard navigation" />
</svelte:head>

<a
	href="/"
	class="inline-flex items-center gap-2 text-(--indigo-dye) hover:text-(--vermilion) transition-colors duration-300 mb-8"
>
	<CaretLeft class="w-5 h-5" />
	<span class="font-medium">Back to Components</span>
</a>

<main>
	<!-- Header -->
	<header class="mb-16">
		<div class="flex items-center gap-6 mb-6">
			<div class="hanko-seal">◎</div>
			<div>
				<h1 class="font-display text-5xl md:text-6xl text-(--ink) mb-2">Radio</h1>
				<p class="text-(--bamboo) tracking-widest">ラジオボタン</p>
			</div>
		</div>
		<p class="text-xl text-(--charcoal)/70 max-w-2xl">
			An accessible radio button component with proper ARIA support and keyboard navigation.
		</p>
	</header>

	<!-- Basic Radio Group -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Basic Radio Group</span>
			<span class="text-(--bamboo) text-lg ml-2">基本ラジオグループ</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<fieldset>
				<legend class="font-semibold text-(--ink) mb-4 px-2">Preferred Contact Method</legend>

				<div class="space-y-3" role="group" aria-labelledby="contact-label">
					<div class="flex items-center gap-3">
						<Radio
							bind:group={preferredContact}
							value="email"
							name="contact"
							class="w-5 h-5 accent-(--indigo-dye)"
							id="contact-email"
							aria-label="Email contact"
						/>
						<label
							for="contact-email"
							class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
						>
							Email
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={preferredContact}
							value="phone"
							name="contact"
							class="w-5 h-5 accent-(--indigo-dye)"
							id="contact-phone"
							aria-label="Phone contact"
						/>
						<label
							for="contact-phone"
							class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
						>
							Phone
						</label>
					</div>

					<div class="flex items-center gap-3">
						<Radio
							bind:group={preferredContact}
							value="mail"
							name="contact"
							class="w-5 h-5 accent-(--indigo-dye)"
							id="contact-mail"
							aria-label="Mail contact"
						/>
						<label
							for="contact-mail"
							class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
						>
							Mail
						</label>
					</div>
				</div>

				<div
					role="status"
					aria-live="polite"
					class="mt-4 text-sm text-(--charcoal)/60"
				>
					Selected: {preferredContact}
				</div>
			</fieldset>
		</div>
	</section>

	<!-- Plan Selection -->
	<section class="mb-16">
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Plan Selection</span>
			<span class="text-(--bamboo) text-lg ml-2">プラン選択</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<fieldset>
				<legend class="font-semibold text-(--ink) mb-4 px-2">Choose Your Plan</legend>

				<div class="space-y-4">
					<div class="flex items-center gap-3 p-3 border-2 {plan === 'free' ? 'border-(--indigo-dye)' : 'border-(--indigo-dye)/10'} rounded transition-colors">
						<Radio
							bind:group={plan}
							value="free"
							name="plan"
							class="w-5 h-5 accent-(--indigo-dye)"
							id="plan-free"
							aria-label="Free plan"
						/>
						<label
							for="plan-free"
							class="flex-1 cursor-pointer select-none hover:opacity-80 transition-opacity duration-200"
						>
							<div class="font-medium text-(--ink)">Free Plan</div>
							<div class="text-sm text-(--charcoal)/60">Basic features, no credit card required</div>
						</label>
					</div>

					<div class="flex items-center gap-3 p-3 border-2 {plan === 'pro' ? 'border-(--indigo-dye)' : 'border-(--indigo-dye)/10'} rounded transition-colors">
						<Radio
							bind:group={plan}
							value="pro"
							name="plan"
							class="w-5 h-5 accent-(--indigo-dye)"
							id="plan-pro"
							aria-label="Pro plan"
						/>
						<label
							for="plan-pro"
							class="flex-1 cursor-pointer select-none hover:opacity-80 transition-opacity duration-200"
						>
							<div class="font-medium text-(--ink)">Pro Plan</div>
							<div class="text-sm text-(--charcoal)/60">$10/month, advanced features</div>
						</label>
					</div>

					<div class="flex items-center gap-3 p-3 border-2 {plan === 'enterprise' ? 'border-(--indigo-dye)' : 'border-(--indigo-dye)/10'} rounded transition-colors">
						<Radio
							bind:group={plan}
							value="enterprise"
							name="plan"
							class="w-5 h-5 accent-(--indigo-dye)"
							id="plan-enterprise"
							aria-label="Enterprise plan"
						/>
						<label
							for="plan-enterprise"
							class="flex-1 cursor-pointer select-none hover:opacity-80 transition-opacity duration-200"
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
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Disabled State</span>
			<span class="text-(--bamboo) text-lg ml-2">無効状態</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<fieldset>
				<legend class="font-semibold text-(--ink) mb-4 px-2">Level of Experience</legend>

				<div class="space-y-3">
					<div class="flex items-center gap-3">
						<Radio
							bind:group={experience}
							value="beginner"
							name="experience"
							disabled
							class="w-5 h-5 accent-(--indigo-dye)"
							id="exp-beginner"
							aria-label="Beginner"
						/>
						<label
							for="exp-beginner"
							class="text-(--charcoal) cursor-pointer select-none opacity-50"
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
							class="w-5 h-5 accent-(--indigo-dye)"
							id="exp-intermediate"
							aria-label="Intermediate"
						/>
						<label
							for="exp-intermediate"
							class="text-(--charcoal) cursor-pointer select-none opacity-50"
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
							class="w-5 h-5 accent-(--indigo-dye)"
							id="exp-advanced"
							aria-label="Advanced"
						/>
						<label
							for="exp-advanced"
							class="text-(--charcoal) cursor-pointer select-none opacity-50"
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
		<h2 class="font-display text-2xl text-(--ink) mb-8">
			<span>Required Field</span>
			<span class="text-(--bamboo) text-lg ml-2">必須項目</span>
		</h2>

		<div class="japanese-border p-8 bg-white/50 backdrop-blur-sm">
			<fieldset>
				<legend class="font-semibold text-(--ink) mb-4 px-2">
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
							class="w-5 h-5 accent-(--indigo-dye)"
							id="sat-very"
							aria-label="Very satisfied"
						/>
						<label
							for="sat-very"
							class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
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
							class="w-5 h-5 accent-(--indigo-dye)"
							id="sat-satisfied"
							aria-label="Satisfied"
						/>
						<label
							for="sat-satisfied"
							class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
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
							class="w-5 h-5 accent-(--indigo-dye)"
							id="sat-neutral"
							aria-label="Neutral"
						/>
						<label
							for="sat-neutral"
							class="text-(--charcoal) cursor-pointer select-none hover:text-(--indigo-dye) transition-colors duration-200"
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
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">group</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">unknown</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">undefined</code></td>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">value</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">''</code></td>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">name</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">string</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">undefined</code></td>
					</tr>
					<tr class="border-b border-(--indigo-dye)/10">
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">disabled</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">false</code></td>
					</tr>
					<tr>
						<td class="py-3 px-4"><code class="text-sm bg-(--cream) px-2 py-1 rounded">required</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">boolean</code></td>
						<td class="py-3 px-4 text-sm text-(--charcoal)/70"><code class="text-sm">false</code></td>
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
					<span class="text-(--matcha) mt-0.5"><Check class="w-4 h-4" /></span>
					<span class="text-(--charcoal)/80">Semantic HTML with native <code class="bg-(--cream) px-1 rounded">&lt;input type="radio"&gt;</code> element</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5"><Check class="w-4 h-4" /></span>
					<span class="text-(--charcoal)/80">Full ARIA support (aria-label, aria-labelledby, aria-describedby)</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5"><Check class="w-4 h-4" /></span>
					<span class="text-(--charcoal)/80">Keyboard navigation with arrow keys and Space/Enter</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5"><Check class="w-4 h-4" /></span>
					<span class="text-(--charcoal)/80">Proper fieldset/legend grouping for screen readers</span>
				</li>
				<li class="flex items-start gap-3">
					<span class="text-(--matcha) mt-0.5"><Check class="w-4 h-4" /></span>
					<span class="text-(--charcoal)/80">Name attribute groups radios for mutual exclusion</span>
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
				<li>Tab to focus on a radio group</li>
				<li>Use <kbd class="px-2 py-1 bg-white rounded text-sm font-mono">Arrow</kbd> keys to navigate options</li>
				<li>Press <kbd class="px-2 py-1 bg-white rounded text-sm font-mono">Space</kbd> or <kbd class="px-2 py-1 bg-white rounded text-sm font-mono">Enter</kbd> to select</li>
				<li>Verify screen reader announces selection</li>
			</ol>
		</div>
	</section>
</main>
