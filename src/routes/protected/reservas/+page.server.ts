import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('access_token') ?? '';

    // Llamamos al endpoint correcto del backend (el nuevo)
    const res = await fetch(
        `${PUBLIC_HOST}/api/${PUBLIC_VERSION}/reservas/mis-reservas-totales`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        console.error('Error al obtener reservas:', await res.text());
        return { reservas: [] };
    }

    const data = await res.json();

    return {
        reservas: data.reservas
    };
};
