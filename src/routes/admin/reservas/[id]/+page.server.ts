import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { getReservaById } from '$lib/api/reservas';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
    const token = cookies.get('access_token');

    if (!token) {
        throw redirect(302, '/login');
    }

    const { ok, reserva } = await getReservaById(fetch, params.id, token);

    if (!ok || !reserva) {
        throw redirect(302, '/admin/reservas');
    }

    return { reserva };
};
