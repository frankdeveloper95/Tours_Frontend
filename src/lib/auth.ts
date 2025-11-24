import { PUBLIC_HOST, PUBLIC_VERSION } from "$env/static/public";

export async function verifyToken(token: string) {
	const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/test`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return res;
}
