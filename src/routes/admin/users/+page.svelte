<script lang="ts">
	type user = {
		id: string;
		email: string;
	};
	import { enhance } from '$app/forms';
	import { refreshAll } from '$app/navigation';
	import { PUBLIC_HOST, PUBLIC_VERSION } from '$env/static/public';
	import {
		Button,
		Drawer,
		Helper,
		Input,
		Label,
		Modal,
		Select,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';
	import type { PageProps } from './$types';

	//Modal
	let formModal = $state(false);
	let error = $state('');

	let divClass =
		'bg-white dark:bg-gray-800 max-w-full relative shadow-md sm:rounded-lg overflow-hidden';
	let innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	let searchClass = 'w-full md:w-1/2 relative';
	let { data, form }: PageProps = $props();

	let open1 = $state(false);
	let selected = $state.raw('');
	let selected2 = $state.raw('');

	const roles = [
		{ value: '1', name: 'Administrador' },
		{ value: '2', name: 'Usuario' }
	];

	let userEdit: user = $state.raw({ id: '', email: '' });
	let searchTerm = $state('');
	let filteredItems = $derived.by(() =>
		data.users.filter(
			(user: user) => !searchTerm || user.email.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	async function handleDelete(id: string) {
		const res = await fetch(`${PUBLIC_HOST}/api/${PUBLIC_VERSION}/users/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${data.token}`
			}
		});
		if (res.ok) {
			await refreshAll();
		}
	}
</script>

<svelte:head>
	<title>Administración de Usuarios</title>
</svelte:head>

<TableSearch
	striped={true}
	placeholder="Busca por Email"
	hoverable
	bind:inputValue={searchTerm}
	classes={{ inner: innerDivClass, search: searchClass, root: divClass }}
>
	{#snippet header()}
		<div
			class="flex w-full shrink-0 flex-col items-stretch justify-end space-y-2 md:w-auto md:flex-row md:items-center md:space-y-0 md:space-x-3"
		>
			<Button
				onclick={() => {
					formModal = true;
				}}>Añadir</Button
			>
		</div>
	{/snippet}
	<TableHead>
		<TableHeadCell>#id</TableHeadCell>
		<TableHeadCell>rol_id</TableHeadCell>
		<TableHeadCell>estado_id</TableHeadCell>
		<TableHeadCell>cedula</TableHeadCell>
		<TableHeadCell>nombre</TableHeadCell>
		<TableHeadCell>apellido</TableHeadCell>
		<TableHeadCell>telefono</TableHeadCell>
		<TableHeadCell>email</TableHeadCell>
		<TableHeadCell>actions</TableHeadCell>
	</TableHead>
	<TableBody>
		{#each filteredItems as item}
			<TableBodyRow>
				<TableBodyCell>{item.id}</TableBodyCell>
				<TableBodyCell>{item.rol_id}</TableBodyCell>
				<TableBodyCell>{item.estado_id}</TableBodyCell>
				<TableBodyCell>{item.cedula}</TableBodyCell>
				<TableBodyCell>{item.nombre}</TableBodyCell>
				<TableBodyCell>{item.apellido}</TableBodyCell>
				<TableBodyCell>{item.telefono}</TableBodyCell>
				<TableBodyCell>{item.email}</TableBodyCell>
				<TableBodyCell class="flex gap-x-2">
					<Button
						onclick={() => {
							open1 = true;
							userEdit = item;
							selected = String(item.rol_id);
						}}
						size="sm">Editar</Button
					>
					<Button onclick={() => handleDelete(item.id)} size="sm">Eliminar</Button>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>

<Drawer placement="right" form bind:open={open1} classes={{ form: 'space-y-6 mb-6' }}>
	<form
		class="flex flex-col gap-y-4"
		action="?/edit"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type == 'success') {
					open1 = false;
					await refreshAll();
				}
			};
		}}
	>
		<input type="hidden" name="id" value={userEdit.id} />
		<Label>Email</Label>
		<Input id="email" type="email" value={userEdit.email} />
		<Label>
			Rol
			<Select
				name="rol_id"
				class="mt-2"
				items={roles}
				bind:value={selected}
				placeholder="Selecciona un rol"
			/>
		</Label>
		<Button type="submit">Actualizar</Button>
	</form>
</Drawer>

<Modal form bind:open={formModal} size="xs">
	<form
		class="flex flex-col space-y-4"
		method="POST"
		action="?/create"
		use:enhance={()=>{
			return async ({result, update}) => {
				await update();
				if (result.type == 'success') {
					formModal = false;
					await refreshAll();
				}
			}
		}}
		>
		<Label for="cedula" {...form?.errors?.nested?.cedula ? { color: 'red' } : {}} class="space-y-4"
			>Cédula</Label
		>
		<Input
			id="cedula"
			color={form?.errors?.nested?.cedula ? 'red' : 'default'}
			type="text"
			name="cedula"
			value={form?.data?.cedula ?? ''}
			placeholder="1310000000"
		/>

		{#if form?.errors?.nested?.cedula}
			<Helper color="red">
				<span class="font-medium">{form.errors.nested.cedula}</span>
			</Helper>
		{/if}

		<Label for="email" {...form?.errors?.nested?.email ? { color: 'red' } : {}} class="space-y-4"
			>Email</Label
		>
		<Input
			id="email"
			color={form?.errors?.nested?.email ? 'red' : 'default'}
			type="email"
			name="email"
			value={form?.data?.email ?? ''}
			placeholder="example@example.com"
		/>

		{#if form?.errors?.nested?.email}
			<Helper color="red">
				<span class="font-medium">{form.errors.nested.email}</span>
			</Helper>
		{/if}

		<Label for="nombre" {...form?.errors?.nested?.nombre ? { color: 'red' } : {}} class="space-y-4"
			>Nombre</Label
		>
		<Input
			id="nombre"
			color={form?.errors?.nested?.nombre ? 'red' : 'default'}
			type="text"
			name="nombre"
			value={form?.data?.nombre ?? ''}
			placeholder="Juan"
		/>

		{#if form?.errors?.nested?.nombre}
			<Helper color="red">
				<span class="font-medium">{form.errors.nested.nombre}</span>
			</Helper>
		{/if}

		<Label
			for="apellido"
			{...form?.errors?.nested?.apellido ? { color: 'red' } : {}}
			class="space-y-4">Apellido</Label
		>
		<Input
			id="apellido"
			color={form?.errors?.nested?.apellido ? 'red' : 'default'}
			type="text"
			name="apellido"
			value={form?.data?.apellido ?? ''}
			placeholder="Perez"
		/>

		{#if form?.errors?.nested?.apellido}
			<Helper color="red">
				<span class="font-medium">{form.errors.nested.apellido}</span>
			</Helper>
		{/if}

		<Label
			for="password"
			{...form?.errors?.nested?.password ? { color: 'red' } : {}}
			class="space-y-4">Contraseña</Label
		>
		<Input
			id="password"
			color={form?.errors?.nested?.password ? 'red' : 'default'}
			type="password"
			name="password"
			value={form?.data?.password ?? ''}
			placeholder="•••••••••"
		/>

		{#if form?.errors?.nested?.password}
			<Helper color="red">
				<span class="font-medium">{form.errors.nested.password}</span>
			</Helper>
		{/if}

		<Label
			for="telefono"
			{...form?.errors?.nested?.telefono ? { color: 'red' } : {}}
			class="space-y-4">Telefono</Label
		>
		<Input
			id="telefono"
			color={form?.errors?.nested?.telefono ? 'red' : 'default'}
			type="text"
			name="telefono"
			value={form?.data?.telefono ?? ''}
			placeholder="0999999999"
		/>

		{#if form?.errors?.nested?.telefono}
			<Helper color="red">
				<span class="font-medium">{form.errors.nested.telefono}</span>
			</Helper>
		{/if}

		<Label for="rol_id" class="space-y-4">Rol</Label>
		<Select name="rol_id" items={roles} bind:value={selected2} placeholder="Selecciona un rol" />

		<Button type="submit">Crear</Button>
	</form>
</Modal>
