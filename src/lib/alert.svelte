<script lang="ts">
	import type {HTMLAttributes} from 'svelte/elements';
	import {twMerge} from 'tailwind-merge';
	import CheckCircleIcon from './check-circle-icon.svelte';
	import ExclamationCircleIcon from './exclamation-circle-icon.svelte';
	import type {Assign} from './types';

	type AlertStatus = 'error' | 'success';
	type AlertProps = Assign<
		HTMLAttributes<HTMLDivElement>,
		{status?: AlertStatus}
	>;

	let {
		status = 'success',
		class: className,
		children,
		...props
	} = $props<AlertProps>();
</script>

<div
	role="alert"
	class={twMerge(
		'flex items-center gap-2 px-5 py-4 leading-none',
		status === 'error' && 'bg-red-50 text-red-500',
		status === 'success' && 'bg-green-50 text-green-500',
		className,
	)}
	{...props}
>
	{#if status === 'error'}
		<ExclamationCircleIcon class="h-5 w-5" />
	{:else}
		<CheckCircleIcon class="h-5 w-5" />
	{/if}

	{#if children}
		<p>
			{@render children()}
		</p>
	{/if}
</div>
