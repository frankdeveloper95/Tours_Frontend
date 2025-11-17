import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const tour = await fetch(`http://localhost:8000/public/tours/${params.slug}`, {
		method: 'GET'
	});
	return {
		tour: await tour.json()
	};
};
