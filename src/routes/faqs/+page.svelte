<script lang="ts">
	import FaqAccordion from '$lib/components/faqs/FaqAccordion.svelte';
	import { faqsIslaPlata, faqsIslaSalango, faqsLosFrailes } from '$lib/data/faqs';
</script>

<svelte:head>
	<title>FAQs | Spondylus</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-10 space-y-10">
	<div>
		<h1 class="text-2xl font-bold text-slate-900 dark:text-white">Preguntas frecuentes</h1>
		<p class="mt-1 text-sm text-slate-600 dark:text-white/60">
			Encuentra respuestas rápidas sobre nuestros destinos y tours.
		</p>
	</div>

	<FaqAccordion title="Isla de la Plata" faqs={faqsIslaPlata} />
	<FaqAccordion title="Isla Salango" faqs={faqsIslaSalango} />
	<FaqAccordion title="Playa Los Frailes" faqs={faqsLosFrailes} />
</div>
