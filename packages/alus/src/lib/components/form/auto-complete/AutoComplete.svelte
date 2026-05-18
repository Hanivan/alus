<script lang="ts" module>
	export interface AutoCompleteOption<T = unknown> {
		value: T;
		label: string;
		disabled?: boolean;
	}
</script>

<script lang="ts" generics="T">
	import type { Attachment } from 'svelte/attachments';
	import { computePosition, autoUpdate, flip, shift, offset, size } from '@floating-ui/dom';
	import { useEventListener } from 'runed';
	import { generateCounterId } from '$utils/a11y/id.js';
	import {
		labelAttrs,
		validationAttrs,
		interactiveStateAttrs,
		widgetAttrs,
		mergeAttrs
	} from '$utils/a11y/index.js';
	import Portal from '../../utility/portal/Portal.svelte';

	interface Props {
		options: AutoCompleteOption<T>[];
		value?: string;
		selected?: AutoCompleteOption<T> | null;
		open?: boolean;
		placeholder?: string;
		disabled?: boolean;
		required?: boolean;
		minLength?: number;
		maxResults?: number;
		filter?: (option: AutoCompleteOption<T>, query: string) => boolean;
		class?: string;
		inputClass?: string;
		listClass?: string;
		optionClass?: string;
		emptyClass?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		empty?: import('svelte').Snippet<[{ query: string }]>;
		option?: import('svelte').Snippet<
			[{ option: AutoCompleteOption<T>; highlighted: boolean; index: number }]
		>;
		onSelect?: (option: AutoCompleteOption<T>) => void;
		onInput?: (value: string) => void;
	}

	let {
		options,
		value = $bindable(''),
		selected = $bindable(null),
		open = $bindable(false),
		placeholder,
		disabled = false,
		required = false,
		minLength = 0,
		maxResults = 50,
		filter,
		class: className = '',
		inputClass = '',
		listClass = '',
		optionClass = '',
		emptyClass = '',
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		empty,
		option,
		onSelect,
		onInput
	}: Props = $props();

	const listId = generateCounterId('autocomplete-list');
	const optionId = (i: number) => `${listId}-opt-${i}`;

	let inputEl = $state<HTMLInputElement | null>(null);
	let listEl = $state<HTMLUListElement | null>(null);
	let highlighted = $state(0);

	const filtered = $derived.by(() => {
		const q = value.trim().toLowerCase();
		if (q.length < minLength) return [];
		const fn = filter ?? ((o: AutoCompleteOption<T>) => o.label.toLowerCase().includes(q));
		const out: AutoCompleteOption<T>[] = [];
		for (const o of options) {
			if (fn(o, q)) {
				out.push(o);
				if (out.length >= maxResults) break;
			}
		}
		return out;
	});

	const showList = $derived(open && filtered.length > 0);
	const showEmpty = $derived(open && filtered.length === 0 && value.length >= minLength);

	function onInputEvent(e: Event) {
		const v = (e.target as HTMLInputElement).value;
		value = v;
		open = true;
		highlighted = 0;
		selected = null;
		onInput?.(v);
	}

	function select(o: AutoCompleteOption<T>) {
		if (o.disabled) return;
		selected = o;
		value = o.label;
		open = false;
		onSelect?.(o);
	}

	function moveHighlight(dir: 1 | -1) {
		if (!filtered.length) return;
		highlighted = (highlighted + dir + filtered.length) % filtered.length;
	}

	function onKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				if (!open) open = true;
				else moveHighlight(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				moveHighlight(-1);
				break;
			case 'Enter':
				if (open && filtered[highlighted]) {
					e.preventDefault();
					select(filtered[highlighted]);
				}
				break;
			case 'Escape':
				if (open) {
					e.preventDefault();
					open = false;
				}
				break;
			case 'Tab':
				open = false;
				break;
		}
	}

	function onFocus() {
		if (!disabled && value.length >= minLength) open = true;
	}

	const listRef: Attachment<HTMLUListElement> = (node) => {
		listEl = node;
		if (!inputEl) return () => (listEl = null);
		const cleanup = autoUpdate(inputEl, node, async () => {
			const { x, y } = await computePosition(inputEl as HTMLInputElement, node, {
				placement: 'bottom-start',
				strategy: 'fixed',
				middleware: [
					offset(2),
					flip(),
					shift({ padding: 8 }),
					size({
						apply({ rects, elements }) {
							Object.assign(elements.floating.style, {
								minWidth: `${rects.reference.width}px`
							});
						}
					})
				]
			});
			Object.assign(node.style, { left: `${x}px`, top: `${y}px` });
		});

		return () => {
			cleanup();
			listEl = null;
		};
	};

	useEventListener(
		() => (open ? document : null),
		'pointerdown',
		(e) => {
			if (!listEl) return;
			const t = e.target as Node;
			if (listEl.contains(t) || inputEl?.contains(t)) return;
			open = false;
		},
		{ capture: true }
	);

	const inputRef: Attachment<HTMLInputElement> = (node) => {
		inputEl = node;
		return () => {
			inputEl = null;
		};
	};

	const activeId = $derived(showList ? optionId(highlighted) : undefined);

	const inputAriaAttrs = $derived(
		mergeAttrs(
			labelAttrs({ label: ariaLabel, labelledby: ariaLabelledby }),
			interactiveStateAttrs({ expanded: open, disabled }),
			validationAttrs({ required }),
			widgetAttrs({ controls: listId, activedescendant: activeId })
		)
	);
</script>

<div class={className}>
	<input
		type="text"
		role="combobox"
		autocomplete="off"
		spellcheck="false"
		{disabled}
		{required}
		{placeholder}
		{value}
		aria-autocomplete="list"
		class={inputClass}
		oninput={onInputEvent}
		onkeydown={onKeydown}
		onfocus={onFocus}
		{...inputAriaAttrs}
		{@attach inputRef}
	/>

	{#if showList || showEmpty}
		<Portal>
			<ul
				id={listId}
				role="listbox"
				class={listClass}
				style="position:fixed; top:0; left:0;"
				{@attach listRef}
			>
				{#if showList}
					{#each filtered as o, i (o.value)}
						<li
							id={optionId(i)}
							role="option"
							data-highlighted={i === highlighted ? '' : undefined}
							class={optionClass}
							{...interactiveStateAttrs({ selected: i === highlighted, disabled: o.disabled })}
							onmouseenter={() => (highlighted = i)}
							onmousedown={(e) => {
								e.preventDefault();
								select(o);
							}}
						>
							{#if option}
								{@render option({ option: o, highlighted: i === highlighted, index: i })}
							{:else}
								{o.label}
							{/if}
						</li>
					{/each}
				{:else}
					<li role="option" aria-disabled="true" aria-selected="false" class={emptyClass}>
						{#if empty}
							{@render empty({ query: value })}
						{:else}
							No results.
						{/if}
					</li>
				{/if}
			</ul>
		</Portal>
	{/if}
</div>
