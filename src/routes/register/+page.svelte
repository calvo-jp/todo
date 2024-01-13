<script lang="ts">
	import {enhance} from '$app/forms';
	import {AlertCircleIcon} from 'lucide-svelte';

	let {form} = $props();
</script>

<svelte:head>
	<title>Todos | Register</title>
</svelte:head>

<div class="mx-auto w-full max-w-[22rem] py-16">
	{#if form?.error}
		<div
			role="alert"
			class="mb-6 flex items-center gap-2 bg-red-100 px-5 py-4 leading-none text-red-500"
		>
			<AlertCircleIcon class="h-5 w-5" />
			<p>{form.error}</p>
		</div>
	{/if}

	<form method="post" class="space-y-5" use:enhance>
		<input
			name="name"
			placeholder="Name"
			class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
		/>
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
			Register
		</button>
	</form>

	<div class="mt-5 flex justify-center gap-1">
		<p class="text-gray-600">Have an account?</p>
		<a href="/login">Login</a>
	</div>
</div>
