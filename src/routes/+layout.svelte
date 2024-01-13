<script lang="ts">
	import '../app.css';

	const {children, data} = $props();
</script>

{#if data.user}
	<header class="flex gap-2 border-b border-gray-200 px-8 py-5">
		<div>Logo</div>
		<div class="grow" />
		<div class="flex items-center gap-2">
			<div class="leading-none text-gray-700">
				{data.user.email}
			</div>
			<div class="text-sm leading-none text-gray-200">|</div>
			<form method="post" action="/?/logout" class="leading-none">
				<button type="submit" class="text-sm leading-none text-red-500"
					>Logout</button
				>
			</form>
		</div>
	</header>
{/if}

<main>
	{@render children()}
</main>
