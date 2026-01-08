import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) throw redirect(302, '/login');
	if (user.rol_id !== 1) throw redirect(302, '/home');

	return {};
};
