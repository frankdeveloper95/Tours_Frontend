<script lang="ts">
	export let progress: number;
</script>

<div class="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
	<div class="h-2 rounded-full bg-blue-600 transition-all duration-300" style={`width: ${progress}%`} />
</div>
