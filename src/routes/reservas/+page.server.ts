import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const token = cookies.get('access_token');
	const res = await fetch('http://localhost:8000/public/reservas', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) {
		return {
			reservas: null
		};
	}
	return {
		reservas: await res.json()
	};
};
