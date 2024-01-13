<!-- <script>
	import { ENV } from '$env/static/private';
</script> -->

{#if env.ENV === 'dev'}
	<div class="bg-red-500 text-white p-4">Development Environment</div>
{/if}
