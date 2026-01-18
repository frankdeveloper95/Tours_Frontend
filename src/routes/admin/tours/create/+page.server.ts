import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from '../$types';
import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

function linesToArray(v: string) {
	return v
		.split('\n')
		.map((x) => x.trim())
		.filter(Boolean);
}

export const load: PageServerLoad = async () => {
	// ✅ shape inicial consistente
	return {
		success: false,
		message: '',
		data: {},
		errors: {}
	};
};

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const fd = await request.formData();

		const data = Object.fromEntries(fd) as Record<string, string>;
		const errors: Record<string, string> = {};

		const nombre = (data.nombre ?? '').trim();
		const destino = (data.destino ?? '').trim();
		const descripcion = (data.descripcion ?? '').trim();
		const fecha = (data.fecha ?? '').trim();
		const hora_inicio = (data.hora_inicio ?? '').trim();
		const hora_fin = (data.hora_fin ?? '').trim();
		const image_url = (data.image_url ?? '').trim();
		const politicas = (data.politicas ?? '').trim();

		const precio = Number((data.precio ?? '').trim());
		const capacidad_maxima = Number((data.capacidad_maxima ?? '').trim());

		// ✅ validaciones
		if (!nombre) errors.nombre = 'Requerido';
		if (!destino) errors.destino = 'Requerido';
		if (!descripcion) errors.descripcion = 'Requerido';
		if (!fecha) errors.fecha = 'Requerido';
		if (!hora_inicio) errors.hora_inicio = 'Requerido';
		if (!hora_fin) errors.hora_fin = 'Requerido';
		if (!Number.isFinite(precio) || precio < 0) errors.precio = 'Precio inválido';
		if (!Number.isFinite(capacidad_maxima) || capacidad_maxima < 1)
			errors.capacidad_maxima = 'Capacidad inválida';

		if (Object.keys(errors).length) {
			// ✅ SIEMPRE devolver errors
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
			itinerario: linesToArray(data.itinerario ?? '')
		};

		const res = await fetch(`${PUBLIC_HOST}/api/v1/admin/tours/`, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(payload)
		});


		if (!res.ok) {
			let msg = 'No se pudo crear el tour.';
			try {
				const j = await res.json();
				msg = j?.detail || j?.message || msg;
			} catch {
				// ignore
			}

			// ✅ también incluir errors (aunque vacío) para mantener tipo
			return fail(res.status, {
				success: false,
				message: msg,
				data,
				errors: {}
			});
		}

		// ✅ éxito también incluye errors
		return {
			success: true,
			message: 'Tour creado correctamente ✅',
			data: {},
			errors: {}
		};
	}
};