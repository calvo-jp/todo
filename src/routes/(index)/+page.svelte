<script context="module">
	function truncateNumber(value: number) {
		const fmt = new Intl.NumberFormat('en-US', {
			notation: 'compact',
			compactDisplay: 'short',
		});

		return fmt.format(value);
	}
</script>

<script lang="ts">
	import {enhance} from '$app/forms';
	import CheckCircleIcon from '$lib/check-circle-icon.svelte';
	import ChevronLeftIcon from '$lib/chevron-left-icon.svelte';
	import ChevronRightIcon from '$lib/chevron-right-icon.svelte';
	import {dataAttr} from '$lib/data-attr.js';
	import Input from '$lib/input.svelte';
	import {paginate} from '$lib/paginate';
	import PlusIcon from '$lib/plus-icon.svelte';
	import SearchIcon from '$lib/search-icon.svelte';
	import XIcon from '$lib/x-icon.svelte';
	import type {Todo} from '@prisma/client';
	import {formatDistanceToNow} from 'date-fns';
	import {twMerge} from 'tailwind-merge';

	let {data} = $props();
	let {pages, pageRange, nextPage, prevPage, totalPages} = $derived(
		paginate({
			page: data.page,
			size: data.size,
			count: data.count,
		}),
	);
</script>

<svelte:head>
	<title>Todos</title>
</svelte:head>

<div class="mx-auto max-w-screen-md p-4 lg:p-16">
	<div class="flex items-center gap-2">
		<h2 class="font-heading text-2xl font-bold">Todos</h2>
		<div
			class="rounded bg-gray-200 px-1.5 py-1 font-heading text-xs leading-none"
		>
			{truncateNumber(data.count)}
		</div>
	</div>

	<div class="mt-8 flex items-center gap-3">
		<form method="get" class="flex grow">
			<input type="hidden" name="page" value={data.page} />
			<input type="hidden" name="size" value={data.size} />

			<div class="relative w-full">
				<Input
					type="search"
					name="search"
					value={data.search}
					placeholder="Search"
					class="pl-12"
				/>

				<SearchIcon
					class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500"
				/>
			</div>
		</form>

		<a
			href="/editor"
			class="flex h-12 w-12 items-center justify-center border border-gray-200"
		>
			<span class="sr-only">Create Todo</span>
			<PlusIcon class="h-5 w-5 text-gray-700" />
		</a>
	</div>

	<div class="mt-8">
		<ul class="space-y-1.5">
			{#each data.rows as todo}
				<li>
					{@render item(todo)}
				</li>
			{/each}
		</ul>
	</div>

	<div class="mt-8 flex items-center">
		<div class="text-gray-600">
			Showing {pageRange.start}-{pageRange.until} of {data.count}
		</div>
		<div class="grow" />
		<div class="flex">
			<a
				href="/?page={prevPage?.value ??
					1}&size={data.size}&search={data.search}"
				class="flex h-10 w-10 items-center justify-center border-y border-r border-gray-200 text-gray-500 first:border-l disabled:cursor-not-allowed data-selected:text-gray-900"
			>
				<ChevronLeftIcon class="h-5 w-5" />
				<span class="sr-only">Previous page</span>
			</a>

			{#each pages as page}
				<a
					href="/?page={page.value}&size={data.size}&search={data.search}"
					class="flex h-10 w-10 items-center justify-center border-y border-r border-gray-200 text-gray-500 first:border-l disabled:cursor-not-allowed data-selected:text-gray-900"
					data-selected={dataAttr(page.selected)}
				>
					<span class="sr-only">Page </span>
					{page.value}
				</a>
			{/each}

			<a
				href="/?page={nextPage?.value ??
					totalPages}&size={data.size}&search={data.search}"
				class="flex h-10 w-10 items-center justify-center border-y border-r border-gray-200 text-gray-500 first:border-l disabled:cursor-not-allowed data-selected:text-gray-900"
			>
				<ChevronRightIcon class="h-5 w-5" />
				<span class="sr-only">Next page</span>
			</a>
		</div>
	</div>
</div>

{#snippet item(data:Todo)}
	<div class="flex items-center gap-3 border border-gray-200 p-5">
		<form method="post" action="/?/complete" use:enhance>
			<input type="hidden" name="id" value={data.id} />
			<button
				type="submit"
				class="flex disabled:cursor-not-allowed"
				disabled={Boolean(data.completedAt)}
			>
				<CheckCircleIcon
					class={twMerge(
						'h-6 w-6 transition-colors duration-200',
						Boolean(data.completedAt)
							? 'text-green-500'
							: 'text-gray-400 hover:text-gray-500',
					)}
				/>
				<span class="sr-only">Mark complete</span>
			</button>
		</form>

		<div class="grow">
			<h3>{data.name}</h3>
			<p class="text-sm leading-none text-gray-500">
				{formatDistanceToNow(data.createdAt, {
					addSuffix: true,
					includeSeconds: true,
				})}
			</p>
		</div>

		<form method="post" action="/?/delete" use:enhance>
			<input type="hidden" name="id" value={data.id} />
			<button type="submit" class="group flex">
				<XIcon class="h-5 w-5 text-gray-200 group-hover:text-gray-500" />
				<span class="sr-only">Delete</span>
			</button>
		</form>
	</div>
{/snippet}
