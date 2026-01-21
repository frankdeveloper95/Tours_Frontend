import type { PageServerLoad, Actions } from './$types';
import { redirect, fail } from '@sveltejs/kit';
import { 
    getAllReservas, 
    cancelReserva, 
    pagarReserva 
} from '$lib/api/reservas';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('access_token');

    if (!token) {
        throw redirect(302, '/login');
    }

    const { ok, reservas } = await getAllReservas(fetch, token);

    return {
        reservas: ok ? reservas : []
    };
};

export const actions: Actions = {
    cancel: async ({ request, fetch, cookies }) => {
        const token = cookies.get('access_token');

        if (!token) {
            return fail(401, { error: 'No autorizado' });
        }

        const form = await request.formData();
        const id = form.get('id');

        if (!id) {
            return fail(400, { error: 'ID inválido' });
        }

        const res = await cancelReserva(fetch, String(id), token);

        if (!res.ok) {
            return fail(400, { error: 'No se pudo cancelar la reserva' });
        }

        throw redirect(303, '/admin/reservas');
    },

    pagar: async ({ request, fetch, cookies }) => {
        const token = cookies.get('access_token');

        if (!token) {
            return fail(401, { error: 'No autorizado' });
        }

        const form = await request.formData();
        const id = form.get('id');

        if (!id) {
            return fail(400, { error: 'ID inválido' });
        }

        const res = await pagarReserva(fetch, String(id), token);

        if (!res.ok) {
            return fail(400, { error: 'No se pudo marcar como pagada' });
        }

        throw redirect(303, '/admin/reservas');
    }
};
