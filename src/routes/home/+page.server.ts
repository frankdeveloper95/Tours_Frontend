import { verifyToken } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('access_token');
	if (!token) {
		redirect(307, '/login');
	}
	const res = await verifyToken(token);
	if (res.ok) {
		const tour = await fetch('http://localhost:8000/public/tours');
		return {
			user: await res.json(),
			tours: await tour.json(),
			access_token: token
		};
	} else {
		redirect(307, '/login');
	}
};
