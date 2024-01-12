<script lang="ts">
	let {form} = $props();
</script>

<svelte:head>
	<title>Todos | Register</title>
</svelte:head>

<div>
	{#if form?.error}
		<div>{form.error}</div>
	{/if}

	<form method="post">
		<input name="name" placeholder="Name" />
		<input name="email" placeholder="Email" />
		<input name="password" placeholder="Password" />
		<button type="submit">Register</button>
	</form>
</div>
