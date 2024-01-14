<script lang="ts">
	import type {HTMLInputAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';

	let {class: className, ...props} = $props<HTMLInputAttributes>();
</script>

<input
	class={twMerge(
		'block h-12 w-full border border-gray-200 px-4 outline-none transition-colors duration-200',
		'placeholder:text-gray-400',
		className,
	)}
	{...props}
/>
