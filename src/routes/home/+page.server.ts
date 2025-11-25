import { PUBLIC_HOST } from '$env/static/public';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { verifyToken } from '$lib/auth';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
	const token = cookies.get('access_token');
	if (!token) {
		redirect(301, '/login');
	}

	const res = await verifyToken(token);
	if (!res.ok) {
		cookies.delete('access_token', { path: '/' });
		redirect(301, '/login');
	}

	const tour = await fetch(`${PUBLIC_HOST}/public/tours`);
	return {
		tours: await tour.json(),
		access_token: token
	};
};
