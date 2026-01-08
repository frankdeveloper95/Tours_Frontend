import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ url }) => {
	return {
		success: url.searchParams.get('success') === 'true'
	};
};
