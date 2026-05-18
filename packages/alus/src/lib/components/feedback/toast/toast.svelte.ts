import { getContext, setContext, untrack } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

const KEY = Symbol('alus-ui:toaster');

export type ToastType = 'polite' | 'assertive';
export type HoverBehavior = 'pause' | 'pause-all' | null;
export type TabHiddenBehavior = 'pause-all' | null;

export interface ToasterProps {
	closeDelay?: number;
	type?: ToastType;
	hover?: HoverBehavior;
	tabHidden?: TabHiddenBehavior;
}

export interface AddToastArgs<T = Record<string, unknown>> {
	id?: string;
	closeDelay?: number;
	type?: ToastType;
	data: T;
}

export interface UpdateToastArgs<T = Record<string, unknown>> {
	id: string;
	closeDelay?: number;
	type?: ToastType;
	data?: T;
}

let counter = 0;
function genId(prefix: string): string {
	return `alus-${prefix}-${++counter}`;
}

function isTouchEvent(e: PointerEvent): boolean {
	return e.pointerType === 'touch';
}

/**
 * rAF-driven elapsed timer. Pauses cleanly (no drift from setTimeout).
 */
class AnimationFrames {
	#cb: (info: { delta: number }) => void;
	#raf: number | null = null;
	#last = 0;

	constructor(cb: (info: { delta: number }) => void) {
		this.#cb = cb;
	}

	start() {
		if (this.#raf != null) return;
		this.#last = performance.now();
		const tick = (now: number) => {
			const delta = now - this.#last;
			this.#last = now;
			this.#cb({ delta });
			this.#raf = requestAnimationFrame(tick);
		};
		this.#raf = requestAnimationFrame(tick);
	}

	stop() {
		if (this.#raf == null) return;
		cancelAnimationFrame(this.#raf);
		this.#raf = null;
	}
}

interface ToastInternalProps<T> {
	toaster: Toaster<T>;
	id: string;
	closeDelay: number;
	type: ToastType;
	data: T;
}

export class Toast<T = Record<string, unknown>> {
	#props: ToastInternalProps<T>;
	#contentId: string;
	#titleId: string;
	#descriptionId: string;
	#frames: AnimationFrames | undefined;

	readonly id: string;
	readonly createdAt: number;
	data: T = $state() as T;
	closeDelay = $state(0);
	type = $state<ToastType>('polite');
	timeElapsed = $state(0);

	readonly percentage = $derived(
		this.closeDelay > 0 ? (100 * this.timeElapsed) / this.closeDelay : 0
	);

	constructor(props: ToastInternalProps<T>) {
		this.#props = props;
		this.id = props.id;
		this.data = props.data;
		this.closeDelay = props.closeDelay;
		this.type = props.type;
		this.createdAt = performance.now();
		this.#contentId = genId('toast-content');
		this.#titleId = genId('toast-title');
		this.#descriptionId = genId('toast-description');

		if (this.closeDelay > 0) {
			this.#frames = new AnimationFrames(({ delta }) => {
				this.timeElapsed += delta;
				if (this.timeElapsed >= this.closeDelay) {
					this.removeSelf();
				}
			});
			this.#frames.start();
		}
	}

	get toaster() {
		return this.#props.toaster;
	}

	readonly removeSelf = () => {
		this.#props.toaster.removeToast(this.id);
	};

	/** @internal */
	readonly cleanup = () => {
		this.#frames?.stop();
	};

	readonly pause = () => {
		this.#frames?.stop();
	};

	readonly resume = () => {
		this.#frames?.start();
	};

	readonly reset = () => {
		this.timeElapsed = 0;
		this.#frames?.start();
	};

	get content() {
		const onpointerenter = (e: PointerEvent) => {
			if (isTouchEvent(e)) return;
			const hover = this.#props.toaster.hover;
			if (hover === 'pause') this.pause();
			else if (hover === 'pause-all') this.#props.toaster.pauseAll();
		};
		const onpointerleave = (e: PointerEvent) => {
			if (isTouchEvent(e)) return;
			const hover = this.#props.toaster.hover;
			if (hover === 'pause') this.resume();
			else if (hover === 'pause-all') this.#props.toaster.resumeAll();
		};
		return {
			id: this.#contentId,
			role: this.type === 'assertive' ? 'alert' : 'status',
			'aria-labelledby': this.#titleId,
			'aria-describedby': this.#descriptionId,
			'aria-live': this.type,
			'aria-atomic': 'true',
			tabindex: -1,
			'data-toast-id': this.id,
			onpointerenter,
			onpointerleave
		} as const;
	}

	get title() {
		return { id: this.#titleId } as const;
	}

	get description() {
		return { id: this.#descriptionId } as const;
	}

	get close() {
		return {
			type: 'button',
			'aria-label': 'Dismiss',
			onclick: () => this.removeSelf()
		} as const;
	}
}

export class Toaster<T = Record<string, unknown>> {
	closeDelay = $state(5000);
	type = $state<ToastType>('polite');
	hover = $state<HoverBehavior>('pause');
	tabHidden = $state<TabHiddenBehavior>('pause-all');

	#toastsMap = new SvelteMap<string, Toast<T>>();
	#visibilityCleanup?: () => void;

	readonly toasts = $derived(Array.from(this.#toastsMap.values()));

	constructor(props: ToasterProps = {}) {
		if (props.closeDelay !== undefined) this.closeDelay = props.closeDelay;
		if (props.type !== undefined) this.type = props.type;
		if (props.hover !== undefined) this.hover = props.hover;
		if (props.tabHidden !== undefined) this.tabHidden = props.tabHidden;

		if (typeof document !== 'undefined') {
			const onVisibility = () => {
				if (this.tabHidden === 'pause-all' && document.hidden) this.pauseAll();
				else this.resumeAll();
			};
			document.addEventListener('visibilitychange', onVisibility);
			this.#visibilityCleanup = () =>
				document.removeEventListener('visibilitychange', onVisibility);
		}
	}

	addToast = (args: AddToastArgs<T>): Toast<T> => {
		const id = args.id ?? genId('toast');
		const toast = new Toast<T>({
			toaster: this,
			id,
			closeDelay: args.closeDelay ?? this.closeDelay,
			type: args.type ?? this.type,
			data: args.data
		});
		this.#toastsMap.set(id, toast);
		return toast;
	};

	removeToast = (id: string) => {
		const t = this.#toastsMap.get(id);
		if (!t) return;
		this.#toastsMap.delete(id);
		t.cleanup();
	};

	updateToast = (args: UpdateToastArgs<T>) => {
		const t = this.#toastsMap.get(args.id);
		if (!t) return;
		if (args.data !== undefined) t.data = args.data;
		if (typeof args.closeDelay === 'number') t.closeDelay = args.closeDelay;
		if (typeof args.type === 'string') t.type = args.type;
	};

	pauseAll = () => {
		for (const t of this.toasts) t.pause();
	};

	resumeAll = () => {
		for (const t of this.toasts) t.resume();
	};

	clear = () => {
		for (const t of this.toasts) t.cleanup();
		this.#toastsMap.clear();
	};

	/** @internal */
	dispose = () => {
		this.clear();
		this.#visibilityCleanup?.();
		this.#visibilityCleanup = undefined;
	};
}

export function setToasterContext<T = Record<string, unknown>>(toaster: Toaster<T>) {
	setContext(KEY, toaster);
}

export function getToasterContext<T = Record<string, unknown>>(): Toaster<T> {
	const t = getContext<Toaster<T> | undefined>(KEY);
	if (!t) throw new Error('Toaster context missing. Place <Toaster /> in your layout.');
	return t;
}

export function createToaster<T = Record<string, unknown>>(props: ToasterProps = {}): Toaster<T> {
	return untrack(() => new Toaster<T>(props));
}
