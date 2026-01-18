import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { Tour } from '$lib/types/tour.types';

export async function getTourById(fetchFn: typeof fetch, id: string) {
	const res = await fetchFn(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours/${id}`, {
		credentials: 'include'
	});

	if (!res.ok) {
		return { ok: false as const, status: res.status, tour: null as Tour | null };
	}

	const tour = (await res.json()) as Tour;
	return { ok: true as const, status: 200, tour };
}
