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
	{#each info.proposals as proposal, index}
		<div class="mb-4 w-full overflow-hidden shadow sm:rounded-lg {index % 2 === 0 ? '' : 'bg-slate-100'}">
			<div class="w-full border-b border-slate-200 px-4 py-5 sm:px-6">
				<h2 class="text font-medium leading-6 text-slate-700">{proposal}</h2>
			</div>
		</div>
	{/each}
	<svelte:fragment slot="footer">
		<a href={info.link} target="_blank" class="text-blue-500 hover:underline">Plano eleitoral 2024</a>
	</svelte:fragment>
</Modal>
