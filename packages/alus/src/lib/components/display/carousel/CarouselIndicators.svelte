<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { getCarouselContext } from './Carousel.svelte';

	type Props = Omit<SvelteHTMLElements['div'], 'children'> & {
		item?: import('svelte').Snippet<[{ index: number; active: boolean }]>;
		// Kept: the destructure default below is the tablist's only accessible name, so
		// deleting it would silently drop `aria-label="Choose slide"` from the DOM.
		'aria-label'?: string;
	};

	let {
		class: className = '',
		item,
		'aria-label': ariaLabel = 'Choose slide',
		...rest
	}: Props = $props();
	const ctx = getCarouselContext();

	let listEl: HTMLDivElement | null = $state(null);

	function focusActive(i: number) {
		queueMicrotask(() => {
			const btn = listEl?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[i];
			btn?.focus();
		});
	}

	function onKeydown(e: KeyboardEvent) {
		const n = ctx.count();
		if (!n) return;
		const cur = ctx.index();
		let target = -1;
		switch (e.key) {
			case 'ArrowRight':
			case 'ArrowDown':
				target = (cur + 1) % n;
				break;
			case 'ArrowLeft':
			case 'ArrowUp':
				target = (cur - 1 + n) % n;
				break;
			case 'Home':
				target = 0;
				break;
			case 'End':
				target = n - 1;
				break;
		}
		if (target >= 0) {
			e.preventDefault();
			ctx.goTo(target);
			focusActive(target);
		}
	}
</script>

<div
	{...rest}
	role="tablist"
	tabindex="-1"
	aria-label={ariaLabel}
	class={className}
	onkeydown={onKeydown}
	bind:this={listEl}
>
	{#each Array.from({ length: ctx.count() }, (_, idx) => idx) as i (i)}
		{@const active = ctx.index() === i}
		<button
			type="button"
			role="tab"
			aria-selected={active}
			aria-controls={ctx.slidesId}
			aria-label={`Go to slide ${i + 1}`}
			tabindex={active ? 0 : -1}
			data-active={active || undefined}
			onclick={() => ctx.goTo(i)}
		>
			{#if item}{@render item({ index: i, active })}{:else}<span aria-hidden="true">●</span>{/if}
		</button>
	{/each}
</div>
