<script lang="ts">
	import { CaretLeft, CheckCircle, Warning, XCircle, Info, X } from 'phosphor-svelte';
	import { Toaster, createToaster, Button, type ToastPlacement } from 'alus';
	import DemoFooter from '$components/DemoFooter.svelte';

	const code = `<script lang="ts">
	import { Toaster, createToaster } from 'alus';
	const tt = createToaster<{ title: string }>();
<\/script>

<Toaster toaster={tt} placement="bottom-right" closeDelay={4000}>
	{#snippet toast(t)}
		<div {...t.content}>
			<p {...t.title}>{t.data.title}</p>
			<button {...t.close}>×</button>
		</div>
	{/snippet}
</Toaster>

<button onclick={() => tt.addToast({ data: { title: 'Saved' } })}>
	Toast
</button>`;

	type Variant = 'default' | 'success' | 'error' | 'warning' | 'info';
	type ToastData = {
		title?: string;
		description?: string;
		variant?: Variant;
		action?: { label: string; onClick: () => void };
	};

	const tt = createToaster<ToastData>();

	let placement = $state<ToastPlacement>('bottom-right');

	const placements: { value: ToastPlacement; label: string }[] = [
		{ value: 'top-left', label: '↖ top-left' },
		{ value: 'top-center', label: '↑ top-center' },
		{ value: 'top-right', label: '↗ top-right' },
		{ value: 'bottom-left', label: '↙ bottom-left' },
		{ value: 'bottom-center', label: '↓ bottom-center' },
		{ value: 'bottom-right', label: '↘ bottom-right' }
	];

	const placementClass = $derived.by(() => {
		const base = 'pointer-events-none fixed z-50 m-0 flex w-80 list-none flex-col gap-2 p-0';
		switch (placement) {
			case 'top-left':
				return `${base} top-6 left-6 items-start`;
			case 'top-center':
				return `${base} top-6 left-1/2 -translate-x-1/2 items-center`;
			case 'top-right':
				return `${base} top-6 right-6 items-end`;
			case 'bottom-left':
				return `${base} bottom-6 left-6 items-start flex-col-reverse`;
			case 'bottom-center':
				return `${base} bottom-6 left-1/2 -translate-x-1/2 items-center flex-col-reverse`;
			case 'bottom-right':
			default:
				return `${base} right-6 bottom-6 items-end flex-col-reverse`;
		}
	});

	function variantIcon(v?: Variant) {
		if (v === 'success') return CheckCircle;
		if (v === 'error') return XCircle;
		if (v === 'warning') return Warning;
		return Info;
	}

	function variantColor(v?: Variant) {
		if (v === 'success') return 'var(--matcha)';
		if (v === 'error') return 'var(--vermilion)';
		if (v === 'warning') return 'var(--muted-gold)';
		return 'var(--indigo-dye)';
	}
</script>

<svelte:head>
	<title>Toast · Alus Components</title>
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
			<div class="hanko-seal">告</div>
			<div>
				<h1 class="font-display mb-2 text-5xl text-(--ink) md:text-6xl">Toast</h1>
				<p class="tracking-widest text-(--bamboo)">通知</p>
			</div>
		</div>
		<p class="max-w-2xl text-xl text-(--charcoal)/70">
			Headless toaster modeled on Melt UI. <code>Toaster</code> class owns state; component spreads
			attrs. Hover pauses the timer, tab-hidden pauses all. Animation-frame timer for clean
			pause/resume — no setTimeout drift.
		</p>
	</header>

	<Toaster
		toaster={tt}
		{placement}
		closeDelay={4000}
		hover="pause"
		tabHidden="pause-all"
		class={placementClass}
	>
		{#snippet toast(t)}
			{@const Icon = variantIcon(t.data.variant)}
			<div
				{...t.content}
				class="pointer-events-auto flex items-start gap-3 rounded border border-(--charcoal)/15 bg-white p-4 shadow-lg outline-none"
				style={`border-left:4px solid ${variantColor(t.data.variant)};`}
			>
				<Icon class="mt-0.5 h-5 w-5 shrink-0" style={`color:${variantColor(t.data.variant)};`} />
				<div class="flex-1">
					{#if t.data.title}
						<p {...t.title} class="font-display text-sm text-(--ink)">{t.data.title}</p>
					{/if}
					{#if t.data.description}
						<p {...t.description} class="mt-1 text-xs text-(--charcoal)/70">
							{t.data.description}
						</p>
					{/if}
					{#if t.data.action}
						<button
							type="button"
							class="mt-2 inline-flex text-xs font-medium text-(--indigo-dye) underline-offset-2 hover:underline"
							onclick={() => {
								t.data.action?.onClick();
								t.removeSelf();
							}}
						>
							{t.data.action.label}
						</button>
					{/if}
					{#if t.closeDelay > 0}
						<div class="mt-2 h-0.5 w-full overflow-hidden rounded bg-(--charcoal)/10">
							<div
								class="h-full"
								style={`width:${Math.min(100, t.percentage)}%;background:${variantColor(t.data.variant)};`}
							></div>
						</div>
					{/if}
				</div>
				<button
					{...t.close}
					class="rounded p-1 text-(--charcoal)/50 hover:bg-(--charcoal)/5 hover:text-(--ink)"
				>
					<X class="h-4 w-4" />
				</button>
			</div>
		{/snippet}

		{#snippet children()}
			<section class="mb-12">
				<h2 class="font-display mb-6 text-2xl text-(--ink)">Placement</h2>
				<div class="japanese-border bg-white/50 p-6 backdrop-blur-sm">
					<div role="radiogroup" aria-label="Toast placement" class="grid grid-cols-3 gap-2">
						{#each placements as p}
							<button
								type="button"
								role="radio"
								aria-checked={placement === p.value}
								onclick={() => (placement = p.value)}
								class="rounded border px-3 py-2 text-sm transition-colors"
								style={placement === p.value
									? 'background:var(--indigo-dye);border-color:var(--indigo-dye);color:white;'
									: 'border-color:rgba(45,45,45,0.2);color:var(--ink);'}
							>
								{p.label}
							</button>
						{/each}
					</div>
					<p class="mt-3 font-mono text-xs text-(--charcoal)/60">
						current: <code>{placement}</code>
					</p>
				</div>
			</section>

			<section class="mb-16">
				<h2 class="font-display mb-8 text-2xl text-(--ink)">Trigger variants</h2>

				<div class="japanese-border flex flex-wrap gap-3 bg-white/50 p-8 backdrop-blur-sm">
					<Button
						onclick={() =>
							tt.addToast({
								data: { title: 'Saved', description: 'Settings synced to the cloud.', variant: 'success' }
							})}
						class="rounded border border-(--matcha) bg-(--matcha) px-4 py-2 text-sm text-white"
					>
						Success
					</Button>
					<Button
						onclick={() =>
							tt.addToast({
								type: 'assertive',
								data: { title: 'Heads up', description: 'Token expires in 5 minutes.', variant: 'warning' }
							})}
						class="rounded border border-(--muted-gold) bg-(--muted-gold) px-4 py-2 text-sm text-(--ink)"
					>
						Warning
					</Button>
					<Button
						onclick={() =>
							tt.addToast({
								type: 'assertive',
								data: {
									title: 'Upload failed',
									description: 'Could not reach the server.',
									variant: 'error',
									action: {
										label: 'Retry',
										onClick: () =>
											tt.addToast({ data: { title: 'Retrying…', variant: 'info' } })
									}
								}
							})}
						class="rounded border border-(--vermilion) bg-(--vermilion) px-4 py-2 text-sm text-white"
					>
						Error + action
					</Button>
					<Button
						onclick={() =>
							tt.addToast({
								closeDelay: 0,
								data: { title: 'Persistent', description: 'Stays until dismissed.', variant: 'info' }
							})}
						class="rounded border border-(--indigo-dye) px-4 py-2 text-sm text-(--indigo-dye)"
					>
						Persistent
					</Button>
					<Button
						onclick={() => tt.clear()}
						class="rounded border border-(--charcoal)/30 px-4 py-2 text-sm text-(--charcoal)"
					>
						Clear all
					</Button>
				</div>

				<p class="mt-4 font-mono text-sm text-(--charcoal)/60">
					Hover any toast to pause its timer. Switch tabs to pause all.
				</p>
			</section>
		{/snippet}
	</Toaster>

	<DemoFooter
		{code}
		props={[
			{ name: 'toaster', type: 'Toaster<T>', default: 'required', description: 'From <code>createToaster()</code>' },
			{ name: 'placement', type: 'ToastPlacement', default: "'bottom-right'" },
			{ name: 'closeDelay', type: 'number', default: '4000', description: 'ms; 0 = persistent' },
			{ name: 'hover', type: "'pause' | 'pause-all' | null", default: "'pause'" },
			{ name: 'tabHidden', type: "'pause' | 'pause-all' | null", default: "'pause-all'" },
			{ name: 'type', type: "'polite' | 'assertive'", default: "'polite'", description: 'Per-toast override' }
		]}
		a11y={[
			'<code class="rounded bg-(--cream) px-1">role="region"</code> + <code class="rounded bg-(--cream) px-1">aria-label="Notifications"</code> wraps the toast list',
			'Each toast renders with <code class="rounded bg-(--cream) px-1">role="status"</code> (polite) or <code class="rounded bg-(--cream) px-1">role="alert"</code> (assertive)',
			'Hover / focus / tab-hidden pause the auto-dismiss timer so SR users can read',
			'Close button is a real <code class="rounded bg-(--cream) px-1">&lt;button&gt;</code> with <code class="rounded bg-(--cream) px-1">aria-label="Close"</code>'
		]}
	/>
</main>
