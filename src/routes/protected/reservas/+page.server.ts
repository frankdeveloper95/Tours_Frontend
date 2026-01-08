import { PUBLIC_HOST } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(`${PUBLIC_HOST}/public/reservas`, {
		method: 'GET',
		credentials: 'include'
	});

	if (!res.ok) {
		return { reservas: [] };
	}

	return {
		reservas: await res.json()
	};
};
