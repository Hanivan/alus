<script lang="ts">
	import { CaretLeft } from 'phosphor-svelte';
	import { Conditional, Button } from 'alus';

	let signedIn = $state(false);
	let count = $state(0);
</script>

<svelte:head>
	<title>Conditional · Alus Components</title>
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
			<div class="hanko-seal">条</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Conditional</h1>
				<p class="tracking-widest text-(--bamboo)">条件</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Render <code>children</code> when <code>when</code> is truthy, else optional
			<code>fallback</code> snippet. Convenience wrapper around <code>&#123;#if&#125;</code>.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Sign-in state</h2>
		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<Button
				onclick={() => (signedIn = !signedIn)}
				class="rounded border border-(--indigo-dye) bg-(--indigo-dye) px-3 py-1.5 text-sm text-white"
			>
				{signedIn ? 'Sign out' : 'Sign in'}
			</Button>

			<Conditional when={signedIn}>
				<p class="rounded bg-(--matcha)/10 p-3 text-sm text-(--matcha)">Welcome back!</p>
				{#snippet fallback()}
					<p class="rounded bg-(--charcoal)/5 p-3 text-sm text-(--charcoal)/70">
						Please sign in to continue.
					</p>
				{/snippet}
			</Conditional>
		</div>
	</section>

	<section class="mb-16">
		<h2 class="font-display mb-6 text-2xl text-(--ink)">Truthy check</h2>
		<div class="japanese-border space-y-3 bg-white/50 p-8 backdrop-blur-sm">
			<Button onclick={() => count++} class="rounded border border-(--charcoal)/20 px-3 py-1.5 text-sm text-(--ink)">
				Increment ({count})
			</Button>
			<Conditional when={count > 3}>
				<p class="text-sm text-(--vermilion)">Whoa, that&apos;s a lot of clicks.</p>
			</Conditional>
		</div>
	</section>
</main>
