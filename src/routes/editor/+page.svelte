<script lang="ts">
	import {enhance} from '$app/forms';
	import ExclamationCircleIcon from '$lib/exclamation-circle-icon.svelte';

	let {form} = $props();
</script>

<svelte:head>
	<title>Todo | Editor</title>
</svelte:head>

<div class="mx-auto w-full max-w-[22rem] py-16">
	{#if form?.error}
		<div
			role="alert"
			class="mb-6 flex items-center gap-2 bg-red-100 px-5 py-4 leading-none text-red-500"
		>
			<ExclamationCircleIcon class="h-5 w-5" />
			<p>{form.error}</p>
		</div>
	{/if}

	<form method="post" novalidate class="space-y-6" use:enhance>
		<input
			name="name"
			value={form?.values?.name}
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
