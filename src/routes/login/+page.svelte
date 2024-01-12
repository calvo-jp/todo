<script lang="ts">
	let {form} = $props();
</script>

<svelte:head>
	<title>Todos | Login</title>
</svelte:head>

<div>
	{#if form?.error}
		<div>{form.error}</div>
	{/if}

	<form method="post">
		<input name="email" placeholder="Email" />
		<input name="password" placeholder="Password" />
		<button type="submit">Login</button>
	</form>
</div>
