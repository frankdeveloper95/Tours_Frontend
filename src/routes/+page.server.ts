import type { PageServerLoad } from './$types';
import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

export const load: PageServerLoad = async ({ fetch }) => {
	// Tours destacados (si aún no tienes endpoint, igual no revienta: devuelve [])
	try {
		const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours?offset=0&limit=6`, {
			credentials: 'include'
		});

		if (!res.ok) return { featured: [] };

		const data = await res.json();
		// soporta que tu API devuelva array directo o { items: [] }
		const featured = Array.isArray(data) ? data : data?.items ?? [];

		return { featured };
	} catch {
		return { featured: [] };
	}
};
