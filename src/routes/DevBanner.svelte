<script lang="ts">
	export let env: string;
</script>

{#if env === 'dev'}
	<div class="bg-red-500 p-4 text-white">Development Environment</div>
{/if}
