<script lang="ts">
	import type {SVGAttributes} from 'svelte/elements';

	const {...props} = $props<SVGAttributes<SVGSVGElement>>();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	fill="none"
	viewBox="0 0 24 24"
	stroke-width="1.66667"
	stroke="currentColor"
	{...props}
>
	<path
		stroke-linecap="round"
		stroke-linejoin="round"
		d="M6 18 18 6M6 6l12 12"
	/>
</svg>
