<script lang="ts">
	import { cars, carsArchive, deleteCar } from '$lib/carStore';

	let error = $state('');
	let loading = $state(false);

	async function onDelete(id: number) {
    error = '';
		loading = true;
		try {
			await deleteCar(id);
		} catch (err) {
			error = (err as Error).message;
		} finally {
			loading = false;
		}
	}
</script>

<h1 class="mb-4 text-center text-2xl font-bold">Home</h1>

{#if !!error}
	<div class="mb-4 rounded bg-red-200 p-2 text-red-800">{error}</div>
{/if}

<h3 class="mb-4 text-xl font-bold">Cars Table</h3>

<table class="w-full mb-4 border-collapse">
	<thead>
		<tr>
			<th class="border p-2">No.</th>
			<th class="border p-2">Model</th>
			<th class="border p-2">Brand</th>
			<th class="border p-2">Price</th>
			<th class="border p-2" colspan="2">Action</th>
		</tr>
	</thead>
	<tbody class="text-center">
		{#each $cars as { id, model, brand, price }, i (id)}
			<tr>
				<td class="border p-2">{i + 1}.</td>
				<td class="border p-2">{model}</td>
				<td class="border p-2">{brand}</td>
				<td class="border p-2">{price}</td>
				<td class="w-20 border">
					<a
						class="flex px-4 py-2 font-medium text-white {loading
							? 'bg-zinc-500'
							: 'bg-blue-500/90 hover:bg-blue-500'}"
						href={loading ? '#' : `/update/${id}`}
					>
						Update
					</a>
				</td>
				<td class="w-20 border">
					<button
						class="cursor-pointer bg-red-500/90 px-4 py-2 font-medium text-white hover:bg-red-500 disabled:bg-zinc-500"
						type="button"
						onclick={() => onDelete(id)}
						disabled={loading}
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

<h3 class="mb-4 text-xl font-bold">Archive Table</h3>

<table class="w-full mb-4 border-collapse">
	<thead>
		<tr>
			<th class="border p-2">No.</th>
			<th class="border p-2">Model</th>
			<th class="border p-2">Brand</th>
			<th class="border p-2">Price</th>
		</tr>
	</thead>
	<tbody class="text-center">
		{#each $carsArchive as { id, model, brand, price }, i (id)}
			<tr>
				<td class="border p-2">{i + 1}.</td>
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
