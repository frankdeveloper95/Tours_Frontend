import { dev } from '$app/environment';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

import { requestToken } from '$lib/api/auth.api';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');
	if (token) throw redirect(302, '/home');
};

export const actions: Actions = {
	default: async ({ cookies, request, fetch }) => {
		const fd = await request.formData();

		const email = String(fd.get('email') ?? '').trim();
		const password = String(fd.get('password') ?? '');

		if (!email || !password) {
			return fail(400, {
				success: false,
				message: 'Email y contraseña son obligatorios',
				data: { email }
			});
		}

		try {
			const { accessToken } = await requestToken(fetch, { email, password });

			cookies.set('access_token', accessToken, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: !dev
			});

			throw redirect(302, '/home');
		} catch (e: any) {
			return fail(e?.status ?? 401, {
				success: false,
				message: e?.message ?? 'Correo o contraseña incorrectos',
				data: { email }
			});
		}
	}
};
