import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');

	// 🔐 solo verificamos existencia
	if (!token) throw redirect(302, '/login');

	// ❌ NO usar parent()
	// ❌ NO verificar rol aquí (el backend lo hace mejor)

	return {};
};
