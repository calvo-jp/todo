<script lang="ts">
	import '../app.css';

	const {children, data} = $props();
</script>

<header class="flex items-center px-4 py-2">
	<div>Logo</div>

	<div class="grow" />

	{#if data.session}
		<div>Hello, {data.session.user?.name}</div>
	{:else}
		<nav>
			<ul class="flex gap-2">
				<li>
					<a href="/login">Login</a>
				</li>
				<li>
					<a href="/register">Register</a>
				</li>
			</ul>
		</nav>
	{/if}
</header>

<main>
	{@render children()}
</main>

<footer></footer>
