<script lang="ts">
	import type {Todo} from '@prisma/client';
	import {SearchIcon, XIcon} from 'lucide-svelte';

	let {data} = $props();
</script>

<svelte:head>
	<title>Todo App</title>
</svelte:head>

<main class="mx-auto max-w-screen-md p-4 lg:p-16">
	<div class="flex items-center gap-2">
		<h2 class="text-2xl font-bold">Todo</h2>
		<div
			class="rounded bg-neutral-200 px-1.5 py-1 font-mono text-xs leading-none"
		>
			{data.total}
		</div>
	</div>

	<form class="mt-8" method="get">
		<input type="hidden" name="page" value={data.page} />
		<input type="hidden" name="size" value={data.size} />

		<div class="relative">
			<input
				type="search"
				name="search"
				value={data.search}
				placeholder="Search"
				class="block h-12 w-full rounded border border-neutral-300 pl-10 pr-4 outline-none placeholder:text-neutral-400"
			/>

			<SearchIcon class="absolute left-2 top-1/2 h-5 w-5 -translate-y-1/2" />
		</div>
	</form>

	<div class="mt-8">
		<ul class="space-y-1.5">
			{#each data.rows as todo}
				<li>{@render item(todo)}</li>
			{/each}
		</ul>
	</div>
</main>

{#snippet item(todo: Todo)}
	<div class="flex items-center gap-2 rounded border border-neutral-300 p-5">
		<p class="grow">
			{todo.title}
		</p>

		<button type="button" class="group flex" onclick={() => {}}>
			<XIcon class="h-5 w-5 text-neutral-300 group-hover:text-neutral-500" />
			<span class="sr-only">Delete</span>
		</button>
	</div>
{/snippet}
