<script lang="ts">
	import { labelAttrs, mergeAttrs } from '$utils/a11y/index.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Target = '_self' | '_blank' | '_parent' | '_top';

	interface Props extends Omit<HTMLAnchorAttributes, 'children'> {
		children?: import('svelte').Snippet;
		// Required, and re-declared for exactly that reason: `HTMLAnchorAttributes.href` is
		// `string | undefined | null`, so leaving `href` to the native type would silently make it
		// optional — `<Link>go</Link>` would compile and render an `<a>` with no destination,
		// where HEAD made it an error. A declared member wins over the inherited optional one.
		href: string;
		external?: boolean;
		// `target` and `rel` stay declared because the script reads each of them — they feed the
		// `computedTarget`/`computedRel` fallbacks. That is rule 2, so they must not also travel
		// in `rest`. `target` is a narrow union, but it is a *subset* of
		// `HTMLAttributeAnchorTarget` (which ends in `(string & {})`), so the inherited
		// declaration cannot collapse it.
		target?: Target;
		rel?: string;
		current?: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false';
		// Computed in the markup (`download === true ? '' : …`), so it stays under rule 3.
		download?: string | boolean;
		id?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
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
		...rest
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
	{...rest}
	{href}
	{id}
	class={className}
	target={computedTarget}
	rel={computedRel}
	aria-current={current}
	data-external={isExternal || undefined}
	download={download === true ? '' : (download as string | undefined)}
	{...ariaAttrs}
>
	{#if children}{@render children()}{/if}
</a>
