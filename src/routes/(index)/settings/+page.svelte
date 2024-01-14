<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';

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

	<form method="post" class="space-y-5" use:enhance>
		<input
			name="name"
			placeholder="Name"
			class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
			value={data.user?.name}
		/>
		<input
			type="email"
			name="email"
			placeholder="Email"
			class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
			value={data.user?.email}
		/>
		<input
			type="password"
			name="password"
			placeholder="Password"
			class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
		/>
		<button
			type="submit"
			class="block h-12 w-full bg-gray-900 text-white outline-none"
		>
			Save Changes
		</button>
	</form>
</div>
