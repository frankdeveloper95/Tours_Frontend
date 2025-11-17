<script lang="ts">
	import { Button, Helper, Input, Label } from 'flowbite-svelte';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

<form method="POST" class="flex min-h-screen min-w-screen flex-col items-center justify-center">
	<div class="flex w-72 flex-col gap-4">
		<div class="flex flex-col gap-2">
			<Label for="email" {...form?.success === false ? { color: 'red' } : {}}>Email</Label>
			<Input
				type="email"
				id="email"
				{...form?.success === false ? { color: 'red' } : {}}
				name="email"
				placeholder="example@domain.com"
				required
				value={form?.data.email ?? ''}
			/>
		</div>
		<div class="flex flex-col gap-2">
			<Label for="password" {...form?.success === false ? { color: 'red' } : {}}>Password</Label>
			<Input
				type="password"
				id="password"
				{...form?.success === false ? { color: 'red' } : {}}
				name="password"
				placeholder="••••••••"
				required
				value={form?.data.password ?? ''}
			/>
		</div>
		{#if !form?.success}
			<Helper color="red">{form?.message}</Helper>
		{/if}
		<Button type="submit">Enviar</Button>
	</div>
</form>
