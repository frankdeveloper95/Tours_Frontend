import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch(
		`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/reservas/me`,
		{
			credentials: 'include' // 🔐 cookie HttpOnly
		}
	);

	if (!res.ok) {
		return { reservas: [] };
	}

	return {
		reservas: await res.json()
	};
};
