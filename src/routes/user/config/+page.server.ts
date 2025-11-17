import { verifyToken } from '$lib/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');
	if (!token) {
		return;
	}
	const res = await verifyToken(token);
	if (res.ok) {
		return {
			user: await res.json()
		};
	}
};
