<script lang="ts">
	import type { FAQ } from '$lib/types/faq';

	export let title: string = 'Preguntas frecuentes';
	export let faqs: FAQ[] = [];

	let openIndex: number | null = null;

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<section class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5">
	<div class="mb-3">
		<h2 class="text-base font-bold text-slate-900 dark:text-white">{title}</h2>
	</div>

	<div class="space-y-2">
		{#each faqs as item, i}
			<button
				type="button"
				class="w-full rounded-xl border border-slate-200/70 bg-white/60 p-4 text-left transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
				onclick={() => toggle(i)}
			>
				<div class="flex items-start justify-between gap-3">
					<span class="text-sm font-semibold text-slate-900 dark:text-white">{item.q}</span>
					<span class="text-lg leading-none text-slate-500 dark:text-white/60">
						{openIndex === i ? '−' : '+'}
					</span>
				</div>

				{#if openIndex === i}
					<p class="mt-2 text-sm text-slate-600 dark:text-white/70">{item.a}</p>
				{/if}
			</button>
		{/each}
	</div>
</section>
