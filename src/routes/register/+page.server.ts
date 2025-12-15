// src/routes/register/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { PUBLIC_HOST } from '$env/static/public';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const formData = await request.formData();
		const step = Number(formData.get('step') ?? 1);

		const data = {
			cedula: (formData.get('cedula')?.toString() ?? '').trim(),
			nombre: (formData.get('nombre')?.toString() ?? '').trim(),
			apellido: (formData.get('apellido')?.toString() ?? '').trim(),
			telefono: (formData.get('telefono')?.toString() ?? '').trim(),
			email: (formData.get('email')?.toString() ?? '').trim(),
			password: formData.get('password')?.toString() ?? ''
		};

		// ✅ Solo registrar en el último paso
		if (step !== 3) {
			return { success: true, data };
		}

		// ✅ Validación final (backend)
		for (const [key, value] of Object.entries(data)) {
			if (!value) return fail(400, { message: `El campo ${key} es obligatorio`, data });
		}

		// ✅ ruta REAL del backend
		const base = PUBLIC_HOST.replace(/\/$/, ''); // evita doble //
		const url = `${base}/public/auth_register/register`;

		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		});

		if (!res.ok) {
			const err = await res.json().catch(() => ({}));
			return fail(res.status, { message: err?.detail ?? err?.message ?? 'Error al registrarse', data });
		}

		throw redirect(303, '/login');
	}
};
