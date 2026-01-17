import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

function baseUrl() {
	return PUBLIC_HOST.replace(/\/$/, '');
}

/* =========================
   REGISTER
========================= */
export async function registerUser(fetchFn: typeof fetch, data: any) {
	const url = `${baseUrl()}/public/auth_register/register`;

	const res = await fetchFn(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw { status: res.status, message: err?.detail ?? err?.message ?? 'Error al registrarse' };
	}

	return res.json().catch(() => ({}));
}

/* =========================
   LOGIN (TOKEN)
========================= */
export async function requestToken(
	fetchFn: typeof fetch,
	credentials: { email: string; password: string }
) {
	const body = new URLSearchParams();
	body.set('username', credentials.email);
	body.set('password', credentials.password);

	const res = await fetchFn(`${baseUrl()}/api/${PUBLIC_VERSION}/token`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body,
		credentials: 'include'
	});

	if (!res.ok) {
		const err = await res.json().catch(() => null);
		throw { status: res.status, message: err?.detail ?? 'Correo o contraseña incorrectos' };
	}

	const tokenData = await res.json().catch(() => ({}));
	const accessToken = tokenData?.access_token;

	if (!accessToken) {
		throw { status: 500, message: 'No se recibió access_token' };
	}

	return { accessToken, tokenData };
}
