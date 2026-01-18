import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

export const load = async ({ fetch }) => {
	const url = `${PUBLIC_HOST}/api/${PUBLIC_VERSION}/tours?offset=0&limit=100`;

	const res = await fetch(url, { credentials: 'include' });

	// Si falla, no lo tapes: devuelve info mínima para debug
	if (!res.ok) {
		const body = await res.text().catch(() => '');
		return {
			tours: [],
			debug: { url, status: res.status, body: body.slice(0, 200) }
		};
	}

	const tours = await res.json();

	return {
		tours: Array.isArray(tours) ? tours : [],
		debug: { url, status: res.status }
	};
};
