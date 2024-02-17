<script lang="ts">
	import type { Party, Proximity, Proposal, UserVote } from '../types';
	export let proximity: Proximity[];
</script>

<div class="hidden bg-BE bg-PS bg-PSD bg-PAN bg-PCP bg-CH bg-IL bg-L" />

<div class="w-2/3 lg:w-1/2 xl:w-1/3">
    	{#each proximity as party}
	        <div class="flex items-center justify-between">
            		<div class="text-sm font-medium text-gray-900">{party.party.name}</div>
            		<div class="text-sm text-gray-500">{(Number((party.value * 100)).toFixed(0))}%</div>
        	</div>
        	<div class="overflow-hidden h-2 md:h-3 mb-4 text-xs flex rounded bg-gray-200">
			<div style="position: relative; left: 50%; {party.value < 0 ? 'transform: translateX(-100%);' : ''}; width: {Math.abs(party.value * 50)}%;" class="fill-current bg-{party.party.name} opacity-75"></div>
        	</div>
    	{/each}
</div>

