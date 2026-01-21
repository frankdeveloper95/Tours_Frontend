import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

import { getAdminTourById } from '$lib/api/tours.api';

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
    const token = cookies.get('access_token');

    if (!token) {
        throw redirect(302, '/login');
    }

    const { ok, tour, status } = await getAdminTourById(fetch, params.id, token);

    if (!ok || !tour) {
        throw error(status, 'No se pudo cargar el tour');
    }

    return { tour };
};

export const actions: Actions = {
    update: async ({ request, fetch, params, cookies }) => {
        const token = cookies.get('access_token');
        const id = params.id;

        const form = await request.formData();
        const body = Object.fromEntries(form);

        const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/tours/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {})
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            return fail(res.status, {
                error: true,
                message: 'Error al actualizar el tour'
            });
        } else {
            redirect(303, '/admin/tours');
        }

        return { success: true };
    }
};
