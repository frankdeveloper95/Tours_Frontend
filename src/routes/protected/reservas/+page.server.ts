import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies, locals }) => {

	const token: string = cookies.get('access_token') ?? '';

	const user = locals.user;

	const res = await fetch(
		`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/reservas/me/${user?.id}`,
		{
			headers: {
				Authorization: `Bearer ${token}`
			},
			// credentials: 'include' // 🔐 cookie HttpOnly
		}
	);

	if (!res.ok) {
		return { reservas: [] };
	} else {
		return { reservas: await res.json() };
	}
};
