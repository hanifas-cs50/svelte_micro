<script lang="ts">
	import { initializeArchives, archives } from '$lib/archiveStore';
	import { onMount } from 'svelte';

	let fetchError = $state('');
	let fetchLoading = $state(true);

	const fetchArchives = async () => {
		fetchError = '';
		fetchLoading = true;
		try {
			await initializeArchives();
		} catch (err) {
			fetchError = (err as Error).message;
		} finally {
			fetchLoading = false;
		}
	};

	onMount(fetchArchives);
</script>

<h3 class="mb-4 text-xl font-bold">Archives Table</h3>

{#if fetchLoading}
	<p class="mb-4 rounded bg-zinc-200 p-2 text-zinc-800">Loading archives...</p>
{:else if !!fetchError}
	<div class="mb-4 rounded bg-red-200 p-2 text-red-800">{fetchError}</div>
	<button
		class="w-full cursor-pointer font-medium text-blue-500/80 underline hover:text-blue-500"
		type="button"
		onclick={() => fetchArchives()}
	>
		Reload
	</button>
{:else}
	<table class="mb-4 w-full border-collapse">
		<thead>
			<tr>
				<th class="w-14 border p-2">No.</th>
				<th class="w-20 border p-2">Cars ID</th>
				<th class="border p-2">Model</th>
				<th class="border p-2">Brand</th>
				<th class="border p-2">Price</th>
			</tr>
		</thead>
		<tbody class="text-center">
			{#each $archives as { id, cars_id, model, brand, price }, i (id)}
				<tr>
					<td class="border p-2">{i + 1}.</td>
					<td class="border p-2">{cars_id}</td>
					<td class="border p-2">{model}</td>
					<td class="border p-2">{brand}</td>
					<td class="border p-2">{price}</td>
				</tr>
			{:else}
				<tr>
					<td class="border p-2" colspan="4">No data (yet...)</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
