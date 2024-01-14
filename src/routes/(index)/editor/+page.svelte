<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';

	let {form} = $props();
</script>

<svelte:head>
	<title>Todo | Editor</title>
</svelte:head>

<div class="mx-auto w-full max-w-[22rem] py-16">
	{#if form && !form.success}
		<Alert status="error" class="mb-6">
			{form.message}
		</Alert>
	{/if}

	<form method="post" novalidate class="space-y-6" use:enhance>
		<input
			name="name"
			placeholder="Todo"
			class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
		/>

		<button
			type="submit"
			class="block h-12 w-full bg-gray-900 text-white outline-none"
		>
			Create
		</button>
	</form>
</div>
