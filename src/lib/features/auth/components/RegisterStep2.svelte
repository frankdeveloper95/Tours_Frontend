<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	export let formData: Record<string, string>;
</script>

<div class="space-y-4">
	<div>
		<Label for="telefono">Teléfono</Label>
		<Input id="telefono" name="telefono" bind:value={formData.telefono} required />
	</div>
	<div>
		<Label for="email">Email</Label>
		<Input id="email" name="email" type="email" bind:value={formData.email} required />
	</div>
</div>
