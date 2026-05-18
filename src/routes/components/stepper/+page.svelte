<script lang="ts">
	import { CaretLeft, Check } from 'phosphor-svelte';
	import { Stepper, StepperStep, Button } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<Stepper value={1} steps={3}>
	<StepperStep index={0}>Account</StepperStep>
	<StepperStep index={1}>Address</StepperStep>
	<StepperStep index={2}>Confirm</StepperStep>
</Stepper>`;

	let current = $state(1);
	const steps = [
		{ title: 'Account', kanji: '口' },
		{ title: 'Profile', kanji: '顔' },
		{ title: 'Preferences', kanji: '好' },
		{ title: 'Confirm', kanji: '完' }
	];
</script>

<svelte:head>
	<title>Stepper · Alus Components</title>
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
			<div class="hanko-seal">階</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Stepper</h1>
				<p class="tracking-widest text-(--bamboo)">段階</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Wizard step indicator with completed / current / upcoming status and aria-current.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Linear (click prior steps)</h2>

		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<Stepper bind:current aria-label="Onboarding" class="mb-8 flex items-center gap-2">
				{#each steps as step, i}
					<StepperStep index={i} class="flex flex-1 items-center gap-3">
						{#snippet children({ status })}
							<span
								class="flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors"
								style={status === 'completed'
									? 'background:var(--matcha);border-color:var(--matcha);color:white;'
									: status === 'current'
										? 'background:var(--vermilion);border-color:var(--vermilion);color:white;'
										: 'border-color:rgba(45,45,45,0.2);color:rgba(45,45,45,0.4);'}
							>
								{#if status === 'completed'}
									<Check class="h-5 w-5" weight="bold" />
								{:else}
									<span class="font-display">{i + 1}</span>
								{/if}
							</span>
							<span class="flex flex-col text-left">
								<span class="font-display text-sm text-(--charcoal)/50">{step.kanji}</span>
								<span
									class="text-sm font-medium"
									style={status === 'upcoming' ? 'color:rgba(45,45,45,0.4);' : 'color:var(--ink);'}
								>
									{step.title}
								</span>
							</span>
							{#if i < steps.length - 1}
								<span
									class="ml-3 h-px flex-1"
									style={status === 'completed'
										? 'background:var(--matcha);'
										: 'background:rgba(45,45,45,0.15);'}
								></span>
							{/if}
						{/snippet}
					</StepperStep>
				{/each}
			</Stepper>

			<div class="flex justify-between border-t border-(--indigo-dye)/20 pt-6">
				<Button
					onclick={() => (current = Math.max(0, current - 1))}
					disabled={current === 0}
					class="rounded border border-(--indigo-dye) px-4 py-2 text-(--indigo-dye) hover:bg-(--indigo-dye) hover:text-white disabled:opacity-30"
				>
					Back
				</Button>
				<Button
					onclick={() => (current = Math.min(steps.length - 1, current + 1))}
					disabled={current === steps.length - 1}
					class="rounded bg-(--vermilion) px-4 py-2 text-white hover:opacity-90 disabled:opacity-30"
				>
					Next
				</Button>
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'value', type: 'number', default: '0', description: 'Bindable current step index' },
			{ name: 'steps', type: 'number', default: 'required', description: 'Total step count' },
			{ name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'" },
			{
				name: 'index',
				type: 'number',
				default: 'required',
				description: '<code>StepperStep</code>'
			},
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="group"</code> + <code class="rounded bg-(--cream) px-1">aria-label</code>',
			'Current step marked with <code class="rounded bg-(--cream) px-1">aria-current="step"</code>',
			'Completed / current / upcoming states surfaced as <code class="rounded bg-(--cream) px-1">data-state</code>',
			'Pair with form sections that themselves announce errors via <code class="rounded bg-(--cream) px-1">aria-invalid</code>'
		]}
	/>
</main>
