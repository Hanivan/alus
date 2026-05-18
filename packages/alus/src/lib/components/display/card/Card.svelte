<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus:card');

	export interface CardContext {
		titleId: string;
		descriptionId: string;
		hasTitle: () => boolean;
		setHasTitle: (v: boolean) => void;
		hasDescription: () => boolean;
		setHasDescription: (v: boolean) => void;
	}

	export function getCardContext(): CardContext {
		const ctx = getContext<CardContext | undefined>(KEY);
		if (!ctx) throw new Error('Card subcomponent must be inside <Card>');
		return ctx;
	}

	export function setCardContext(ctx: CardContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		as?: 'article' | 'section' | 'div';
	}

	let { children, class: className = '', as = 'article' }: Props = $props();

	let hasTitle = $state(false);
	let hasDescription = $state(false);

	const titleId = generateCounterId('card-title');
	const descriptionId = generateCounterId('card-description');

	setCardContext({
		titleId,
		descriptionId,
		hasTitle: () => hasTitle,
		setHasTitle: (v) => (hasTitle = v),
		hasDescription: () => hasDescription,
		setHasDescription: (v) => (hasDescription = v)
	});
</script>

<svelte:element
	this={as}
	class={className}
	aria-labelledby={hasTitle ? titleId : undefined}
	aria-describedby={hasDescription ? descriptionId : undefined}
>
	{#if children}{@render children()}{/if}
</svelte:element>
