<script lang="ts">
	import FaqAccordion from '$lib/components/faqs/FaqAccordion.svelte';
	import { faqsIslaPlata } from '$lib/data/faqs';
</script>

<svelte:head>
	<title>FAQs | Isla de la Plata</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-10">
	<FaqAccordion title="Isla de la Plata" faqs={faqsIslaPlata} />
</div>
