<script lang="ts">
	import {enhance} from '$app/forms';
	import CheckCircleIcon from '$lib/check-circle-icon.svelte';
	import ExclamationCircleIcon from '$lib/exclamation-circle-icon.svelte';
	import {twMerge} from 'tailwind-merge';

	let {form, data} = $props();
</script>

<svelte:head>
	<title>Settings</title>
</svelte:head>

<div class="mx-auto w-full max-w-[22rem] py-16">
	{#if form}
		<div
			role="alert"
			class={twMerge(
				'mb-6 flex items-center gap-2 px-5 py-4 leading-none',
				form.success
					? 'bg-green-100 text-green-500'
					: 'bg-red-100 text-red-500',
			)}
		>
			{#if form.success}
				<CheckCircleIcon class="h-5 w-5" />
				<p>{form.message}</p>
			{:else}
				<ExclamationCircleIcon class="h-5 w-5" />
				<p>{form.message}</p>
			{/if}
		</div>
	{/if}

	<form method="post" class="space-y-5" use:enhance>
		<input
			name="name"
			placeholder="Name"
			class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
			value={form?.meta?.values.name ?? data.user?.name}
		/>
		<input
			type="email"
			name="email"
			placeholder="Email"
			class="block h-12 w-full border border-gray-200 px-4 outline-none placeholder:text-gray-400"
			value={form?.meta?.values.email ?? data.user?.email}
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
