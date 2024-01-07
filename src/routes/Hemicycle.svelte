<script lang="ts">
	import parlimentData from './parlimentData.json';

	let partyColors: { [key: string]: string } = {
		PCP: 'fill-current text-red-800',
		BE: 'fill-current text-red-600',
		L: 'fill-current text-red-500',
		PAN: 'fill-current text-green-500',
		IL: 'fill-current text-blue-300',
		PS: 'fill-current text-pink-600',
		PSD: 'fill-current text-orange-600',
		CH: 'fill-current text-blue-600'
	};
	let opacity = 1.0;
	let radius = 7;

	export let centerText = '';
	export let partyRankingList: { party: string; proximity: number }[] = [];
	let partyRanking = Object.fromEntries(partyRankingList.map((party) => [party.party, party.proximity]));

</script>

<div class="flex flex-col justify-center items-center">
	<svg class="w-full" viewBox="0 0 360 185">
		<!-- Created with the Wikimedia parliament diagram creator (http://tools.wmflabs.org/parliamentdiagram/parliamentinputform.html) -->
		<g>
			<text x="175" y="175" class="text-3xl font-bold text-center" style="text-anchor:middle;"> {centerText} </text>

			{#each parlimentData as seat}
				<circle cx={seat[0]} cy={seat[1]} r={radius * partyRanking[seat[2]]} class={partyColors[seat[2]]} style="opacity: {partyRanking[seat[2]] || { opacity }}" />
			{/each}
		</g>
	</svg>
</div>
