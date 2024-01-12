<script lang="ts">
	import CheckCircleIcon from '$lib/check-circle-icon.svelte';
	import XIcon from '$lib/x-icon.svelte';
	import type {Todo} from '@prisma/client';

	let {data} = $props();
	let search = $state('');
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

	<div class="mt-8">
		<form
			onsubmit={(e) => {
				e.preventDefault();
			}}
		>
			<input
				class="block h-12 w-full rounded border border-neutral-300 px-4 outline-none placeholder:text-neutral-400"
				placeholder="Search"
				bind:value={search}
			/>
		</form>
	</div>

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
		<div>
			{#if todo.completedAt}
				<CheckCircleIcon class="text-green-500" />
			{:else}
				<button type="button" class="flex" onclick={() => {}}>
					<CheckCircleIcon class="pointer-events-none text-neutral-300" />
					<span class="sr-only">Mark as complete</span>
				</button>
			{/if}
		</div>

		<p class="grow">
			{todo.title}
		</p>

		<button type="button" class="group flex" onclick={() => {}}>
			<XIcon class="h-5 w-5 text-neutral-300 group-hover:text-neutral-500" />
			<span class="sr-only">Delete</span>
		</button>
	</div>
{/snippet}
