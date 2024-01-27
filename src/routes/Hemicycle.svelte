<script lang="ts">
	import parlimentData from './parlimentData.json';

	let partyColors: { [key: string]: string } = {
		PCP: 'fill-current text-red-800',
		BE: 'fill-current text-red-500',
		L: 'fill-current text-red-700',
		PAN: 'fill-current text-green-500',
		IL: 'fill-current text-blue-300',
		PS: 'fill-current text-pink-600',
		PSD: 'fill-current text-orange-600',
		CH: 'fill-current text-blue-600'
	};
	export let random = false;
	export let centerText = '';
	export let partyRankingList: { party: string; proximity: number }[] = [];

	let partyRanking = Object.fromEntries(partyRankingList.map((party) => [party.party, party.proximity]));

	let defaultRadiusBase = 6;
	function calculateRadius(party: number | undefined) {
		if (party !== undefined) {
			return defaultRadiusBase * (party < 0.20 ? 0.20 : party);
		} else if (random) {
			return defaultRadiusBase * Math.random();
		} else {
			return defaultRadiusBase;
		}
	}

	let defaultOpacity = 0.9;
	function calculateOpacity(party: number | undefined, forceRandom = false) {
		if (party !== undefined) {
			return defaultOpacity * (party < 0.1 ? 0.1 : party);
		} else if (random || forceRandom) {
			return defaultOpacity * Math.random();
		} else {
			return defaultOpacity;
		}
	}
</script>

<div class="flex flex-col justify-center items-center">
	<!-- <svg class="w-full" viewBox="0 0 360 185" preserveAspectRatio="xMidYMid meet" height={window.innerWidth >= 768 ? 500 : 200}> -->
	<svg class="w-full" viewBox="0 0 360 185" preserveAspectRatio="xMidYMid meet" height={200}>
		<!-- Created with the Wikimedia parliament diagram creator (http://tools.wmflabs.org/parliamentdiagram/parliamentinputform.html) -->
		<g>
			{#if !random}
				<text x="175" y="175" class="text-3xl font-bold text-center" style="text-anchor:middle;"> {centerText} </text>
			{/if}

			{#each parlimentData as seat}
				{@const maxOpacity = calculateOpacity(partyRanking[seat[2]])}
				{@const midOpacity = calculateOpacity(partyRanking[seat[2]], true)}
				{@const minOpacity = random ? calculateOpacity(partyRanking[seat[2]]) : partyRanking[seat[2]] == 1.0 ? defaultOpacity*(2/3) : defaultOpacity}
				
				{@const maxRadius = calculateRadius(partyRanking[seat[2]])}
				{@const minRadius = random ? calculateRadius(partyRanking[seat[2]]) : partyRanking[seat[2]] == 1.0 ? defaultRadiusBase*(2/3) : defaultRadiusBase}

				<circle cx={seat[0]} cy={seat[1]} r={maxRadius} class={partyColors[seat[2]]} style="opacity: {maxRadius};">
					<animate
						attributeName="opacity"
						dur={random ? '7s' : '10s'}
						begin="{Math.random() * 1500}ms"
						values="{maxRadius};{midOpacity};{minOpacity};{midOpacity};{maxRadius}"
						repeatCount={random ? 'indefinite' : ''}
					/>
					<animate 
						attributeName="r" 
						dur={random ? '7s' : '10s'} 
						begin="{Math.random() * 1500}ms" 
						values="{maxRadius};{minRadius};{maxRadius}" 
						repeatCount={random ? 'indefinite' : ''} 
					/>
				</circle>
			{/each}
		</g>
	</svg>
</div>
