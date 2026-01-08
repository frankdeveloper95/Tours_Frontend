// src/routes/protected/profile/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { getProfile, updateProfile } from '$lib/api/profile';
import * as v from 'valibot';

const ProfileUpdateSchema = v.object({
	cedula: v.optional(v.string()),
	nombre: v.string([v.minLength(2, 'Nombre muy corto')]),
	apellido: v.string([v.minLength(2, 'Apellido muy corto')]),
	telefono: v.string([v.minLength(7, 'Teléfono inválido')]),
	email: v.string([v.email('Email inválido')])
});

export const load: PageServerLoad = async ({ fetch }) => {
	const profile = await getProfile(fetch);
	return { profile };
};

export const actions: Actions = {
	update: async ({ request, fetch }) => {
		const formData = await request.formData();

		const payload = {
			cedula: String(formData.get('cedula') ?? ''),
			nombre: String(formData.get('nombre') ?? ''),
			apellido: String(formData.get('apellido') ?? ''),
			telefono: String(formData.get('telefono') ?? ''),
			email: String(formData.get('email') ?? '')
		};

		const parsed = v.safeParse(ProfileUpdateSchema, payload);

		if (!parsed.success) {
			const flattened = v.flatten(parsed.issues);
			return fail(400, {
				success: false,
				message: 'Revisa los campos del formulario.',
				data: payload,
				errors: flattened.nested
			});
		}

		const res = await updateProfile(fetch, parsed.output);

		if (!res.ok) {
			return fail(res.status, {
				success: false,
				message: res.message ?? 'No se pudo actualizar el perfil.',
				data: payload
			});
		}

		return {
			success: true,
			message: 'Perfil actualizado correctamente.',
			data: res.data // perfil actualizado si tu backend lo devuelve
		};
	}
};
