import { PUBLIC_HOST } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const tour = await fetch(`${PUBLIC_HOST}/public/tours/${params.slug}`, {
		method: 'GET'
	});
	return {
		tour: await tour.json()
	};
};
