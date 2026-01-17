export function validateStep(step: number, data: Record<string, string>): string | null {
	if (step === 1) {
		if (!data.cedula?.trim() || !data.nombre?.trim() || !data.apellido?.trim()) {
			return 'Completa cédula, nombre y apellido.';
		}
	}

	if (step === 2) {
		if (!data.telefono?.trim() || !data.email?.trim()) {
			return 'Completa teléfono y email.';
		}
	}

	return null;
}
