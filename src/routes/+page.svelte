<script context="module">
	const numberFormatter = new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
	});
</script>

<script lang="ts">
	import type {Todo} from '@prisma/client';
	import {SearchIcon, SquarePenIcon, XIcon} from 'lucide-svelte';

	let {data} = $props();
	let total = $derived(numberFormatter.format(data.total));
</script>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<div class="mx-auto max-w-screen-md p-4 lg:p-16">
	<div class="flex items-center gap-2">
		<h2 class="text-2xl font-bold">Todos</h2>
		<div class="rounded bg-gray-200 px-1.5 py-1 font-mono text-xs leading-none">
			{total}
		</div>
	</div>

	<div class="mt-8 flex items-center gap-3">
		<form method="get" class="flex grow">
			<input type="hidden" name="page" value={data.page} />
			<input type="hidden" name="size" value={data.size} />

			<div class="relative w-full">
				<input
					type="search"
					name="search"
					value={data.search}
					placeholder="Search"
					class="block h-12 w-full appearance-none rounded border border-gray-200 pl-12 pr-4 outline-none placeholder:text-gray-400"
				/>

				<SearchIcon
					class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
					strokeWidth="1.66667"
				/>
			</div>
		</form>

		<a
			href="/editor"
			class="flex h-12 w-12 items-center justify-center rounded border border-gray-200"
		>
			<span class="sr-only">Create Todo</span>
			<SquarePenIcon class="h-5 w-5 text-gray-700" strokeWidth="1.66667" />
		</a>
	</div>

	<div class="mt-8">
		<ul class="space-y-1.5">
			{#each data.rows as todo}
				<li>{@render item(todo)}</li>
			{/each}
		</ul>
	</div>
</div>

{#snippet item(todo: Todo)}
	<div class="flex items-center gap-2 rounded border border-gray-200 p-5">
		<p class="grow">
			{todo.title}
		</p>

		<form>
			<button type="button" class="group flex">
				<XIcon class="h-5 w-5 text-gray-200 group-hover:text-gray-500" />
				<span class="sr-only">Delete</span>
			</button>
		</form>
	</div>
{/snippet}
