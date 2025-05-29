<script lang="ts">
	import '../app.css';
	import { initializeCars } from '$lib/carStore';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	let error = $state('');
	let loading = $state(true);

	async function fetchCars() {
    error = '';
    loading = true;
		try {
      await initializeCars();
		} catch (err) {
			error = (err as Error).message;
		} finally {
			loading = false;
		}
	}

	onMount(async () => {
		await fetchCars();
	});

	let { children } = $props();
</script>

<nav class="mx-auto w-full max-w-screen-lg">
	<div class="m-4 flex h-14 items-center gap-4 rounded bg-zinc-500/10 px-4 font-medium shadow-md">
		<a
			class={`border-b-2 ${page.url.pathname === '/' ? 'border-zinc-500' : 'border-transparent hover:border-zinc-500'}`}
			href="/"
		>
			Home
		</a>
		<a
			class={`border-b-2 ${page.url.pathname === '/add' ? 'border-zinc-500' : 'border-transparent hover:border-zinc-500'}`}
			href="/add"
		>
			Add
		</a>
	</div>
</nav>

<main class="mx-auto w-full max-w-screen-lg px-4">
	{#if loading}
		<p>Loading cars...</p>
	{:else if !!error}
		<div class="mb-4 rounded bg-red-200 p-2 text-red-800">{error}</div>
		<button
			class="w-full font-medium text-blue-500/80 underline hover:text-blue-500 cursor-pointer"
			type="button"
			onclick={() => fetchCars()}
		>
			Reload
		</button>
	{:else}
		{@render children()}
	{/if}
</main>
