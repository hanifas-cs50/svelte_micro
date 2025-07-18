<script lang="ts">
	import { initializeCars, cars, deleteCar } from '$lib/carStore';
	import { onMount } from 'svelte';

	let fetchError = $state('');
	let fetchLoading = $state(true);

	let deleteError = $state('');
	let deletingId: number | null = $state(null);

	const fetchCars = async () => {
		fetchError = '';
		fetchLoading = true;
		try {
			await initializeCars();
		} catch (err) {
			fetchError = (err as Error).message;
		} finally {
			fetchLoading = false;
		}
	};

	const onDelete = async (id: number) => {
		deleteError = '';
		deletingId = id;
		try {
			await deleteCar(id);
		} catch (err) {
			deleteError = (err as Error).message;
		} finally {
			deletingId = null;
		}
	};

	onMount(fetchCars);

	let searchQuery = $state('');
	let filtered = $derived.by(() => {
		let fCars = $cars.filter(
			(car) =>
				car.brand.toLocaleLowerCase().includes(searchQuery.toLowerCase()) ||
				car.model.toLocaleLowerCase().includes(searchQuery.toLowerCase())
		);
		return fCars;
	});
</script>

<h3 class="mb-4 text-xl font-bold">Cars Table</h3>

<div class="mb-4">
	<input
		type="text"
		bind:value={searchQuery}
		placeholder="Search cars by model or brand..."
		class="mx-auto w-full max-w-sm rounded border p-2"
	/>
</div>

{#if fetchLoading}
	<p class="mb-4 rounded bg-zinc-200 p-2 text-zinc-800">Loading archives...</p>
{:else if !!fetchError}
	<div class="mb-4 rounded bg-red-200 p-2 text-red-800">{fetchError}</div>
	<button
		class="mb-4 w-full cursor-pointer font-medium text-blue-500/80 underline hover:text-blue-500"
		type="button"
		onclick={() => fetchCars()}
	>
		Reload
	</button>
{:else}
	{#if deleteError}
		<div class="mb-4 rounded bg-red-200 p-2 text-red-800">{deleteError}</div>
	{/if}

	<table class="mb-4 w-full border-collapse">
		<thead>
			<tr>
				<th class="w-14 border p-2">No.</th>
				<th class="w-20 border p-2">Cars ID</th>
				<th class="border p-2">Model</th>
				<th class="border p-2">Brand</th>
				<th class="border p-2">Price</th>
				<th class="border p-2" colspan="2">Action</th>
			</tr>
		</thead>
		<tbody class="text-center">
			{#each filtered as { id, model, brand, price }, i (id)}
				<tr>
					<td class="border p-2">{i + 1}.</td>
					<td class="border p-2">{id}</td>
					<td class="border p-2">{model}</td>
					<td class="border p-2">{brand}</td>
					<td class="border p-2">{price}</td>
					<td class="w-20 border">
						<a
							class="flex px-4 py-2 font-medium text-white
								{deletingId === id ? 'bg-zinc-500' : 'bg-blue-500/90 hover:bg-blue-500'}"
							href={deletingId === id ? '#' : `/update/${id}`}
						>
							Update
						</a>
					</td>
					<td class="w-20 border">
						<button
							class="cursor-pointer bg-red-500/90 px-4 py-2 font-medium text-white hover:bg-red-500 disabled:bg-zinc-500"
							type="button"
							onclick={() => onDelete(id)}
							disabled={deletingId === id}
						>
							Delete
						</button>
					</td>
				</tr>
			{:else}
				<tr>
					<td class="border p-2" colspan="6">No data (yet...)</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
