import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import * as v from 'valibot';

import {
	listUsers,
	parseCreateUser,
	parseEditUser,
	serviceCreateUser,
	serviceDeleteUser,
	serviceEditUser
} from '$lib/features/admin/users/users.service';

import { createUserSchema, editUserSchema } from '$lib/features/admin/users/users.schemas';

export const load: PageServerLoad = async ({ fetch, cookies, url }) => {
	const token = cookies.get('access_token');
	if (!token) return { users: [], estado: 'active' };

	const estado = (url.searchParams.get('estado') ?? 'active') as 'active' | 'inactive' | 'all';

	return {
		users: await listUsers(fetch, token, estado),
		estado
	};
};
export const actions: Actions = {
	create: async ({ request, fetch, cookies }) => {
		const token = cookies.get('access_token');
		if (!token) return fail(401, { error: 'No autorizado' });

		const fd = await request.formData();

		try {
			const payload = parseCreateUser(fd);
			await serviceCreateUser(fetch, token, payload);
			return { success: true };
		} catch (e: any) {
			if (e?.issues) {
				const data = Object.fromEntries(fd);
				return fail(400, { data, errors: v.flatten<typeof createUserSchema>(e.issues) });
			}
			return fail(400, { error: e?.message ?? 'Error al crear usuario' });
		}
	},

	edit: async ({ request, fetch, cookies }) => {
		const token = cookies.get('access_token');
		if (!token) return fail(401, { error: 'No autorizado' });

		const fd = await request.formData();

		// 🔍 DEBUG: ver qué rol_id llega realmente
		console.log('rol_id values:', fd.getAll('rol_id'));
		console.log('email:', fd.get('email'));
		console.log('id:', fd.get('id'));

		const rolRaw = String(fd.getAll('rol_id').at(-1) ?? '');
		const id = String(fd.get('id') ?? '');
		const email = String(fd.get('email') ?? '');

		const rol_id = Number(rolRaw);
		if (!Number.isFinite(rol_id)) return fail(400, { error: 'Rol inválido' });

		try {
			await serviceEditUser(fetch, token, id, { email, rol_id });
			return { success: true };
		} catch (e: any) {
			return fail(400, { error: e?.message ?? 'Error al actualizar usuario' });
		}
	},


	delete: async ({ request, fetch, cookies }) => {
		const token = cookies.get('access_token');
		if (!token) return fail(401, { error: 'No autorizado' });

		const fd = await request.formData();
		const data = Object.fromEntries(fd);
		const id = String(data.id ?? '');

		if (!id) return fail(400, { error: 'ID de usuario requerido' });

		try {
			await serviceDeleteUser(fetch, token, id);
			return { success: true };
		} catch (e: any) {
			return fail(400, { error: e?.message ?? 'Error al desactivar usuario' });
		}
	}
};
