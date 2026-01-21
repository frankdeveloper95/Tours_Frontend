<!-- src/lib/components/sidebar.svelte (o src/components/sidebar.svelte) -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import {
		Sidebar,
		SidebarButton,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem
	} from 'flowbite-svelte';
	import { EditSolid } from 'flowbite-svelte-icons';

	let { children, user } = $props();

	let activeUrl = $state(page.url.pathname);

	// ✅ Viewport real (evita overlay fantasma)
	let isDesktop = $state(true); // 👈 importante: arranca true para NO bloquear desktop durante hidración
	let mobileOpen = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(min-width: 768px)');

		const apply = () => {
			isDesktop = mq.matches;
			// Desktop: no usamos overlay ni modo offcanvas
			// Móvil: inicia cerrado
			if (isDesktop) mobileOpen = false;
		};

		apply();
		mq.addEventListener('change', apply);
		return () => mq.removeEventListener('change', apply);
	});

	$effect(() => {
		activeUrl = page.url.pathname;
		// Si navega en móvil, cierra el menú al cambiar de ruta (UX)
		if (!isDesktop) mobileOpen = false;
	});

	const isLoggedIn = $derived(Boolean(user));
	const isAdmin = $derived(Boolean(user) && user.rol_id === 1);

	// UI classes
	const spanClass = 'ms-3 flex-1 whitespace-nowrap';

	const activeClass =
		'group flex items-center rounded-2xl px-3 py-2 text-sm font-semibold text-white shadow-sm ' +
		'bg-gradient-to-r from-primary-600 to-primary-500 ' +
		'hover:from-primary-700 hover:to-primary-600 ' +
		'dark:from-primary-700 dark:to-primary-600';

	const nonActiveClass =
		'group flex items-center rounded-2xl px-3 py-2 text-sm font-medium ' +
		'text-gray-700 hover:bg-gray-100 hover:text-gray-900 ' +
		'dark:text-gray-200 dark:hover:bg-gray-800/70 dark:hover:text-white';

	const sectionTitleClass =
		'px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400';

	const publicSidebar = [
		{ label: 'Inicio', href: '/' },
		{ label: 'Tours', href: '/home' },
		{ label: 'Cómo funciona', href: '/como-funciona' },
		{ label: 'FAQs', href: '/faqs' },
		{ label: 'Contacto', href: '/contacto' }
	];

	const userSidebar = [
		{ label: 'Mis Reservas', href: '/protected/reservas' },
		{ label: 'Mi Perfil', href: '/protected/perfil' }
	];

	const adminCrudSidebar = [
		{ label: 'Usuarios', href: '/admin/users' },
		{ label: 'Crear Tours', href: '/admin/tours/create' },
		{ label: 'Gestionar tours', href: '/admin/tours'},
		{ label: 'Gestionar reservas', href: '/admin/reservas' }
		// { label: 'Operadoras', href: '/admin/operadoras' },
		// { label: 'Guías', href: '/admin/guias' }
	];

	// const adminOpsSidebar = [
	// 	{ label: 'Reservas', href: '/admin/reservas' },
	// 	{ label: 'Zarpes / Cupos', href: '/admin/zarpes' },
	// 	{ label: 'Reportes', href: '/admin/reportes' },
	// 	{ label: 'Bitácora', href: '/admin/bitacora' }
	// ];
</script>

<!-- ✅ Botón flotante SOLO móvil -->
{#if !isDesktop}
	<div class="fixed top-4 left-4 z-[60] md:hidden">
		<SidebarButton
			onclick={() => (mobileOpen = !mobileOpen)}
			class="rounded-2xl border border-gray-200 bg-white/80 shadow-sm backdrop-blur hover:bg-white dark:border-gray-800 dark:bg-gray-900/80 dark:hover:bg-gray-900"
		/>
	</div>
{/if}

<!-- ✅ Overlay SOLO móvil y SOLO cuando está abierto -->
{#if !isDesktop && mobileOpen}
	<button
		type="button"
		class="fixed inset-0 z-[49] bg-black/40"
		onclick={() => (mobileOpen = false)}
		aria-label="Cerrar menú"
	/>
{/if}

<div class="relative min-h-screen bg-gray-50 dark:bg-gray-950">
	<!-- ✅ Desktop: Sidebar SIEMPRE visible, SIN isOpen/backdrop (nada bloquea) -->
	{#if isDesktop}
		<Sidebar
			{activeUrl}
			position="fixed"
			class="z-50 h-screen w-72 border-r border-gray-200 bg-white/90 pt-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80"
			classes={{ nonactive: nonActiveClass, active: activeClass }}
		>
			<!-- Brand -->
			<div class="mb-6 px-4">
				<div class="flex items-center gap-3">
					<div
						class="grid h-10 w-10 place-items-center rounded-2xl bg-primary-600 text-white shadow-sm"
					>
						<span class="text-sm font-bold">T</span>
					</div>
					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-gray-900 dark:text-white">Tours</p>
						<p class="truncate text-xs text-gray-500 dark:text-gray-400">Puerto López</p>
					</div>
				</div>
			</div>

			<p class={sectionTitleClass}>Explorar</p>
			<SidebarGroup>
				{#each publicSidebar as { label, href }}
					<SidebarItem {label} {href} {spanClass} />
				{/each}
			</SidebarGroup>

			{#if isLoggedIn && !isAdmin}
				<div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
					<p class={sectionTitleClass}>Mi cuenta</p>
					<SidebarGroup>
						{#each userSidebar as { label, href }}
							<SidebarItem {label} {href} {spanClass} />
						{/each}
					</SidebarGroup>
				</div>
			{/if}

			{#if isAdmin}
				<div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
					<p class={sectionTitleClass}>Administración</p>
					<SidebarGroup>
						<SidebarDropdownWrapper
							label="CRUD"
							classes={{
								btn:
									'rounded-2xl px-3 py-2 text-sm font-semibold ' +
									'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/70'
							}}
						>
							{#each adminCrudSidebar as { label, href }}
								<SidebarItem {label} {href} />
							{/each}
						</SidebarDropdownWrapper>

						<!-- <SidebarDropdownWrapper
							label="Operación"
							classes={{
								btn:
									'rounded-2xl px-3 py-2 text-sm font-semibold ' +
									'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/70'
							}}
						>
							{#each adminOpsSidebar as { label, href }}
								<SidebarItem {label} {href} />
							{/each}
						</SidebarDropdownWrapper> -->
					</SidebarGroup>
				</div>
			{/if}

			<div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
				<p class={sectionTitleClass}>Acceso</p>
				<SidebarGroup>
					<SidebarDropdownWrapper
							label="Configuraciones"
							classes={{
								btn:
									'rounded-2xl px-3 py-2 text-sm font-semibold ' +
									'text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/70'
							}}
						>
							{#snippet icon()}
								<EditSolid class="h-5 w-5 text-gray-500 dark:text-gray-400" />
							{/snippet}

							{#if isLoggedIn}
								<!-- SOLO usuarios logueados -->
								<SidebarItem label="Configuración" href="/user/config" />
								<SidebarItem label="Cerrar sesión" href="/logout" />
							{:else}
								<!-- SOLO usuarios NO logueados -->
								<SidebarItem label="Iniciar sesión" href="/login" />
								<SidebarItem label="Crear cuenta" href="/register" />
							{/if}
					</SidebarDropdownWrapper>
				</SidebarGroup>
			</div>
		</Sidebar>
	{:else}
		<!-- ✅ Móvil: Sidebar offcanvas controlado por mobileOpen -->
		<Sidebar
			{activeUrl}
			backdrop={false}
			isOpen={mobileOpen}
			closeSidebar={() => (mobileOpen = false)}
			params={{ x: -40, duration: 120 }}
			position="fixed"
			class="z-50 h-screen w-72 border-r border-gray-200 bg-white/90 pt-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-900/80"
			classes={{ nonactive: nonActiveClass, active: activeClass }}
		>
			<!-- mismo contenido -->
			<div class="mb-6 px-4">
				<div class="flex items-center gap-3">
					<div
						class="grid h-10 w-10 place-items-center rounded-2xl bg-primary-600 text-white shadow-sm"
					>
						<span class="text-sm font-bold">T</span>
					</div>
					<div class="min-w-0">
						<p class="truncate text-sm font-semibold text-gray-900 dark:text-white">Tours</p>
						<p class="truncate text-xs text-gray-500 dark:text-gray-400">Puerto López</p>
					</div>
				</div>
			</div>

			<p class={sectionTitleClass}>Explorar</p>
			<SidebarGroup>
				{#each publicSidebar as { label, href }}
					<SidebarItem {label} {href} {spanClass} />
				{/each}
			</SidebarGroup>

			{#if isLoggedIn && !isAdmin}
				<div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
					<p class={sectionTitleClass}>Mi cuenta</p>
					<SidebarGroup>
						{#each userSidebar as { label, href }}
							<SidebarItem {label} {href} {spanClass} />
						{/each}
					</SidebarGroup>
				</div>
			{/if}

			{#if isAdmin}
				<div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
					<p class={sectionTitleClass}>Administración</p>
					<SidebarGroup>
						<SidebarDropdownWrapper label="CRUD">
							{#each adminCrudSidebar as { label, href }}
								<SidebarItem {label} {href} />
							{/each}
						</SidebarDropdownWrapper>
						<SidebarDropdownWrapper label="Operación">
							{#each adminOpsSidebar as { label, href }}
								<SidebarItem {label} {href} />
							{/each}
						</SidebarDropdownWrapper>
					</SidebarGroup>
				</div>
			{/if}

			<div class="mt-4 border-t border-gray-200 pt-4 dark:border-gray-800">
				<p class={sectionTitleClass}>Acceso</p>
				<SidebarGroup>
					<SidebarDropdownWrapper label="Configuraciones">
						<SidebarItem label="Configuración" href="/user/config" />
						{#if !isLoggedIn}
							<SidebarItem label="Iniciar sesión" href="/auth/login" />
							<SidebarItem label="Crear cuenta" href="/auth/register" />
						{:else}
							<SidebarItem label="Cerrar sesión" href="/logout" />
						{/if}
					</SidebarDropdownWrapper>
				</SidebarGroup>
			</div>
		</Sidebar>
	{/if}

	<!-- Main content -->
	<div class="md:ml-72">
		<div class="px-4 py-6">
			<div
				class="min-h-[calc(100vh-3rem)] rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
			>
				{@render children()}
			</div>
		</div>
	</div>
</div>
