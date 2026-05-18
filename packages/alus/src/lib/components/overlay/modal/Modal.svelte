<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const KEY = Symbol('alus:modal');

	export interface ModalContext {
		open: () => boolean;
		setOpen: (v: boolean) => void;
		modal: () => boolean;
		role: () => 'dialog' | 'alertdialog';
		triggerEl: { current: HTMLElement | null };
		setTriggerEl: (el: HTMLElement | null) => void;
		contentId: string;
		titleId: string;
		descriptionId: string;
		hasTitle: () => boolean;
		setHasTitle: (v: boolean) => void;
		hasDescription: () => boolean;
		setHasDescription: (v: boolean) => void;
	}

	export function getModalContext(): ModalContext {
		const ctx = getContext<ModalContext | undefined>(KEY);
		if (!ctx) throw new Error('Modal subcomponent must be inside <Modal>');
		return ctx;
	}

	export function setModalContext(ctx: ModalContext) {
		setContext(KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		open?: boolean;
		modal?: boolean;
		role?: 'dialog' | 'alertdialog';
		onOpenChange?: (open: boolean) => void;
	}

	let {
		children,
		open = $bindable(false),
		modal = true,
		role = 'dialog',
		onOpenChange
	}: Props = $props();

	let triggerEl = $state<HTMLElement | null>(null);
	let hasTitle = $state(false);
	let hasDescription = $state(false);

	const contentId = generateCounterId('modal-content');
	const titleId = generateCounterId('modal-title');
	const descriptionId = generateCounterId('modal-description');

	function setOpen(v: boolean) {
		open = v;
		onOpenChange?.(v);
	}

	setModalContext({
		open: () => open,
		setOpen,
		modal: () => modal,
		role: () => role,
		triggerEl: {
			get current() {
				return triggerEl;
			}
		},
		setTriggerEl: (el) => (triggerEl = el),
		contentId,
		titleId,
		descriptionId,
		hasTitle: () => hasTitle,
		setHasTitle: (v) => (hasTitle = v),
		hasDescription: () => hasDescription,
		setHasDescription: (v) => (hasDescription = v)
	});
</script>

{#if children}{@render children()}{/if}
