import type { ContactMessage } from '$lib/types/contact';
import { SITE } from '$lib/config/site';

export function buildWhatsAppLink(data: ContactMessage) {
	const text = `Hola! Soy ${data.name || '---'}
Teléfono: ${data.phone || '---'}
Email: ${data.email || '---'}

${data.message}`;

	return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}