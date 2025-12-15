import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import { redirect, type ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';
import { verifyToken } from '$lib/auth';

export const load: ServerLoad = async ({ cookies, parent }) => {
	const token = cookies.get('access_token');
	if (!token) {
		return;
	}
	const res = await verifyToken(token);
	if (res.ok) {
		const { user } = await parent();
		if (!user) {return;}
		if (user.rol_id != 1) {
			redirect(301, '/home');
		} else {
			redirect(301, '/admin/users');
		}
	} else {
		return;
	}
};

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/token`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				username: String(email),
				password: String(password)
			})
		});
		const data = await res.json();
		if (data.access_token) {
			cookies.set('access_token', data.access_token, { path: '/' });
			const res = await verifyToken(data.access_token);
			if (res.ok) {
				const user = await res.json();
				if (user.rol_id != 1) {
					redirect(301, '/home');
				} else {
					redirect(301, '/admin/users');
				}
			}
		}
		return {
			success: false,
			message: data.detail,
			data: {
				email: String(email),
				password: String(password)
			}
		};
	}
} satisfies Actions;
