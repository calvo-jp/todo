<script lang="ts">
	import type {HTMLButtonAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';

	let {children, class: className, ...props} = $props<HTMLButtonAttributes>();
</script>

<button
	type="button"
	class={twMerge(
		'flex h-12 w-full items-center justify-center bg-gray-900 px-4 text-white outline-none transition-all duration-200 hover:bg-gray-800',
		className,
	)}
	{...props}
>
	{#if children}
		{@render children()}
	{/if}
</button>
