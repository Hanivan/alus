<script lang="ts">
	import { getStepperContext } from './Stepper.svelte';

	interface Props {
		index: number;
		children?: import('svelte').Snippet<[{ status: 'completed' | 'current' | 'upcoming' }]>;
		class?: string;
		disabled?: boolean;
	}

	let { index, children, class: className = '', disabled = false }: Props = $props();

	const ctx = getStepperContext();
	const status: 'completed' | 'current' | 'upcoming' = $derived(
		index < ctx.current() ? 'completed' : index === ctx.current() ? 'current' : 'upcoming'
	);
	const clickable = $derived(!disabled && (!ctx.linear() || index <= ctx.current()));

	function onClick() {
		if (!clickable) return;
		ctx.setCurrent(index);
	}

	function onKeydown(e: KeyboardEvent) {
		if (!clickable) return;
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			ctx.setCurrent(index);
		}
	}
</script>

<li
	class={className}
	data-status={status}
	data-disabled={disabled || undefined}
	aria-current={status === 'current' ? 'step' : undefined}
>
	{#if clickable}
		<button
			type="button"
			class="contents text-left"
			onclick={onClick}
			onkeydown={onKeydown}
			aria-label={`Step ${index + 1}`}
		>
			{#if children}{@render children({ status })}{/if}
		</button>
	{:else}
		<span class="contents" aria-disabled={disabled || undefined}>
			{#if children}{@render children({ status })}{/if}
		</span>
	{/if}
</li>
