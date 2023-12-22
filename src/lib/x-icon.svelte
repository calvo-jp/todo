<script lang="ts">
	import type {SVGAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';

	let {class: class_, ...props} = $props<SVGAttributes<SVGSVGElement>>();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="currentColor"
	class={twMerge('h-6 w-6', class_)}
	{...props}
>
	<path
		fill-rule="evenodd"
		d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
		clip-rule="evenodd"
	/>
</svg>
