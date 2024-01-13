<script>
	export let env;
</script>

{#if env === 'dev'}
	<div class="bg-red-500 text-white p-4">Development Environment</div>
{/if}
