<script lang="ts" module>
	import { getContext, setContext } from 'svelte';

	const GROUP_KEY = Symbol('alus:command-menu-group');

	export interface CommandMenuGroupContext {
		track: (getVisible: () => boolean) => () => void;
	}

	export function getCommandMenuGroupContext(): CommandMenuGroupContext | undefined {
		return getContext<CommandMenuGroupContext | undefined>(GROUP_KEY);
	}

	export function setCommandMenuGroupContext(ctx: CommandMenuGroupContext) {
		setContext(GROUP_KEY, ctx);
	}
</script>

<script lang="ts">
	import { generateCounterId } from '$utils/a11y/id.js';

	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		heading?: string;
	}

	let { children, class: className = '', heading }: Props = $props();
	const headingId = generateCounterId('cmdk-group-heading');

	let trackers = $state<Array<() => boolean>>([]);
	const anyVisible = $derived(trackers.some((fn) => fn()));

	setCommandMenuGroupContext({
		track: (fn) => {
			trackers.push(fn);
			return () => {
				const i = trackers.indexOf(fn);
				if (i >= 0) trackers.splice(i, 1);
			};
		}
	});
</script>

<div
	role="group"
	aria-labelledby={heading ? headingId : undefined}
	class={className}
	hidden={!anyVisible || undefined}
>
	{#if heading}
		<div id={headingId} data-cmdk-group-heading>{heading}</div>
	{/if}
	{#if children}{@render children()}{/if}
</div>
