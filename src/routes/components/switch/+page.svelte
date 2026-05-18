<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Switch, Label } from 'alus-ui';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Switch } from 'alus-ui';
	let on = $state(true);
<\/script>

<Switch
	bind:checked={on}
	aria-label="Notifications"
	class="h-6 w-11 rounded-full bg-(--charcoal)/20 data-[state=on]:bg-(--vermilion)"
	thumbClass="block h-5 w-5 rounded-full bg-white transition-transform data-[state=on]:translate-x-5"
/>`;

	let notifications = $state(true);
	let darkMode = $state(false);
</script>

<svelte:head>
	<title>Switch · Alus Components</title>
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
			<div class="hanko-seal">切</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Switch</h1>
				<p class="tracking-widest text-(--bamboo)">スイッチ</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Toggle switch with <code class="rounded bg-(--cream) px-1">role="switch"</code> and Space/Enter
			keyboard activation.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">
			<span>Usage</span>
			<span class="ml-2 text-lg text-(--bamboo)">使用</span>
		</h2>

		<div class="japanese-border space-y-6 bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex items-center justify-between">
				<Label for="notifications" class="text-(--charcoal)">Notifications</Label>
				<Switch
					id="notifications"
					bind:checked={notifications}
					class="relative inline-flex h-6 w-11 items-center border border-(--indigo-dye)/20 transition-colors data-[state=checked]:bg-(--vermilion) data-[state=unchecked]:bg-white"
				>
					{#snippet children({ checked })}
						<span
							class="inline-block h-4 w-4 transform bg-(--ink) transition-transform"
							style:transform={checked ? 'translateX(1.25rem)' : 'translateX(0.25rem)'}
						></span>
					{/snippet}
				</Switch>
			</div>

			<div class="flex items-center justify-between">
				<Label for="dark" class="text-(--charcoal)">Dark mode</Label>
				<Switch
					id="dark"
					bind:checked={darkMode}
					class="relative inline-flex h-6 w-11 items-center border border-(--indigo-dye)/20 transition-colors data-[state=checked]:bg-(--vermilion) data-[state=unchecked]:bg-white"
				>
					{#snippet children({ checked })}
						<span
							class="inline-block h-4 w-4 transform bg-(--ink) transition-transform"
							style:transform={checked ? 'translateX(1.25rem)' : 'translateX(0.25rem)'}
						></span>
					{/snippet}
				</Switch>
			</div>

			<p class="text-sm text-(--charcoal)/60">
				Notifications: {notifications ? 'on' : 'off'} · Dark mode: {darkMode ? 'on' : 'off'}
			</p>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'checked', type: 'boolean', default: 'false', description: 'Bindable' },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'required', type: 'boolean', default: 'false' },
			{ name: 'name', type: 'string', default: 'undefined' },
			{ name: 'value', type: 'string', default: "'on'" },
			{ name: 'aria-label', type: 'string', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" },
			{ name: 'thumbClass', type: 'string', default: "''" }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="switch"</code> + <code class="rounded bg-(--cream) px-1">aria-checked</code>',
			'Space and Enter toggle',
			'<code class="rounded bg-(--cream) px-1">data-state="on"|"off"</code> for visual styling',
			'Pair with <code class="rounded bg-(--cream) px-1">&lt;Label&gt;</code> or use <code class="rounded bg-(--cream) px-1">aria-label</code>'
		]}
	/>
</main>
