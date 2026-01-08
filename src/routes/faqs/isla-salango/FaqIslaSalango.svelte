<script lang="ts">
	import FaqAccordion from '$lib/components/faqs/FaqAccordion.svelte';
	import { faqsIslaSalango } from '$lib/data/faqs';
</script>

<svelte:head>
	<title>FAQs | Isla Salango</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-10">
	<FaqAccordion title="Isla Salango" faqs={faqsIslaSalango} />
</div>
