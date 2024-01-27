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
    <div class="shadow overflow-hidden sm:rounded-lg mb-4 w-full">
        <div class="px-4 py-5 sm:px-6 border-b border-gray-200 w-full">
            <h2 class="text leading-6 font-medium text-gray-700">{proposal}</h2>
        </div>
    </div>
{/each}
	<svelte:fragment slot="footer">
    <a href={info.link} target="_blank">Link para as propostas</a>
</svelte:fragment>
</Modal>
