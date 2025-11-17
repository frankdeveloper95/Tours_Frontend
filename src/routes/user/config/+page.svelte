<script lang="ts">
	import { Input, Label } from 'flowbite-svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Perfil</title>
</svelte:head>

<div class="flex min-h-full min-w-full">
	<form>
		<div class="flex-col gap-8">
			<div class="flex flex-col gap-2">
				<Label for="email">email</Label>
				<Input
					type="email"
					id="email"
					name="email"
					placeholder="example@domain.com"
					required
					value={data.user.email}
				/>
			</div>
		</div>
	</form>
</div>
