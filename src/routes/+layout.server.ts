import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('access_token');
	if (!token) {
		return;
	}
	const res = await fetch('http://localhost:8000/api/v1/test', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) {
		return {
			user: null
		};
	}
	return {
		user: await res.json()
	};
};
