<script lang="ts">
	let {form} = $props();
</script>

<svelte:head>
	<title>Todo | Editor</title>
</svelte:head>

<div>
	<form method="post" novalidate>
		{#if form?.error}
			<div>{form.error}</div>
		{/if}

		<input
			placeholder="Todo"
			name="name"
			class="block w-full"
			value={form?.values?.name}
		/>
		<button type="submit" class="block w-full">Create</button>
	</form>
</div>
