<script lang="ts">
	import parlimentData from './hemicycleData.json';
	import { onMount } from 'svelte';

	export let random = false;
	export let centerText = '';
	export let party_logo = '';
	export let partyRankingList: { party: string; proximity: number }[] = [];

	let partyRanking = Object.fromEntries(partyRankingList.map((party) => [party.party, party.proximity]));

	let defaultRadiusBase = 6;
	function calculateRadius(party: number | undefined) {
		if (party !== undefined) {
			return defaultRadiusBase * (party < 0.2 ? 0.2 : party);
		} else if (random) {
			return defaultRadiusBase * Math.random();
		} else {
			return defaultRadiusBase;
		}
	}

	let defaultOpacity = 1.0;
	function calculateOpacity(party: number | undefined, forceRandom = false) {
		if (party !== undefined) {
			return defaultOpacity * (party < 0.1 ? 0.1 : party);
		} else if (random || forceRandom) {
			return defaultOpacity * Math.random();
		} else {
			return defaultOpacity;
		}
	}

	let svgWidth = 200;

	onMount(() => {
		if (window.innerWidth > 768) svgWidth = window.innerWidth * 0.5;
		else if (window.innerWidth > 640) svgWidth = window.innerWidth * 0.7;
		else if (window.innerWidth > 480) svgWidth = window.innerWidth * 0.8;
		else svgWidth = window.innerWidth * 0.9;
	});
</script>
<div class="hidden fill-BE fill-PS fill-PSD fill-PAN fill-PCP fill-CH fill-IL fill-L" />

<div class="flex flex-col items-center justify-center">
	<svg class="w-full" viewBox="0 0 360 185" preserveAspectRatio="xMidYMid meet" width={svgWidth}>
		<!-- SVG content here -->

		<!-- Created with the Wikimedia parliament diagram creator (http://tools.wmflabs.org/parliamentdiagram/parliamentinputform.html) -->
		<g>
			{#if !random}
				<!-- <text x="180" y="175" class="text-center text-3xl font-bold" style="text-anchor:middle;"> {centerText} </text> -->
				<!-- href="https://raw.githubusercontent.com/ABCurado/adn-politico-2024/dev/static/logos/PSD.png" -->
				<image href="../static/logos/PSD.png" x="155" y="130" width="50" height="50" />
			{/if}

			{#each parlimentData as seat}
				{@const maxOpacity = calculateOpacity(partyRanking[seat[2]])}
				{@const midOpacity = calculateOpacity(partyRanking[seat[2]], true)}
				{@const minOpacity = random ? calculateOpacity(partyRanking[seat[2]]) : partyRanking[seat[2]] == 1.0 ? defaultOpacity * (2 / 3) : defaultOpacity}

				{@const maxRadius = calculateRadius(partyRanking[seat[2]])}
				{@const minRadius = random ? calculateRadius(partyRanking[seat[2]]) : partyRanking[seat[2]] == 1.0 ? defaultRadiusBase * (2 / 3) : defaultRadiusBase}

				<circle cx={seat[0]} cy={seat[1]} r={maxRadius} class={`fill-${seat[2]}`} style="opacity: {maxOpacity};">
					<animate
						attributeName="opacity"
						dur={random ? '7s' : '10s'}
						begin="{Math.random() * 1500}ms"
						values="{maxOpacity};{midOpacity};{minOpacity};{midOpacity};{maxOpacity}"
						repeatCount={random ? 'indefinite' : ''}
					/>
					<animate attributeName="r" dur={random ? '7s' : '10s'} begin="{Math.random() * 1500}ms" values="{maxRadius};{minRadius};{maxRadius}" repeatCount={random ? 'indefinite' : ''} />
				</circle>
			{/each}
			<!-- TODO: Make it possible to have highlights around the parties -->
			<!-- <circle cx={360 / 2} cy={185} r={180} class="stroke-gray-500" fill="transparent" stroke-width="3" />
			<circle cx={360 / 2} cy={185} r={72} class="stroke-gray-500" fill="transparent" stroke-width="3" /> -->
		</g>
	</svg>
</div>
