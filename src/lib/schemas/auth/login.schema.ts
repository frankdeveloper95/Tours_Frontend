import type { LoginFormData } from '$lib/types/auth';

export function validateLogin(data: LoginFormData): string | null {
	if (!data.email.trim() || !data.password) return 'Email y contraseña son obligatorios.';
	if (!/^\S+@\S+\.\S+$/.test(data.email.trim())) return 'El email no tiene un formato válido.';
	return null;
}
