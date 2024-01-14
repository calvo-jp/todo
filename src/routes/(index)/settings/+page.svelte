<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';

	let {form, data} = $props();
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="mx-auto w-full max-w-[22rem] py-16">
	{#if form}
		{#if form.success}
			<Alert class="mb-6">
				{form.message}
			</Alert>
		{:else}
			<Alert status="error" class="mb-6">
				{form.message}
			</Alert>
		{/if}
	{/if}

	<form method="post" novalidate class="space-y-5" use:enhance>
		<Input name="name" placeholder="Name" value={data.user?.name} />
		<Input
			type="email"
			name="email"
			placeholder="Email"
			value={data.user?.email}
		/>
		<Input type="password" name="password" placeholder="Password" />
		<Button type="submit">Save Changes</Button>
	</form>
</div>
