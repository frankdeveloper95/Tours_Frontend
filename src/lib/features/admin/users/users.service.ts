import * as v from 'valibot';
import { createUserSchema, editUserSchema } from './users.schemas';
import { createUser, deleteUser, editUser, getUsers } from './users.api';

type ApiFetch = (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>;

export async function listUsers(fetch: any, token: string, estado: 'active'|'inactive'|'all' = 'active') {
	return await getUsers(fetch, token, 0, 100, estado);
}

export function parseCreateUser(formData: FormData) {
	const data = Object.fromEntries(formData) as Record<string, string>;
	const validated = v.parse(createUserSchema, data);

	return {
		cedula: validated.cedula,
		email: validated.email,
		nombre: validated.nombre,
		apellido: validated.apellido,
		password: validated.password,
		telefono: validated.telefono,
		rol_id: Number(validated.rol_id)
	};
}

export function parseEditUser(formData: FormData) {
	const data = Object.fromEntries(formData) as Record<string, string>;
	const validated = v.parse(editUserSchema, data);

	const rol = Number(validated.rol_id);
	if (!Number.isFinite(rol)) throw new Error('Rol inválido');

	return { id: validated.id, email: validated.email, rol_id: rol };
}

// ✅ AHORA sí pasa token
export async function serviceCreateUser(
	fetch: ApiFetch,
	token: string,
	payload: ReturnType<typeof parseCreateUser>
) {
	return await createUser(fetch, token, payload);
}

// ✅ AHORA sí pasa token
export async function serviceEditUser(
	fetch: ApiFetch,
	token: string,
	id: string | number,
	payload: { email: string; rol_id: number }
) {
	return await editUser(fetch, token, id, payload);
}

// ✅ AHORA sí pasa token
export async function serviceDeleteUser(fetch: ApiFetch, token: string, id: string | number) {
	return await deleteUser(fetch, token, id);
}
