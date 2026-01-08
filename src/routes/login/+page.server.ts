import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import { dev } from '$app/environment';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	// Si ya hay token, redirigir (el hook/layout se encarga de user normalmente)
	const token = cookies.get('access_token');
	if (token) throw redirect(302, '/home');
};

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '');
		const password = String(formData.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { success: false, message: 'Email y contraseña son obligatorios', data: { email } });
		}

		const body = new URLSearchParams();
		body.set('username', email);
		body.set('password', password);

		const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/token`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body
		});

		// Si credenciales son incorrectas
		if (!res.ok) {
			const err = await res.json().catch(() => null);
			return fail(401, {
				success: false,
				message: err?.detail ?? 'Correo o contraseña incorrectos',
				data: { email }
			});
		}

		const tokenData = await res.json(); // { access_token, token_type }
		const accessToken = tokenData?.access_token;

		if (!accessToken) {
			return fail(500, { success: false, message: 'No se recibió access_token', data: { email } });
		}

		// ✅ Guardar cookie segura
		cookies.set('access_token', accessToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: !dev
		});

		// ✅ Opcional: redirigir directo.
		// Si necesitas redirigir por rol, es mejor que lo haga /home o el layout admin.
		throw redirect(302, '/home');
	}
};
