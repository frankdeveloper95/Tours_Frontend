import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ fetch }) => {
	const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours?offset=0&limit=100`);

	if (!res.ok) return { tours: [] };

	return { tours: await res.json() };
};

export const actions = {
	checkout: async ({ request, fetch, cookies }) => {
		const token = cookies.get('access_token');
		const data = Object.fromEntries(await request.formData());
		const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/checkout/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				product_id: Number(data.id)
			})
		});
		if (res.ok) {
			const result = await res.json();
			console.log(result);
			redirect(303, result.url);
		} else {
			return fail(400, { message: 'Error al procesar el pago' });
		}
	}
} satisfies Actions;