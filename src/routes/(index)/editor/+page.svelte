<script lang="ts">
	import {enhance} from '$app/forms';
	import Alert from '$lib/alert.svelte';
	import Button from '$lib/button.svelte';
	import Input from '$lib/input.svelte';

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
		<Input name="name" placeholder="Todo" />
		<Button type="submit">Create</Button>
	</form>
</div>
