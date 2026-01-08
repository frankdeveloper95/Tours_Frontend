<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { goto } from '$app/navigation';
	import {
		Button,
		Drawer,
		Helper,
		Input,
		Label,
		Modal,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		TableSearch
	} from 'flowbite-svelte';

	import type { PageData, ActionData } from './$types';
	import type { AdminUser } from '$lib/features/admin/users/users.types';

	const { data, form } = $props<{
		data: PageData;
		form: ActionData;
	}>();

	let formModal = $state(false);
	let drawerOpen = $state(false);
	let error = $state('');

	let selectedEditRol = $state.raw('');
	let selectedCreateRol = $state.raw('');

	let estado = $state((data as any)?.estado ?? 'active'); // 'active' | 'inactive' | 'all'

	const roles = [
		{ value: '1', name: 'Administrador' },
		{ value: '2', name: 'Usuario' }
		
	];

	let userEdit = $state.raw<AdminUser>({
		id: '',
		rol_id: 2,
		estado_id: 1,
		cedula: '',
		nombre: '',
		apellido: '',
		telefono: '',
		email: ''
	});


	const divClass =
		'bg-white dark:bg-gray-800 max-w-full relative shadow-md sm:rounded-lg overflow-hidden';
	const innerDivClass =
		'flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4';
	const searchClass = 'w-full md:w-1/2 relative';

	let searchTerm = $state('');

	let filteredItems = $derived.by(() => {
		const users = (data?.users ?? []) as AdminUser[];
		const term = searchTerm.trim().toLowerCase();
		if (!term) return users;
		return users.filter((u) => (u.email ?? '').toLowerCase().includes(term));
	});

	function openCreateModal() {
		error = '';
		selectedCreateRol = '';
		formModal = true;
	}

	function openEditDrawer(item: AdminUser) {
		error = '';
		userEdit = item;
		selectedEditRol = String(item.rol_id ?? '');
		drawerOpen = true;
	}
</script>


<svelte:head>
	<title>Administración de Usuarios</title>
</svelte:head>

{#if error}
	<div class="mb-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">
		{error}
	</div>
{/if}

<TableSearch
	striped={true}
	placeholder="Busca por Email"
	hoverable
	bind:inputValue={searchTerm}
	classes={{ inner: innerDivClass, search: searchClass, root: divClass }}
>
	{#snippet header()}
		<div class="flex w-full items-center justify-between gap-3">
			<div class="flex items-center gap-2">
			<select
				class="rounded-lg border p-2 dark:bg-gray-800"
				bind:value={estado}
				on:change={() => goto(`?estado=${estado}`)}
			>
				<option value="active">Activos</option>
				<option value="inactive">Inactivos</option>
				<option value="all">Todos</option>
			</select>
			</div>

			<Button onclick={openCreateModal}>Añadir</Button>
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
		{#each filteredItems as item (item.id)}
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
					<Button size="sm" onclick={() => openEditDrawer(item)}>Editar</Button>

					<form
						method="POST"
						action="?/delete"
						use:enhance={() => {
							return async ({ result }) => {
								if (result.type === 'success') {
									error = '';
									await invalidateAll();
								} else {
									error = 'No se pudo desactivar la cuenta.';
								}
							};
						}}
					>
						<input type="hidden" name="id" value={item.id} />

						<Button type="submit" size="sm" disabled={item.estado_id === 2}>
							{item.estado_id === 2 ? 'Inactivo' : 'Desactivar cuenta'}
						</Button>
					</form>
				</TableBodyCell>
			</TableBodyRow>
		{/each}
	</TableBody>
</TableSearch>

<!-- =========================
     Drawer: Edit User
========================= -->
<Drawer placement="right" form bind:open={drawerOpen} classes={{ form: 'space-y-6 mb-6' }}>
	<form
		class="flex flex-col gap-y-4"
		action="?/edit"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					error = '';
					drawerOpen = false;
					await invalidateAll();
				} else {
					error = 'No se pudo actualizar el usuario.';
				}
			};
		}}
	>
		<input type="hidden" name="id" value={userEdit.id} />

		<Label>Email</Label>
		<Input id="email" name="email" type="email" bind:value={userEdit.email} />

		<Label>
			Rol
			<select
				class="mt-2 w-full rounded-lg border p-2 dark:bg-gray-800"
				bind:value={selectedEditRol}
				>
				<option value="" disabled>Selecciona un rol</option>
				{#each roles as r}
					<option value={r.value}>{r.name}</option>
				{/each}
			</select>

			<input type="hidden" name="rol_id" value={selectedEditRol} />
		</Label>

		<Button type="submit">Actualizar</Button>
	</form>
</Drawer>

<!-- =========================
     Modal: Create User
========================= -->
<Modal form bind:open={formModal} size="xs">
	<form
		class="flex flex-col space-y-4"
		method="POST"
		action="?/create"
		use:enhance={() => {
			return async ({ result, update }) => {
				// ✅ Permite que se muestren form.errors cuando el action retorna fail(...)
				await update();

				if (result.type === 'success') {
					error = '';
					formModal = false;
					selectedCreateRol = '';
					await invalidateAll();
				} else {
					error = 'No se pudo crear el usuario. Revisa los campos.';
				}
			};
		}}
	>
		<Label for="cedula" {...(form?.errors?.nested?.cedula ? { color: 'red' } : {})} class="space-y-4">
			Cédula
		</Label>
		<Input
			id="cedula"
			color={form?.errors?.nested?.cedula ? 'red' : 'default'}
			type="text"
			name="cedula"
			value={form?.data?.cedula ?? ''}
			placeholder="1310000000"
		/>
		{#if form?.errors?.nested?.cedula}
			<Helper color="red"><span class="font-medium">{form.errors.nested.cedula}</span></Helper>
		{/if}

		<Label for="email" {...(form?.errors?.nested?.email ? { color: 'red' } : {})} class="space-y-4">
			Email
		</Label>
		<Input
			id="email"
			color={form?.errors?.nested?.email ? 'red' : 'default'}
			type="email"
			name="email"
			value={form?.data?.email ?? ''}
			placeholder="example@example.com"
		/>
		{#if form?.errors?.nested?.email}
			<Helper color="red"><span class="font-medium">{form.errors.nested.email}</span></Helper>
		{/if}

		<Label for="nombre" {...(form?.errors?.nested?.nombre ? { color: 'red' } : {})} class="space-y-4">
			Nombre
		</Label>
		<Input
			id="nombre"
			color={form?.errors?.nested?.nombre ? 'red' : 'default'}
			type="text"
			name="nombre"
			value={form?.data?.nombre ?? ''}
			placeholder="Juan"
		/>
		{#if form?.errors?.nested?.nombre}
			<Helper color="red"><span class="font-medium">{form.errors.nested.nombre}</span></Helper>
		{/if}

		<Label for="apellido" {...(form?.errors?.nested?.apellido ? { color: 'red' } : {})} class="space-y-4">
			Apellido
		</Label>
		<Input
			id="apellido"
			color={form?.errors?.nested?.apellido ? 'red' : 'default'}
			type="text"
			name="apellido"
			value={form?.data?.apellido ?? ''}
			placeholder="Perez"
		/>
		{#if form?.errors?.nested?.apellido}
			<Helper color="red"><span class="font-medium">{form.errors.nested.apellido}</span></Helper>
		{/if}

		<Label for="password" {...(form?.errors?.nested?.password ? { color: 'red' } : {})} class="space-y-4">
			Contraseña
		</Label>
		<Input
			id="password"
			color={form?.errors?.nested?.password ? 'red' : 'default'}
			type="password"
			name="password"
			value={form?.data?.password ?? ''}
			placeholder="•••••••••"
		/>
		{#if form?.errors?.nested?.password}
			<Helper color="red"><span class="font-medium">{form.errors.nested.password}</span></Helper>
		{/if}

		<Label for="telefono" {...(form?.errors?.nested?.telefono ? { color: 'red' } : {})} class="space-y-4">
			Telefono
		</Label>
		<Input
			id="telefono"
			color={form?.errors?.nested?.telefono ? 'red' : 'default'}
			type="text"
			name="telefono"
			value={form?.data?.telefono ?? ''}
			placeholder="0999999999"
		/>
		{#if form?.errors?.nested?.telefono}
			<Helper color="red"><span class="font-medium">{form.errors.nested.telefono}</span></Helper>
		{/if}

		<Label for="rol_id" class="space-y-4">Rol</Label>
		<select
			name="rol_id"
			class="mt-2 w-full rounded-lg border p-2 dark:bg-gray-800"
			bind:value={selectedCreateRol}
		>
			<option value="" disabled>Selecciona un rol</option>
			{#each roles as r}
				<option value={r.value}>{r.name}</option>
			{/each}
		</select>

		<Button type="submit">Crear</Button>
	</form>
</Modal>
