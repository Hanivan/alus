<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { RadioGroup, Radio } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { RadioGroup, Radio } from 'alus-ui';
	let plan = $state('pro');
<\/script>

<RadioGroup name="plan" bind:value={plan} legend="Choose a plan">
	<Radio value="free" /> Free
	<Radio value="pro" /> Pro
	<Radio value="team" /> Team
</RadioGroup>`;

	let plan = $state('pro');
	let size = $state('m');
</script>

<svelte:head>
	<title>RadioGroup · Alus Components</title>
	<meta name="description" content="Radio button group" />
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
			<div class="hanko-seal">群</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">RadioGroup</h1>
				<p class="tracking-widest text-(--bamboo)">ラジオグループ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Group radio buttons with a shared name and orientation.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Vertical</span>
			<span class="ml-2 text-lg text-(--bamboo)">縦</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<RadioGroup name="plan" bind:value={plan} aria-label="Subscription plan" class="space-y-3">
				<label class="flex items-center gap-3 text-(--charcoal)">
					<Radio name="plan" value="free" bind:group={plan} class="accent-(--vermilion)" />
					<span>Free</span>
				</label>
				<label class="flex items-center gap-3 text-(--charcoal)">
					<Radio name="plan" value="pro" bind:group={plan} class="accent-(--vermilion)" />
					<span>Pro</span>
				</label>
				<label class="flex items-center gap-3 text-(--charcoal)">
					<Radio name="plan" value="enterprise" bind:group={plan} class="accent-(--vermilion)" />
					<span>Enterprise</span>
				</label>
			</RadioGroup>
			<p class="mt-4 text-sm text-(--charcoal)/60">Selected: {plan}</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Horizontal</span>
			<span class="ml-2 text-lg text-(--bamboo)">横</span>
		</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<RadioGroup
				name="size"
				bind:value={size}
				orientation="horizontal"
				aria-label="Size"
				class="flex gap-6"
			>
				{#each ['s', 'm', 'l', 'xl'] as s}
					<label class="flex items-center gap-2 text-(--charcoal) uppercase">
						<Radio name="size" value={s} bind:group={size} class="accent-(--vermilion)" />
						<span>{s}</span>
					</label>
				{/each}
			</RadioGroup>
			<p class="mt-4 text-sm text-(--charcoal)/60">Selected: {size}</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'name', type: 'string', default: 'undefined', description: 'Shared form name' },
			{ name: 'value', type: 'string', default: 'undefined', description: 'Bindable selection' },
			{ name: 'legend', type: 'string', default: 'undefined' },
			{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'vertical'" },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="radiogroup"</code> on the group',
			'Arrow keys cycle, Tab moves in/out of group (roving tabindex)',
			'<code class="rounded bg-(--cream) px-1">aria-orientation</code> reflects layout',
			'Provides <code class="rounded bg-(--cream) px-1">RadioGroupContext</code> so child Radios share name'
		]}
	/>
</main>
