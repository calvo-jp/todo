<script lang="ts">
	import '../app.css';

	const {children, data} = $props();
</script>

<main>
	{@render children()}
</main>
