<script lang="ts" module>
	export type Placement =
		| 'top-left'
		| 'top-right'
		| 'top-center'
		| 'bottom-left'
		| 'bottom-right'
		| 'bottom-center';
</script>

<script lang="ts" generics="T extends Record<string, unknown> = Record<string, unknown>">
	import { untrack } from 'svelte';
	import Portal from '../../utility/portal/Portal.svelte';
	import {
		Toaster as ToasterClass,
		setToasterContext,
		type Toast,
		type ToastType,
		type HoverBehavior,
		type TabHiddenBehavior
	} from './toast.svelte.js';

	interface Props {
		children?: import('svelte').Snippet;
		toast: import('svelte').Snippet<[Toast<T>]>;
		toaster?: ToasterClass<T>;
		closeDelay?: number;
		type?: ToastType;
		hover?: HoverBehavior;
		tabHidden?: TabHiddenBehavior;
		placement?: Placement;
		class?: string;
		'aria-label'?: string;
		live?: 'polite' | 'assertive';
	}

	let {
		children,
		toast: toastSnippet,
		toaster: providedToaster,
		closeDelay,
		type,
		hover,
		tabHidden,
		placement = 'bottom-right',
		class: className = '',
		'aria-label': ariaLabel = 'Notifications',
		live = 'polite'
	}: Props = $props();

	const t = untrack(
		() => providedToaster ?? new ToasterClass<T>({ closeDelay, type, hover, tabHidden })
	);
	setToasterContext(t as ToasterClass<Record<string, unknown>>);
</script>

{#if children}{@render children()}{/if}

<Portal>
	<ol
		role="region"
		aria-label={ariaLabel}
		aria-live={live}
		aria-relevant="additions text"
		class={className}
		data-placement={placement}
	>
		{#each t.toasts as toastInstance (toastInstance.id)}
			<li data-toast-id={toastInstance.id}>
				{@render toastSnippet(toastInstance)}
			</li>
		{/each}
	</ol>
</Portal>
