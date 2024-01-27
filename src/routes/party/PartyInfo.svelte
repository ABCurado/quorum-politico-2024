<script lang="ts">
	import { onMount } from 'svelte';
	import { Modal } from 'flowbite-svelte';
	import type { PartyInfo } from './+server.ts';

	export let party: string;
	export let show = false;
	let info: PartyInfo;

	onMount(() => {
		fetch(`/party?party=${party}`)
			.then((res) => res.json())
			.then((res) => {
				info = res;
			});
	});
</script>

<Modal title={party} bind:open={show} autoclose outsideclose>
	{#each info.proposals as proposal}
		<div class="mb-4 w-full overflow-hidden shadow sm:rounded-lg">
			<div class="w-full border-b border-gray-200 px-4 py-5 sm:px-6">
				<h2 class="text font-medium leading-6 text-gray-700">{proposal}</h2>
			</div>
		</div>
	{/each}
	<svelte:fragment slot="footer">
		<a href={info.link} target="_blank" class="text-blue-500 hover:underline">Link para as propostas</a>
	</svelte:fragment>
</Modal>
