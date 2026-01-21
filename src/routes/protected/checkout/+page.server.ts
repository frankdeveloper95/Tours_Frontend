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
    default: async ({ request, fetch, cookies }) => {
        const token = cookies.get('access_token');
        const form = await request.formData();

        const tourId = form.get('tourId');
        const cantidad = form.get('cantidad_personas');
        const fecha = form.get('fecha');
        const nombre = form.get('nombre_cliente');
        const email = form.get('email_cliente');

        if (
            !tourId || !cantidad || !fecha || !nombre || !email ||
            String(cantidad).trim() === "" ||
            String(fecha).trim() === "" ||
            String(nombre).trim() === "" ||
            String(email).trim() === ""
        ) {
            return fail(400, {
                ok: false,
                message: "Faltan campos obligatorios"
            });
        }

        const payload = {
            id_tour: Number(tourId),
            numero_personas: Number(cantidad),
            fecha_reserva: String(fecha),
            nota: String(form.get('nota') ?? ''),
            nombre_cliente: String(nombre),
            email_cliente: String(email)
        };

        const res = await fetch(
            `${PUBLIC_HOST}/api/${PUBLIC_VERSION}/pagos/create-checkout-session`,
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            }
        );

        if (!res.ok) {
            const msg = await res.text().catch(() => 'Error al crear la sesión de pago');
            return fail(400, { ok: false, message: msg });
        }

        const { url } = await res.json();

        throw redirect(303, url);
    }
};
