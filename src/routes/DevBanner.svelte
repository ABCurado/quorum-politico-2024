<script>
	let ENV = process.env.ENV;
</script>

{#if ENV === 'dev'}
	<div class="bg-red-500 text-white p-4">Development Environment</div>
{/if}
