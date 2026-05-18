<script lang="ts">
	import { CaretLeft, Bell, BellRinging } from 'phosphor-svelte';
	import { NotificationBell, Button } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<NotificationBell count={3} max={99} onclick={open}>
	{#snippet children({ hasUnread })}
		{#if hasUnread}<BellRinging class="h-6 w-6" />
		{:else}<Bell class="h-6 w-6" />{/if}
	{/snippet}
</NotificationBell>`;

	let count = $state(3);
	let big = $state(127);
</script>

<svelte:head>
	<title>NotificationBell · Alus Components</title>
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
			<div class="hanko-seal">鈴</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">NotificationBell</h1>
				<p class="tracking-widest text-(--bamboo)">鈴</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Bell button with unread badge. Caps at <code>max</code> (shows <code>99+</code>). Includes a
			polite live announcement when the count changes.
		</p>
	</header>

	<section class="mb-16">
		<h2 class="font-display mb-8 text-2xl text-(--ink)">Counts</h2>

		<div class="japanese-border flex items-end gap-8 bg-white/50 p-8 backdrop-blur-sm">
			<div class="flex flex-col items-center gap-3">
				<NotificationBell
					count={count}
					onclick={() => (count = 0)}
					class="relative rounded-full border border-(--charcoal)/15 bg-white p-3 text-(--ink) hover:border-(--vermilion)"
					badgeClass="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--vermilion) px-1 text-[10px] font-bold text-white"
				>
					{#snippet children({ hasUnread })}
						{#if hasUnread}
							<BellRinging class="h-6 w-6" weight="duotone" />
						{:else}
							<Bell class="h-6 w-6" />
						{/if}
					{/snippet}
				</NotificationBell>
				<span class="font-mono text-xs text-(--charcoal)/60">count: {count}</span>
				<div class="flex gap-1">
					<Button
						onclick={() => (count = Math.max(0, count - 1))}
						class="rounded border border-(--charcoal)/20 px-2 py-1 text-xs"
					>
						−1
					</Button>
					<Button
						onclick={() => (count += 1)}
						class="rounded border border-(--charcoal)/20 px-2 py-1 text-xs"
					>
						+1
					</Button>
				</div>
			</div>

			<div class="flex flex-col items-center gap-3">
				<NotificationBell
					count={big}
					max={99}
					class="relative rounded-full border border-(--charcoal)/15 bg-white p-3 text-(--ink) hover:border-(--vermilion)"
					badgeClass="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--vermilion) px-1 text-[10px] font-bold text-white"
				>
					{#snippet children()}
						<BellRinging class="h-6 w-6" weight="duotone" />
					{/snippet}
				</NotificationBell>
				<span class="font-mono text-xs text-(--charcoal)/60">count: {big} (capped)</span>
				<Button
					onclick={() => (big += 11)}
					class="rounded border border-(--charcoal)/20 px-2 py-1 text-xs"
				>
					+11
				</Button>
			</div>

			<div class="flex flex-col items-center gap-3">
				<NotificationBell
					count={0}
					showZero
					class="relative rounded-full border border-(--charcoal)/15 bg-white p-3 text-(--charcoal)/50"
					badgeClass="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-(--charcoal)/20 px-1 text-[10px] font-bold text-(--ink)"
				>
					{#snippet children()}
						<Bell class="h-6 w-6" />
					{/snippet}
				</NotificationBell>
				<span class="font-mono text-xs text-(--charcoal)/60">count: 0 (showZero)</span>
			</div>
		</div>
	</section>

	<DemoFooter
		{code}
		props={[
			{ name: 'count', type: 'number', default: '0', description: 'Unread item count' },
			{ name: 'max', type: 'number', default: '99', description: 'Caps display — shows <code>99+</code> over' },
			{ name: 'showZero', type: 'boolean', default: 'false', description: 'Render badge when count is 0' },
			{ name: 'onclick', type: '(e) => void', default: 'undefined' },
			{ name: 'badgeClass', type: 'string', default: "''" },
			{ name: 'children', type: 'Snippet<[{ hasUnread }]>', default: 'undefined' }
		]}
		a11y={[
			'Real <code class="rounded bg-(--cream) px-1">&lt;button&gt;</code> with <code class="rounded bg-(--cream) px-1">aria-label</code> like "Notifications, 3 unread"',
			'Count changes emit a polite live announcement automatically',
			'Badge is decorative — count is also encoded into the aria-label',
			'Focusable / keyboard-activatable like any button'
		]}
	/>
</main>
