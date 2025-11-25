<script lang="ts">
	import { page } from '$app/state';
</script>

{#if page.url.search.includes("?success=true")}
	<div class="flex min-h-full min-w-full items-center justify-center">
		<span class="dark:text-white">Pagada</span>
	</div>
{/if}
