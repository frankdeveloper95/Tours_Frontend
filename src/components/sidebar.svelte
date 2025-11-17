<script lang="ts">
	import { page } from '$app/state';
	import {
		Sidebar,
		SidebarButton,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		uiHelpers
	} from 'flowbite-svelte';
	import { EditSolid } from 'flowbite-svelte-icons';

	let { children } = $props();
	let activeUrl = $state(page.url.pathname);
	const demoSidebarUi = uiHelpers();
	let isDemoOpen = $state(false);
	const closeDemoSidebar = demoSidebarUi.close;
	$effect(() => {
		isDemoOpen = demoSidebarUi.isOpen;
		activeUrl = page.url.pathname;
	});
	const spanClass = 'flex-1 ms-3 whitespace-nowrap';
	const activeClass =
		'flex items-center p-2 text-base font-normal text-white bg-primary-600 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-800 dark:hover:bg-primary-800';
	const nonActiveClass =
		'flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
</script>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<div class="relative">
	<Sidebar
		{activeUrl}
		backdrop={false}
		isOpen={isDemoOpen}
		closeSidebar={closeDemoSidebar}
		params={{ x: -50, duration: 50 }}
		class="z-50 h-full pt-6"
		position="absolute"
		classes={{ nonactive: nonActiveClass, active: activeClass }}
	>
		<SidebarGroup>
			<SidebarItem {spanClass} label="Tours" href="/home"></SidebarItem>
			<SidebarItem {spanClass} label="Mis Reservas" href="/reservas"></SidebarItem>
		</SidebarGroup>
		<SidebarGroup border>
			<SidebarDropdownWrapper label="Configuraciones" classes={{ btn: 'p-2' }}>
				{#snippet icon()}
					<EditSolid
						class="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				{/snippet}
				<SidebarItem label="Configuracion" href="/user/config" />
				<SidebarItem label="Cerrar Sesion" href="/logout" />
			</SidebarDropdownWrapper>
		</SidebarGroup>
	</Sidebar>
	<div class="grid overflow-auto px-4 md:ml-64">
		<div class="min-h-screen rounded-lg border-gray-200 p-4 dark:border-gray-700">
			{@render children()}
		</div>
	</div>
</div>
