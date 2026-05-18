<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus:popover');

	export interface PopoverContext {
		open: () => boolean;
		setOpen: (v: boolean) => void;
		disabled: () => boolean;
		triggerEl: { current: HTMLElement | null };
		setTriggerEl: (el: HTMLElement | null) => void;
		contentEl: { current: HTMLElement | null };
		setContentEl: (el: HTMLElement | null) => void;
		contentId: string;
		triggerId: string;
	}

	export function getPopoverContext(): PopoverContext {
		const ctx = getContext<PopoverContext | undefined>(KEY);
		if (!ctx) throw new Error('Popover subcomponent must be inside <Popover>');
		return ctx;
	}

	export function setPopoverContext(ctx: PopoverContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		disabled?: boolean;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		open = $bindable(false),
		disabled = false,
		onOpenChange
	}: Props = $props();

	let triggerEl = $state<HTMLElement | null>(null);
	let contentEl = $state<HTMLElement | null>(null);

	const triggerId = generateCounterId('popover-trigger');
	const contentId = generateCounterId('popover-content');

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	setPopoverContext({
		open: () => open,
		setOpen,
		disabled: () => disabled,
		triggerEl: {
			get current() {
				return triggerEl;
			}
		},
		setTriggerEl: (el) => (triggerEl = el),
		contentEl: {
			get current() {
				return contentEl;
			}
		},
		setContentEl: (el) => (contentEl = el),
		contentId,
		triggerId
	});
</script>

{#if children}{@render children()}{/if}
