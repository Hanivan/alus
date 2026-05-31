<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import { resolve } from '$app/paths';

	type Target = '_self' | '_blank' | '_parent' | '_top';

	interface Props {
		children?: import('svelte').Snippet;
		href: string;
		external?: boolean;
		target?: Target;
		rel?: string;
		current?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
		download?: string | boolean;
		class?: string;
		id?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		onclick?: (event: MouseEvent) => void;
	}

	let {
		children,
		href,
		external,
		target,
		rel,
		current,
		download,
		class: className = '',
		id,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		onclick
	}: Props = $props();

	let isExternal = $derived(external ?? (typeof href === 'string' && /^https?:\/\//i.test(href)));
	let computedTarget = $derived(target ?? (isExternal ? '_blank' : undefined));
	let computedRel = $derived(rel ?? (isExternal ? 'noopener noreferrer' : undefined));

	let ariaAttrs: Record<string, string> = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby, describedby: ariaDescribedby })
		)
	);
</script>

<a
	href={resolve(href)}
	{id}
	class={className}
	target={computedTarget}
	rel={computedRel}
	aria-current={current}
	data-external={isExternal || undefined}
	download={download === true ? '' : (download as string | undefined)}
	{onclick}
	{...ariaAttrs}
>
	{#if children}{@render children()}{/if}
</a>
