<script lang="ts">
	import { onMount } from 'svelte';
	import { aiPersonaSummary } from './ai';
	import { Spinner } from 'flowbite-svelte';
	import type { UserVote } from '../../types';
	import { IconSparkles } from '@tabler/icons-svelte';
	import { Modal } from 'flowbite-svelte';
	import mixpanel from 'mixpanel-browser';

	export let proposals: UserVote[];
	export let winningPartyShortDescription: string;

	let data: string;
	let showInfo = false;
	let i = 0;
	function typeWriter() {
		var speed = 40;
		var characters = data.split('');
		if (i < characters.length) {
			document.getElementById('aiSummary').innerHTML += characters[i];
			i++;
			setTimeout(typeWriter, speed);
		}
	}
	onMount(async () => {
		try {
			const response = await fetch('/ai', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ proposals, winningPartyShortDescription })
			});
			const { response: responseData } = await response.json();
			data = responseData;
			setTimeout(typeWriter, 40);
			mixpanel.track('AI Summary Generated', { summary: data });
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

{#if showInfo}
	<Modal title="Gerado por IA." bind:open={showInfo} autoclose outsideclose size="xs">Não nos responsabilizamos por danos físicos ou psicológicos causados por este sumário.</Modal>
{/if}
<div class="mt-2 w-2/3 text-center items-center text-slate-600 lg:w-2/3 xl:w-2/3">
	{#if data !== undefined}
		<p class="mb-3 text-center text-xs sm:text-base">
			<button on:click={() => (showInfo = true)}>
				<p class="mb-1 text-center text-xs sm:text-base">
					<button on:click={() => (showInfo = true)}>
						<button on:click={() => (showInfo = true)}>
							<p id="aiSummary"></p>
						</button>
					</button>
				</p>
				<div class="text-center text-slate-600">
					<button on:click={() => (showInfo = true)}>
						<IconSparkles size={18} stroke={2} class="cursor-pointer text-slate-400 " />
					</button>
				</div>
			</button>
		</p>
	{:else}
		<div class="flex justify-center items-center animate-pulse">
			<IconSparkles size={36} stroke={1.5}  />
		</div>
	{/if}
</div>
