<script lang="ts">
	import {enhance} from '$app/forms';
	import ExclamationCircleIcon from '$lib/exclamation-circle-icon.svelte';

	let {form} = $props();
</script>

<svelte:head>
	<title>Todos | Login</title>
</svelte:head>

{#if form && !form.success}
	<div
		role="alert"
		class="mb-6 flex items-center gap-2 bg-red-100 px-5 py-4 leading-none text-red-500"
	>
		<ExclamationCircleIcon class="h-5 w-5" />
		<p>{form.message}</p>
	</div>
{/if}

<form method="post" class="space-y-5" use:enhance>
	<input
		type="email"
		name="email"
		placeholder="Email"
		class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
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
		Login
	</button>
</form>

<div class="mt-5 flex justify-center gap-1">
	<p class="text-gray-600">No account?</p>
	<a href="/register">Register</a>
</div>
