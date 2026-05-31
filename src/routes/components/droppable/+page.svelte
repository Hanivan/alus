<script>
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	onMount(() => goto(resolve('/components/draggable')));
</script>

<p>Redirecting…</p>
