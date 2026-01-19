import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

function linesToArray(v: string) {
    return v.split('\n').map(x => x.trim()).filter(Boolean);
}

export const load: PageServerLoad = async ({ fetch, cookies }) => {
    const token = cookies.get('access_token');

    let guias = [];

    if (token) {
        const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/guia`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) guias = await res.json();
    }

    return {
        guias,
        success: false,
        message: '',
        data: {},
        errors: {}
    };
};

export const actions: Actions = {
    default: async ({ request, fetch, cookies }) => {
        const fd = await request.formData();
        const data = Object.fromEntries(fd) as Record<string, string>;
        const errors: Record<string, string> = {};

        // 🔍 LOG 1: Ver lo que llega del formulario
        console.log("📌 FORMDATA RECIBIDO:", data);

        const nombre = (data.nombre ?? '').trim();
        const destino = (data.destino ?? '').trim();
        const descripcion = (data.descripcion ?? '').trim();
        const fecha = (data.fecha ?? '').trim();
        const hora_inicio = (data.hora_inicio ?? '').trim();
        const hora_fin = (data.hora_fin ?? '').trim();
        const image_url = (data.image_url ?? '').trim();
        const politicas = (data.politicas ?? '').trim();
        const id_guia = Number(data.id_guia ?? 0);
        const precio = Number((data.precio ?? '').trim());
        const capacidad_maxima = Number((data.capacidad_maxima ?? '').trim());

        // VALIDACIONES
        if (!nombre) errors.nombre = 'Requerido';
        if (!destino) errors.destino = 'Requerido';
        if (!descripcion) errors.descripcion = 'Requerido';
        if (!fecha) errors.fecha = 'Requerido';
        if (!hora_inicio) errors.hora_inicio = 'Requerido';
        if (!hora_fin) errors.hora_fin = 'Requerido';
        if (!id_guia) errors.id_guia = 'Selecciona un guía';
        if (!Number.isFinite(precio) || precio < 0) errors.precio = 'Precio inválido';
        if (!Number.isFinite(capacidad_maxima) || capacidad_maxima < 1)
            errors.capacidad_maxima = 'Capacidad inválida';

        if (Object.keys(errors).length) {
            return fail(400, {
                success: false,
                message: 'Revisa los campos marcados.',
                data,
                errors
            });
        }

        const payload = {
            nombre,
            destino,
            descripcion,
            fecha,
            hora_inicio,
            hora_fin,
            precio,
            capacidad_maxima,
            image_url: image_url || null,
            politicas: politicas || null,
            incluye: linesToArray(data.incluye ?? ''),
            no_incluye: linesToArray(data.no_incluye ?? ''),
            que_llevar: linesToArray(data.que_llevar ?? ''),
            itinerario: linesToArray(data.itinerario ?? ''),
            id_guia
        };

        // 🔍 LOG 2: Ver el payload final que se envía al backend
        console.log("📌 PAYLOAD ENVIADO AL BACKEND:", payload);

        const token = cookies.get('access_token');

        if (!token) {
            return fail(401, {
                success: false,
                message: 'No hay token de autenticación',
                data,
                errors: {}
            });
        }

        const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/admin/tours/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            let msg = 'No se pudo crear el tour.';
            try {
                const j = await res.json();
                msg = j?.detail || j?.message || msg;
            } catch {}

            return fail(res.status, {
                success: false,
                message: msg,
                data,
                errors: {}
            });
        }

        return {
            success: true,
            message: 'Tour creado correctamente ✅',
            data: {},
            errors: {}
        };
    }
};
