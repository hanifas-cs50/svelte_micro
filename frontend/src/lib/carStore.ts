import { get, writable } from 'svelte/store';

type Car = {
	id: number;
	brand: string;
	model: string;
	price: number;
};

let initialized = false;
export const cars = writable<Car[]>([]);
export const carsArchive = writable<Car[]>([]);

export async function initializeCars() {
	if (!initialized) {
		try {
			const res1 = await fetch('http://localhost:5001/ms1/cars');
			const res2 = await fetch('http://localhost:5003/ms3/logs');
			if (!res1.ok) throw new Error('Failed to fetch cars');
			if (!res2.ok) throw new Error('Failed to fetch archive');

			const data1 = await res1.json();
			const data2 = await res2.json();
			cars.set(data1);
			carsArchive.set(data2);
		} catch (err) {
			console.error('Error loading cars:', err);
		  throw new Error((err as Error).message);
		}
		initialized = true;
	}
}

export function getCar(id: number) {
	return get(cars).find((car) => car.id === id);
}

export async function addCar(model: string, brand: string, price: number) {
	const currCars = get(cars);
	const maxId = currCars.length > 0 ? Math.max(...currCars.map((c) => c.id)) : 0;

	try {
		const response = await fetch('http://localhost:5002/ms2/cars', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ model, brand, price })
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Server error: ', errorText);
			throw new Error(`Server error: ${errorText}`);
		}

		cars.update((currentCars) => {
			return [...currentCars, { id: maxId + 1, model, brand, price }];
		});
		carsArchive.update((currentCars) => {
			return [...currentCars, { id: maxId + 1, model, brand, price }];
		});
	} catch (err) {
		console.error('Error adding car:', err);
		throw new Error((err as Error).message);
	}
}

export async function editCar(id: number, model: string, brand: string, price: number) {
  try {
    const response = await fetch(
      `http://localhost:5002/ms2/cars/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, brand, price }),
      }
    );
    
		if (!response.ok) {
			const errorText = await response.text();
			console.error('Server error: ', errorText);
			throw new Error(`Server error: ${errorText}`);
		}

    cars.update((currentCars) =>
      currentCars.map((car) => (car.id === id ? { ...car, model, brand, price } : car))
    );
  } catch (err) {
    console.error('Error updating car: ', err);
		throw new Error((err as Error).message);
  }
}

export async function deleteCar(id: number) {
  try {    
    const response = await fetch(`http://localhost:5002/ms2/cars/${id}`, {
      method: "DELETE",
    });

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Server error: ', errorText);
			throw new Error(`Server error: ${errorText}`);
		}

    cars.update((currentCars) => currentCars.filter((car) => car.id !== id));
  } catch (err) {
    console.error('Error deleting car: ', err);
		throw new Error((err as Error).message);
  }
}
