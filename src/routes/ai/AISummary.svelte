<script lang="ts">
	import { onMount } from 'svelte';
	import { aiPersonaSummary } from './ai';
	import { Spinner } from 'flowbite-svelte';
	import type { UserVote } from '../../types';
	import { IconSparkles } from '@tabler/icons-svelte';
	import { Modal } from 'flowbite-svelte';

	export let proposals: UserVote[];
	export let winningPartyShortDescription: string;
	
	let data: string;
	let showInfo = false;

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

{#if showInfo}
	<Modal title="Gerado por IA." bind:open={showInfo} autoclose outsideclose size="xs">Não nos responsabilizamos por danos físicos ou psicológicos causados por este sumário.</Modal>
{/if}

{#if data !== undefined}
	<div class="w-10/12 text-slate-600 lg:w-5/6 xl:w-5/6">
		<p class="text-xs mb-4 text-center sm:text-base">
			<button on:click={() => (showInfo = true)}>
				{data}
				<div class="text-center text-slate-600">
					<button on:click={() => (showInfo = true)}>
						<IconSparkles size={18} stroke={2} class="cursor-pointer text-slate-400 " />
					</button>
				</div>
			</button>
		</p>
	</div>
{:else}
	<div class="loading-icon">
		<IconSparkles size={36} stroke={1.5} />
	</div>
{/if}

<style>
	.loading-icon {
		animation: colorAnimation 2s infinite alternate;
	}

	@keyframes colorAnimation {
		0% {
			color: #94a3b8;
		}
		50% {
			color: #64748b;
		}
		100% {
			color: #94a3b8;
		}
	}
</style>
