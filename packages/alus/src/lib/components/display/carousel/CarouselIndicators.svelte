<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';

	interface Props {
		class?: string;
		item?: import('svelte').Snippet<[{ index: number; active: boolean }]>;
		'aria-label'?: string;
	}

	let { class: className = '', item, 'aria-label': ariaLabel = 'Choose slide' }: Props = $props();
	const ctx = getCarouselContext();
</script>

<div role="tablist" aria-label={ariaLabel} class={className}>
	{#each Array(ctx.count()) as _, i (i)}
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
