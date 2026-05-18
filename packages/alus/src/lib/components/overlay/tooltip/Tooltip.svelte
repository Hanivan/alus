<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus:tooltip');

	export interface TooltipContext {
		open: () => boolean;
		setOpen: (v: boolean) => void;
		openDelay: () => number;
		closeDelay: () => number;
		disabled: () => boolean;
		triggerEl: { current: HTMLElement | null };
		setTriggerEl: (el: HTMLElement | null) => void;
		contentId: string;
		scheduleOpen: () => void;
		scheduleClose: () => void;
		cancel: () => void;
	}

	export function getTooltipContext(): TooltipContext {
		const ctx = getContext<TooltipContext | undefined>(KEY);
		if (!ctx) throw new Error('Tooltip subcomponent must be inside <Tooltip>');
		return ctx;
	}

	export function setTooltipContext(ctx: TooltipContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		openDelay?: number;
		closeDelay?: number;
		disabled?: boolean;
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		open = $bindable(false),
		openDelay = 200,
		closeDelay = 100,
		disabled = false,
		onOpenChange
	}: Props = $props();

	let triggerEl = $state<HTMLElement | null>(null);
	const contentId = generateCounterId('tooltip-content');

	let timer: ReturnType<typeof setTimeout> | undefined;

	function cancel() {
		if (timer !== undefined) {
			clearTimeout(timer);
			timer = undefined;
		}
	}

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	function scheduleOpen() {
		if (disabled) return;
		cancel();
		timer = setTimeout(() => setOpen(true), openDelay);
	}

	function scheduleClose() {
		cancel();
		timer = setTimeout(() => setOpen(false), closeDelay);
	}

	setTooltipContext({
		open: () => open,
		setOpen,
		openDelay: () => openDelay,
		closeDelay: () => closeDelay,
		disabled: () => disabled,
		triggerEl: {
			get current() {
				return triggerEl;
			}
		},
		setTriggerEl: (el) => (triggerEl = el),
		contentId,
		scheduleOpen,
		scheduleClose,
		cancel
	});
</script>

{#if children}{@render children()}{/if}
