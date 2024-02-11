<script lang="ts">
	export let proximity: Array<{ party: string; proximity: number }>;
	let partyColors: { [key: string]: string } = {
		PCP: 'fill-current bg-blue-700',
		BE: 'fill-current bg-red-600',
		L: 'fill-current bg-lime-400',
		PAN: 'fill-current bg-green-500',
		IL: 'fill-current bg-sky-500',
		PS: 'fill-current bg-pink-600',
		PSD: 'fill-current bg-orange-600',
		CH: 'fill-current bg-indigo-950'
	};
</script>

<div class="w-2/3 lg:w-1/2 xl:w-1/3">
    	{#each proximity as party}
	        <div class="flex items-center justify-between">
            		<div class="text-sm font-medium text-gray-900">{party.party}</div>
            		<div class="text-sm text-gray-500">{(Number((party.proximity * 100)).toFixed(0))}%</div>
        	</div>
        	<div class="overflow-hidden h-2 md:h-3 mb-4 text-xs flex rounded bg-gray-200">
			<div style="position: relative; left: 50%; {party.proximity < 0 ? 'transform: translateX(-100%);' : ''}; width: {Math.abs(party.proximity * 50)}%;" class="fill-current bg-{party.party} opacity-75"></div>
        	</div>
    	{/each}
</div>

