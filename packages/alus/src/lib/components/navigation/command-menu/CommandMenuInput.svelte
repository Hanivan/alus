<script lang="ts">
	import { useDebounce } from 'runed';
	import { getCommandMenuContext } from './CommandMenu.svelte';

	interface Props {
		class?: string;
		placeholder?: string;
		debounceMs?: number;
		'aria-label'?: string;
	}

	let {
		class: className = '',
		placeholder = 'Type a command or search...',
		debounceMs = 0,
		'aria-label': ariaLabel = 'Search commands'
	}: Props = $props();

	const ctx = getCommandMenuContext();
	let localValue = $state(ctx.query());

	const debouncedSetQuery = useDebounce(
		(v: string) => ctx.setQuery(v),
		() => debounceMs
	);

	function onInput(e: Event) {
		const v = (e.target as HTMLInputElement).value;
		localValue = v;
		if (debounceMs <= 0) {
			debouncedSetQuery.cancel();
			ctx.setQuery(v);
			return;
		}
		debouncedSetQuery(v);
	}

	function flushDebounce() {
		if (debouncedSetQuery.pending) debouncedSetQuery.runScheduledNow();
	}

	function onKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'Escape':
				e.preventDefault();
				e.stopPropagation();
				ctx.setOpen(false);
				break;
			case 'ArrowDown':
				e.preventDefault();
				ctx.moveHighlight(1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				ctx.moveHighlight(-1);
				break;
			case 'Home':
				e.preventDefault();
				ctx.highlightFirst();
				break;
			case 'Enter': {
				e.preventDefault();
				flushDebounce();
				const id = ctx.highlightedId();
				if (id) ctx.select(id);
				break;
			}
		}
	}
</script>

<input
	type="text"
	id={ctx.inputId}
	role="combobox"
	autocomplete="off"
	autocorrect="off"
	spellcheck="false"
	aria-label={ariaLabel}
	aria-expanded="true"
	aria-controls={ctx.listId}
	aria-activedescendant={ctx.highlightedId() ?? undefined}
	class={className}
	{placeholder}
	value={localValue}
	oninput={onInput}
	onkeydown={onKeydown}
/>
