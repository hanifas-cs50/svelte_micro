import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { derived, writable } from 'svelte/store';

type Car = {
	id: number;
	cars_id: number;
	brand: string;
	model: string;
	price: number;
};

const initArchives = writable<Car[]>([]);
export const archives = derived(initArchives, ($initArchives) => $initArchives);

export async function initializeArchives() {
	try {
		const res = await fetch(`${PUBLIC_BACKEND_URL}:5003/ms3/logs`);
		if (!res.ok) throw new Error('Failed to fetch archives');

		const data = await res.json();
		initArchives.set(data);
	} catch (err) {
		console.error('Error loading archives: ', err);
		throw new Error(`Error loading archives: ${(err as Error).message}`);
	}
}