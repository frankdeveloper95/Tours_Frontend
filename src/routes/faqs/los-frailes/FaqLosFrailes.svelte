<script lang="ts">
	import FaqAccordion from '$lib/components/faqs/FaqAccordion.svelte';
	import { faqsLosFrailes } from '$lib/data/faqs';
</script>

<svelte:head>
	<title>FAQs | Playa Los Frailes</title>
</svelte:head>

<div class="mx-auto max-w-5xl px-4 py-10">
	<FaqAccordion title="Playa Los Frailes" faqs={faqsLosFrailes} />
</div>
