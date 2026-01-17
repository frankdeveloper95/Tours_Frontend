<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	export let formData: Record<string, string>;
</script>

<div class="space-y-4">
	<div>
		<Label for="cedula">Cédula</Label>
		<Input id="cedula" name="cedula" bind:value={formData.cedula} required />
	</div>
	<div>
		<Label for="nombre">Nombre</Label>
		<Input id="nombre" name="nombre" bind:value={formData.nombre} required />
	</div>
	<div>
		<Label for="apellido">Apellido</Label>
		<Input id="apellido" name="apellido" bind:value={formData.apellido} required />
	</div>
</div>
