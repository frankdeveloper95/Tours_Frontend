<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

{#if data.success}
	<div class="flex min-h-full min-w-full items-center justify-center">
		<span class="dark:text-white">Pagada</span>
	</div>
{/if}
