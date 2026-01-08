import { redirect } from '@sveltejs/kit';

type UserLike = { rol_id?: number } | null | undefined;

/**
 * Regla: si no hay sesión -> /auth/login
 * si no es admin -> / (o /home)
 */
export function requireAdmin(user: UserLike) {
	if (!user) throw redirect(302, '/auth/login');
	if (user.rol_id !== 1) throw redirect(302, '/'); // ajusta si tu rol admin es otro
}
