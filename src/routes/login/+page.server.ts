import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { verifyToken } from '$lib/auth';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('access_token');
	if (!token) {
		return;
	} else {
		const res = await verifyToken(token);
		if (!res.ok) {
			return { success: false, message: (await res.json()).detail };
		} else {
			redirect(303, '/home');
		}
	}
};

export const actions = {
	default: async ({ cookies, request, fetch }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		const res = await fetch('http://localhost:8000/api/v1/token', {
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
			redirect(303, '/home');
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
