<script context="module">
	const numberFormatter = new Intl.NumberFormat('en-US', {
		notation: 'compact',
		compactDisplay: 'short',
	});
</script>

<script lang="ts">
	import type {Todo} from '@prisma/client';
	import {formatDistanceToNow} from 'date-fns';
	import {SearchIcon, SquarePenIcon, XIcon} from 'lucide-svelte';
	import {twMerge} from 'tailwind-merge';

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
			class="flex h-12 w-12 items-center justify-center border border-gray-200"
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
	<div class="flex items-center gap-3 border border-gray-200 p-5">
		<form method="post" action="/?/complete">
			<input type="hidden" name="id" value={todo.id} />
			<button
				type="submit"
				class="flex disabled:cursor-not-allowed"
				disabled={Boolean(todo.completedAt)}
			>
				{@render check(Boolean(todo.completedAt))}
			</button>
		</form>

		<div class="grow">
			<p>
				{todo.name}
			</p>
			<p class="text-sm leading-none text-gray-500">
				{formatDistanceToNow(todo.createdAt, {
					addSuffix: true,
					includeSeconds: true,
				})}
			</p>
		</div>

		<form method="post" action="/?/delete">
			<input type="hidden" name="id" value={todo.id} />
			<button type="submit" class="group flex">
				<XIcon class="h-5 w-5 text-gray-200 group-hover:text-gray-500" />
				<span class="sr-only">Delete</span>
			</button>
		</form>
	</div>
{/snippet}

{#snippet check(highlight:boolean)}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		class={twMerge(
			'h-6 w-6 transition-colors duration-200',
			highlight ? 'text-green-500' : 'text-gray-400 hover:text-gray-500',
		)}
	>
		<path
			d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
			clip-rule="evenodd"
			fill-rule="evenodd"
		/>
	</svg>
{/snippet}
