import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, url }) => {
	const tourId = url.searchParams.get('tourId');
	if (!tourId) throw redirect(302, '/tours');

	const res = await fetch(
		`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours/${tourId}`,
		{ credentials: 'include' }
	);

	if (!res.ok) {
		return { tour: null, tourId };
	}

	return {
		tour: await res.json(),
		tourId
	};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const form = await request.formData();

		const payload = {
			tour_id: Number(form.get('tourId')),
			cantidad_personas: Number(form.get('cantidad_personas')),
			fecha: String(form.get('fecha')),
			nota: String(form.get('nota') ?? '')
		};

		const res = await fetch(
			`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/reservas`,
			{
				method: 'POST',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			}
		);

		if (!res.ok) {
			const msg = await res.text().catch(() => 'Error al crear la reserva');
			return fail(400, { ok: false, message: msg });
		}

		// flujo correcto
		throw redirect(302, '/protected/mis-reservas');
	}
};
