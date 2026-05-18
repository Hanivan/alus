<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { TimePicker, type Time } from 'alus';

	let t1 = $state<Time | null>({ hour: 9, minute: 30 });
	let t2 = $state<Time | null>({ hour: 14, minute: 0 });
	let t3 = $state<Time | null>({ hour: 23, minute: 59, second: 30 });
</script>

<svelte:head>
	<title>TimePicker · Alus Components</title>
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
			<div class="hanko-seal">時</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">TimePicker</h1>
				<p class="tracking-widest text-(--bamboo)">時刻選択</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Hour / minute (/ second) numeric inputs with ArrowUp/Down to step. Optional
			<code>hour12</code> AM/PM toggle.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">24-hour</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<TimePicker
				bind:value={t1}
				aria-label="Meeting time"
				class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 bg-white px-2 py-1.5 text-(--ink)"
				fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
				separatorClass="text-(--charcoal)/40"
			/>
			<p class="mt-3 text-sm text-(--charcoal)/60">
				Value: {t1 ? `${t1.hour}:${String(t1.minute).padStart(2, '0')}` : '—'}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">12-hour (AM/PM)</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<TimePicker
				bind:value={t2}
				hour12
				aria-label="Meeting time (12h)"
				class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 bg-white px-2 py-1.5 text-(--ink)"
				fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
				separatorClass="text-(--charcoal)/40"
				periodClass="ml-1 rounded border border-(--charcoal)/20 px-2 py-0.5 text-xs text-(--ink) aria-pressed:border-(--indigo-dye) aria-pressed:bg-(--indigo-dye) aria-pressed:text-white"
			/>
			<p class="mt-3 text-sm text-(--charcoal)/60">
				Value: {t2 ? `${t2.hour}:${String(t2.minute).padStart(2, '0')}` : '—'}
			</p>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">With seconds</h2>
		<div class="japanese-border bg-white/50 p-8 backdrop-blur-sm">
			<TimePicker
				bind:value={t3}
				showSeconds
				step={5}
				aria-label="Precise time"
				class="inline-flex items-center gap-1 rounded border border-(--charcoal)/20 bg-white px-2 py-1.5 text-(--ink)"
				fieldClass="w-10 bg-transparent text-center text-sm outline-none focus:text-(--indigo-dye)"
				separatorClass="text-(--charcoal)/40"
			/>
		</div>
	</section>
</main>
