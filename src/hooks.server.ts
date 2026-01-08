// src/hooks.server.ts
import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	if (dev && event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
		return new Response(undefined, { status: 404 });
	}

	const token = event.cookies.get('access_token');

	if (!token) {
		event.locals.user = null;
		return resolve(event);
	}

	try {
		const res = await event.fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/test`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		event.locals.user = res.ok ? await res.json() : null;
	} catch {
		event.locals.user = null;
	}

	return resolve(event);
};
