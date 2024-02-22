<script lang="ts">
	import type { Party, Proximity, Proposal, UserVote } from '../types';
	export let proximity: Proximity[];
</script>

<div class="bg-BE bg-PS bg-PSD bg-PAN bg-PCP bg-CH bg-IL bg-L hidden" />

<div class="w-2/3 lg:w-1/2 xl:w-1/3">
	{#each proximity as party}
		<div class="flex items-center justify-between">
			<div class="text-sm font-medium text-slate-900">{party.party.name}</div>
			<div class="text-xs font-bold {party.value < 0 ? 'text-orange-900' : 'text-slate-500'}">{Number(party.value * 100).toFixed(0)}%</div>
		</div>
		<div class="mb-4 flex h-2 overflow-hidden rounded bg-slate-200 text-xs md:h-3">
			<div
				style="position: relative; left: 50%; {party.value < 0 ? 'transform: translateX(-100%);' : ''}; width: {Math.abs(party.value * 50)}%;"
				class="fill-current bg-{party.party.name} opacity-75"
			></div>
		</div>
	{/each}
</div>
