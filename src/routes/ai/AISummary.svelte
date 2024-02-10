<script lang="ts">
	import { onMount } from 'svelte';
	import { aiPersonaSummary } from './ai';
	export let proposals: [{ title: string; vote: number }];
	export let winningPartyShortDescription: string;

    let data: string;

	onMount(async () => {
		data = await aiPersonaSummary(null,proposals, winningPartyShortDescription);
	});
</script>

{#if data !== undefined}
	<div>
		<p class="text mb-4 text-center sm:text-base"><i>{data}</i></p>
	</div>
{:else}
	<div>
		<h1>A preparar descrição AI...</h1>
	</div>
{/if}
```
