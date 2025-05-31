import { PUBLIC_BACKEND_URL } from '$env/static/public';
import { get, writable } from 'svelte/store';
import { derived } from 'svelte/store';

type Log = {
	id: number;
	source: string;
	action: string;
	data: string;
	timestamp: string;
};

const oriLogs = writable<Log[]>([]);
export const logs = derived(oriLogs, (log) =>
	log.map((log) => ({
		...log,
		data: JSON.parse(log.data),
		timestamp: new Date(log.timestamp).toLocaleString('id-ID', {
			dateStyle: 'medium',
			timeStyle: 'short'
		})
	}))
);

export async function initializeLogs() {
	try {
		const res2 = await fetch(`${PUBLIC_BACKEND_URL}:5003/ms3/logs`);
		if (!res2.ok) throw new Error('Failed to fetch archive');

		const data2 = await res2.json();
		oriLogs.set(data2);
	} catch (err) {
		console.error('Error loading logs: ', err);
		throw new Error(`Error loading logs: ${(err as Error).message}`);
	}
}

export function getLog(id: number) {
	return get(oriLogs).find((log) => log.id === id);
}
