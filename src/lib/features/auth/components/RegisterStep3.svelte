<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	export let formData: Record<string, string>;
</script>

<div class="space-y-4">
	<div>
		<Label for="password">Contraseña</Label>
		<Input id="password" name="password" type="password" bind:value={formData.password} required />
	</div>
</div>
