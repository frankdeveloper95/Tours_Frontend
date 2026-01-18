export const FALLBACK_IMG = 'https://via.placeholder.com/1600x900?text=Tour';

export function formatDateEC(value: string) {
	const d = new Date(value);
	if (Number.isNaN(d.getTime())) return value;
	return d.toLocaleDateString('es-EC', { year: 'numeric', month: 'long', day: 'numeric' });
}

export function formatTimeHHMM(value: string) {
	return value?.slice(0, 5) ?? '';
}

export function safeStringArray(value: unknown): string[] {
	return Array.isArray(value) ? value.filter((x) => typeof x === 'string') : [];
}

export function fullName(nombre?: string | null, apellido?: string | null) {
	return `${nombre ?? ''} ${apellido ?? ''}`.trim();
}
