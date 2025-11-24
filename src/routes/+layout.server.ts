import type { LayoutServerLoad } from './$types';
import {PUBLIC_HOST, PUBLIC_VERSION} from '$env/static/public';

export const load: LayoutServerLoad = async ({ cookies, fetch }) => {
	const token = cookies.get('access_token');
	if (!token) {
		return;
	}
	const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/test`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	if (!res.ok) {
		return {
			user: null
		};
	}
	return {
		user: await res.json()
	};
};
