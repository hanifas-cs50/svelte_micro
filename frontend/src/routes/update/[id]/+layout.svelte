<script lang="ts">
	import { initializeCars } from '$lib/carStore';
	import { onMount } from 'svelte';

	let fetchError = $state('');
	let fetchLoading = $state(true);

	async function fetchCars() {
		fetchError = '';
		fetchLoading = true;
		try {
			await initializeCars();
		} catch (err) {
			fetchError = (err as Error).message;
		} finally {
			fetchLoading = false;
		}
	}

	onMount(async () => {
		await fetchCars();
	});

	let { children } = $props();
</script>

{#if fetchLoading}
	<p>Loading cars...</p>
{:else if !!fetchError}
	<div class="mb-4 rounded bg-red-200 p-2 text-red-800">{fetchError}</div>
	<button
		class="w-full cursor-pointer font-medium text-blue-500/80 underline hover:text-blue-500"
		type="button"
		onclick={() => fetchCars()}
	>
		Reload
	</button>
{:else}
	{@render children()}
{/if}
