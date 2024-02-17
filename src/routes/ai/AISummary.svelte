<script lang="ts">
	import { onMount } from 'svelte';
	import { aiPersonaSummary } from './ai';
	import { Spinner } from 'flowbite-svelte';
	import type { UserVote } from '../../types';

	export let proposals: UserVote[];
	export let winningPartyShortDescription: string;
	
	let data: string;

	onMount(async () => {
		data = await fetch('/ai', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ proposals: proposals, winningPartyShortDescription: winningPartyShortDescription })
		}).then((res) => res.json().then((data) => data.response));
	});
</script>

{#if data !== undefined}
	<div class="w-3/4 lg:w-1/2 xl:w-1/3">
		<p class="text mb-4 text-center sm:text-base"><i>{data}</i></p>
	</div>
{:else}
	<Spinner color="slate" />
{/if}
```
