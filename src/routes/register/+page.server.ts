import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { registerUser } from '$lib/api/auth.api';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const fd = await request.formData();
		const step = Number(fd.get('step') ?? 1);

		const data = {
			cedula: (fd.get('cedula')?.toString() ?? '').trim(),
			nombre: (fd.get('nombre')?.toString() ?? '').trim(),
			apellido: (fd.get('apellido')?.toString() ?? '').trim(),
			telefono: (fd.get('telefono')?.toString() ?? '').trim(),
			email: (fd.get('email')?.toString() ?? '').trim(),
			password: fd.get('password')?.toString() ?? ''
		};

		if (step !== 3) return { success: true, data };

		for (const [key, value] of Object.entries(data)) {
			if (!value) return fail(400, { message: `El campo ${key} es obligatorio`, data });
		}

		try {
			await registerUser(fetch, data);
		} catch (e: any) {
			return fail(e?.status ?? 400, { message: e?.message ?? 'Error al registrarse', data });
		}

		throw redirect(303, '/login');
	}
};
