<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { editCar, getCar } from '$lib/carStore';

	let error = $state('');
	let loading = $state(false);
	let id = parseInt(page.params.id, 10);

	const car = !isNaN(id) ? getCar(id) : undefined;
	if (car === undefined) {
		error = 'Invalid car ID!';
	}

	async function onSubmit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;

		if (car === undefined) {
			error = 'Invalid car ID! (Why did you do that?)';
      loading = false;
			return;
		}

		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const model = (formData.get('model') as string).trim();
		const brand = (formData.get('brand') as string).trim();
		const rawPrice = formData.get('price');
		const price = rawPrice ? Number(rawPrice) : 0;

		if (model === '' || brand === '' || price <= 0) {
			error = 'All fields are required';
      loading = false;
			return;
		}

		try {
			await editCar(id, model, brand, price);
			form.reset();
			goto('/');
		} catch (err) {
			error = (err as Error).message;
		} finally {
      loading = false;
    }
	}
</script>

<h1 class="mb-4 text-center text-2xl font-bold">Update</h1>

{#if error}
	<div class="mb-4 rounded bg-red-200 p-2 text-red-800">{error}</div>
{/if}

<form class="grid w-full rounded p-4 shadow-md" onsubmit={onSubmit}>
	<div class="grid gap-1">
		<label class="font-medium" for="model">Model: </label>
		<input
			class="rounded border-2 border-zinc-500/60 px-2 py-1 font-medium text-zinc-800 outline-none hover:border-zinc-500 focus:border-zinc-500"
			type="text"
			id="model"
			name="model"
      defaultValue={car ? car.model : ""}
			autocomplete="off"
			required
		/>
	</div>
	<div class="mt-3 grid gap-1">
		<label class="font-medium" for="brand">Brand: </label>
		<input
			class="rounded border-2 border-zinc-500/60 px-2 py-1 font-medium text-zinc-800 outline-none hover:border-zinc-500 focus:border-zinc-500"
			type="text"
			id="brand"
			name="brand"
      defaultValue={car ? car.brand : ""}
			autocomplete="off"
			required
		/>
	</div>
	<div class="mt-3 grid gap-1">
		<label class="font-medium" for="price">Price: </label>
		<input
			class="rounded border-2 border-zinc-500/60 px-2 py-1 font-medium text-zinc-800 outline-none hover:border-zinc-500 focus:border-zinc-500"
			type="number"
			id="price"
      defaultValue={car ? car.price : ""}
			name="price"
			min="0"
			max="99999"
			required
		/>
	</div>

	<button
		class="mt-4 py-2 font-medium text-white cursor-pointer rounded bg-blue-500/90 hover:bg-blue-500 disabled:bg-zinc-500"
		type="submit"
		disabled={car === undefined || loading}
	>
		{loading ? "Updating..." : "Update"}
	</button>
	<a
		class="mt-1 py-2 text-center font-medium text-white rounded bg-zinc-500/90 hover:bg-zinc-500 {loading ? 'opacity-50' : ''}"
		href={loading ? '#' : `/`}
	>
		Back
	</a>
</form>
