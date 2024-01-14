<script lang="ts">
	import '../app.css';

	const {children, data} = $props();

	$effect(() => {
		console.log(data.user);
	});
</script>

{@render children()}
