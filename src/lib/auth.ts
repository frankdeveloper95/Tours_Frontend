export async function verifyToken(token: string) {
	const res = await fetch('http://localhost:8000/api/v1/test', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	return res;
}
