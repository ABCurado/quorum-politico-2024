<script lang="ts">
	import parlimentData from './hemicycleData.json';
	import { onMount } from 'svelte';
	import type { Party, Proximity, Proposal, UserVote } from '../types';

	export let random = false;
	export let party_logo = '';
	export let partyRankingList: Proximity[] = [];

	let defaultRadiusBase = 6;
	function calculateRadius(party: number | undefined) {
		if (party !== undefined) {
			return defaultRadiusBase * (party < 0.2 ? 0.2 : (party + 0.5 * (1 - party)));
		} else if (random) {
			return defaultRadiusBase * Math.random();
		} else {
			return defaultRadiusBase;
		}
	}

	let defaultOpacity = 1.0;
	function calculateOpacity(party: number | undefined, forceRandom = false) {
		if (party !== undefined) {
			return defaultOpacity * (party < 0.5 ? 0.5 : party);
		} else if (random || forceRandom) {
			return defaultOpacity * Math.random();
		} else {
			return defaultOpacity;
		}
	}

	function set_proximity(s: string | number) {
		for (let p of partyRankingList) {
			if (p.party.name == s) {
				return p.value;
			}
		}
	}

	let svgWidth = 300;

	onMount(() => {
		if (window.innerWidth > 768) svgWidth = window.innerWidth * 0.5;
		else if (window.innerWidth > 640) svgWidth = window.innerWidth * 0.7;
		else if (window.innerWidth > 480) svgWidth = window.innerWidth * 0.8;
		else svgWidth = window.innerWidth * 0.9;
	});
</script>

<div class="fill-BE fill-PS fill-PSD fill-PAN fill-PCP fill-CH fill-IL fill-L hidden" />

<div class="flex flex-col items-center justify-center">
	<svg class="w-full" viewBox="0 0 360 185" preserveAspectRatio="xMidYMid meet" width={svgWidth} xmlns="http://www.w3.org/2000/svg">
		<!-- Created with the Wikimedia parliament diagram creator (http://tools.wmflabs.org/parliamentdiagram/parliamentinputform.html) -->
		<g>
			{#if !random}
				<image href="logos/{party_logo}.png" x="125" y="100" width="110" height="110" />
			{/if}

			{#each parlimentData as seat}
				{@const maxOpacity = calculateOpacity(set_proximity(seat[2]))}
				{@const midOpacity = calculateOpacity(set_proximity(seat[2]), true)}
				{@const minOpacity = random ? calculateOpacity(set_proximity(seat[2])) : set_proximity(seat[2]) == 1.0 ? defaultOpacity * (2 / 3) : defaultOpacity}

				{@const maxRadius = calculateRadius(set_proximity(seat[2]))}
				{@const minRadius = random ? calculateRadius(set_proximity(seat[2])) : set_proximity(seat[2]) == 1.0 ? defaultRadiusBase * (2 / 3) : defaultRadiusBase}

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
			<!-- <circle cx={360 / 2} cy={185} r={180} class="stroke-slate-500" fill="transparent" stroke-width="3" />
			<circle cx={360 / 2} cy={185} r={72} class="stroke-slate-500" fill="transparent" stroke-width="3" /> -->
		</g>
	</svg>
</div>
