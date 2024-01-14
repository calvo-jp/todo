<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';

	let {form} = $props();
</script>

<svelte:head>
	<title>Todos | Register</title>
</svelte:head>

{#if form && !form.success}
	<Alert status="error" class="mb-6">
		{form.message}
	</Alert>
{/if}

<form method="post" novalidate class="space-y-5" use:enhance>
	<Input name="name" placeholder="Name" />
	<Input type="email" name="email" placeholder="Email" />
	<Input type="password" name="password" placeholder="Password" />
	<Button type="submit">Register</Button>
</form>

<div class="mt-5 flex justify-center gap-1">
	<p class="text-gray-600">Have an account?</p>
	<a href="/login">Login</a>
</div>
