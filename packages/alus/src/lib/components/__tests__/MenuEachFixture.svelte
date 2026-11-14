<script lang="ts">
	import Menu from '#lib/components/navigation/menu/Menu.svelte';
	import MenuTrigger from '#lib/components/navigation/menu/MenuTrigger.svelte';
	import MenuContent from '#lib/components/navigation/menu/MenuContent.svelte';
	import MenuItem from '#lib/components/navigation/menu/MenuItem.svelte';

	let { open = false, initialDisabled }: { open?: boolean; initialDisabled?: string } = $props();
	// svelte-ignore state_referenced_locally
	let disabledX = $state(initialDisabled);
	let last = $state('');
	const xs = ['A', 'B', 'C'];
</script>

<Menu {open}>
	<MenuTrigger data-testid="trigger" data-current={last || undefined}>
		{#snippet children({ open })}{last || 'More'}{open ? '-' : '+'}{/snippet}
	</MenuTrigger>
	<MenuContent>
		{#each xs as x (x)}
			<MenuItem data-testid="item-{x}" disabled={x === disabledX} onSelect={() => (last = x)}>
				<a href="#{x}" tabindex="-1">{x}</a>
			</MenuItem>
		{/each}
	</MenuContent>
</Menu>
<output data-testid="last">{last}</output>
<button data-testid="toggle-b" onclick={() => (disabledX = disabledX ? undefined : 'B')}
	>toggle</button
>
