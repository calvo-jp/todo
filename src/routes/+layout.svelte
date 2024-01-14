<script lang="ts">
	import '../app.css';

	import {enhance} from '$app/forms';
	import Logo from '$lib/logo.svelte';

	const {children, data} = $props();
</script>

{#if data.user}
	<header class="flex items-center gap-2 border-b border-gray-200 px-8 py-3">
		<div>
			<Logo />
		</div>
		<div class="grow" />
		<nav>
			<ul class="flex items-center gap-5 leading-none text-gray-700">
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/settings">
						{data.user.name}
					</a>
				</li>
				<li>
					<form method="post" action="/?/logout" use:enhance>
						<button type="submit">Logout</button>
					</form>
				</li>
			</ul>
		</nav>
	</header>
{/if}

<main>
	{@render children()}
</main>
