<script lang="ts">
	import { CaretLeft, Heart, Bell, Gear, Trash, Plus, Star } from 'phosphor-svelte';
	import { IconButton } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<IconButton aria-label="Delete item" onclick={() => remove()}>
	<Trash class="h-5 w-5" />
</IconButton>`;

	let liked = $state(false);
	let starred = $state(false);
</script>

<svelte:head>
	<title>IconButton · Alus Components</title>
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
			<div class="hanko-seal">押</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">IconButton</h1>
				<p class="tracking-widest text-(--bamboo)">標釦</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Icon-only button. <code>aria-label</code> is required. Supports
			<code>aria-pressed</code> for toggles, plus standard
			<code>aria-expanded</code> / <code>aria-controls</code> / <code>aria-haspopup</code>.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Variants</h2>

		<div class="japanese-border flex flex-wrap gap-3 bg-white/50 p-8 backdrop-blur-sm">
			<IconButton
				aria-label="Add"
				class="flex h-10 w-10 items-center justify-center rounded-full border border-(--charcoal)/15 bg-white text-(--ink) hover:border-(--vermilion)"
			>
				<Plus class="h-5 w-5" />
			</IconButton>

			<IconButton
				aria-label={liked ? 'Unlike' : 'Like'}
				aria-pressed={liked}
				onclick={() => (liked = !liked)}
				class="flex h-10 w-10 items-center justify-center rounded-full border border-(--charcoal)/15 bg-white hover:border-(--vermilion)"
				style={liked ? 'color:var(--vermilion);background:rgba(231,76,60,0.08);' : ''}
			>
				<Heart class="h-5 w-5" weight={liked ? 'fill' : 'regular'} />
			</IconButton>

			<IconButton
				aria-label={starred ? 'Unstar' : 'Star'}
				aria-pressed={starred}
				onclick={() => (starred = !starred)}
				class="flex h-10 w-10 items-center justify-center rounded-full border border-(--charcoal)/15 bg-white hover:border-(--muted-gold)"
				style={starred ? 'color:var(--muted-gold);background:rgba(212,175,55,0.12);' : ''}
			>
				<Star class="h-5 w-5" weight={starred ? 'fill' : 'regular'} />
			</IconButton>

			<IconButton
				aria-label="Notifications"
				aria-haspopup="menu"
				class="flex h-10 w-10 items-center justify-center rounded-full border border-(--charcoal)/15 bg-white text-(--ink) hover:border-(--indigo-dye)"
			>
				<Bell class="h-5 w-5" />
			</IconButton>

			<IconButton
				aria-label="Settings"
				class="flex h-10 w-10 items-center justify-center rounded-full border border-(--charcoal)/15 bg-white text-(--ink) hover:border-(--indigo-dye)"
			>
				<Gear class="h-5 w-5" />
			</IconButton>

			<IconButton
				aria-label="Delete"
				class="flex h-10 w-10 items-center justify-center rounded-full bg-(--vermilion) text-white hover:bg-(--vermilion)/85"
			>
				<Trash class="h-5 w-5" />
			</IconButton>

			<IconButton
				aria-label="Disabled action"
				disabled
				class="flex h-10 w-10 items-center justify-center rounded-full border border-(--charcoal)/15 bg-white text-(--charcoal)/30"
			>
				<Plus class="h-5 w-5" />
			</IconButton>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'aria-label', type: 'string', default: 'required', description: 'Mandatory — icon has no text' },
			{ name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'" },
			{ name: 'disabled', type: 'boolean', default: 'false' },
			{ name: 'aria-pressed', type: 'boolean', default: 'undefined', description: 'For toggle variant' },
			{ name: 'onclick', type: '(e: MouseEvent) => void', default: 'undefined' },
			{ name: 'class', type: 'string', default: "''" }
		]}
		a11y={[
			'Enforces presence of <code class="rounded bg-(--cream) px-1">aria-label</code> — icon-only buttons have no text',
			'Inner <code class="rounded bg-(--cream) px-1">&lt;svg&gt;</code> is <code class="rounded bg-(--cream) px-1">aria-hidden</code>',
			'Same keyboard contract as Button (Enter/Space)'
		]}
	/>
</main>
