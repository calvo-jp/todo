<script lang="ts">
	import {enhance} from '$app/forms';
	import {page} from '$app/stores';
	import {dataAttr} from '$lib/data-attr.js';
	import Logo from '$lib/logo.svelte';

	const {children, data} = $props();
</script>

<header class="flex items-center gap-2 border-b border-gray-200 px-8 py-3">
	<div>
		<Logo />
	</div>
	<div class="grow" />
	<nav>
		<ul class="flex items-center gap-5 font-heading leading-none text-gray-600">
			<li>
				<a
					href="/"
					class="data-selected:text-gray-700"
					data-selected={dataAttr($page.url.pathname === '/')}
				>
					Home
				</a>
			</li>
			<li>
				<a
					href="/settings"
					class="data-selected:text-gray-800"
					data-selected={dataAttr($page.url.pathname === '/settings')}
				>
					{data.user?.name}
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

<main>
	{@render children()}
</main>
