<script lang="ts">
  import OthersResults from './OthersResults.svelte';

  import VoteResults from './VoteResults.svelte';

	import DevBanner from './DevBanner.svelte';

	import BarChart from './BarChart.svelte';

	import { fade } from 'svelte/transition';
	import Welcome from './Welcome.svelte';
	import Document from './Document.svelte';
	import mixpanel from 'mixpanel-browser';
	import SocialShare from './SocialShare.svelte';
	import Hemicycle from './Hemicycle.svelte';
	let showResults = false;

	export let data;
	let readInstructions = false;
	let quizSize: number = data.db.length;
	let currentVote = 0;

	function handleVoteClick(event) {
		data.db[currentVote].user_vote = event.target.id;
		currentVote += 1;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	let proximity: { party: string; proximity: number }[] = [];

	$: if (currentVote === quizSize) {
		let partyProximity = { BE: 0, CH: 0, IL: 0, L: 0, PAN: 0, PCP: 0, PS: 0, PSD: 0 };

		for (let proposal of data.db) {
			for (const [party, result] of Object.entries(proposal.votes)) {
				if (result == proposal.user_vote) {
					partyProximity[party] += 1;
				} else if (proposal.user_vote == 2) {
					partyProximity[party] += 0.5;
				} else {
					// console.log(proposal.id, ' VOTE NOT FOUND');
				}
			}
		}

		proximity = Object.entries(partyProximity)
			.map(([party, proximity]) => ({ party, proximity: proximity / quizSize }))
			.sort((a, b) => b.proximity - a.proximity);

		const results = data.db.map((vote) => ({ id: vote.official_id, user_vote: vote.user_vote }))
		mixpanel.track('quiz-finished', {
			'quiz-size': quizSize,
			'top-party': proximity[0].party,
			'top-party-proximity': proximity[0].proximity,
			'user-votes': results
		});

		// Upload the results to the database
		fetch('/votes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				device_id: mixpanel.get_distinct_id(),
				results: results,
				top_party: proximity[0].party
			})
		})
	}
</script>

<DevBanner env={data.env} />

{#if !readInstructions}
	<div class="absolute mx-auto w-full z-20 flex items-center justify-center">
		<Welcome bind:readInstructions />
	</div>
{:else if currentVote == quizSize}
	<div class="flex flex-col justify-center items-center px-4 sm:px-0 min-h-screen">
		<Hemicycle partyRankingList={proximity} centerText={proximity[0].party} />
		<h1 class="text-center text-4xl sm:text-6xl mb-8">Concordas?</h1>
		<p class="text-center text-base sm:text-lg mb-4">
			O partido mais próximo a ti é o: <strong>{proximity[0].party}</strong>
		</p>
		<BarChart {proximity} />
		<div class="w-full flex flex-col gap-3 m-2 mt-6">
			<p class="text-center">Partilha com amigos e compara as vossas tendências partidárias</p>
			<div class="flex items-center justify-center gap-3">
				<SocialShare title="Concordas?" url="https://em-quem-votar-2023.pages.dev/" desc="O Partido que mais te representa é: {proximity[0].party}" />
			</div>
		</div>

		<VoteResults votes={data.db}/>
		<OthersResults/>
		
		<div class="flex flex-col justify-center items-center mt-4 px-4 sm:px-0">
			<p class="text-center text-base sm:text-lg mb-4">Se não concordas com o resultado, podes sempre voltar atrás e mudar o teu voto.</p>
			<button
				class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full mb-4"
				on:click={() => {
					currentVote = 0;
					data.db.forEach((proposal) => {
						proposal.user_vote = null;
					});
				}}
			>
				Voltar atrás
			</button>
			<!-- Buttons to share the results in social media -->
		</div>
		<div class="m-4 px-4 sm:px-0">
			<a href="/about" class="text-blue-500 hover:underline font-bold text-lg">Descobre mais sobre o projeto</a>
		</div>
	</div>
{:else}
	<div class="loading h-2 sm:h-4 bg-teal-500 transition-all duration-200 absolute z-40 top-0 opacity-50" style="width: {(currentVote / quizSize) * 100}%" />
	{#key currentVote}
		<div class="flex flex-col justify-center items-center mt-5 sm:mt-16 px-4 sm:px-0">
			<Document {...data.db[currentVote]} />

			<!-- <div class="fixed bottom-10 sm:bottom-16 left-0 right-0 flex justify-center space-x-4 m-8"> -->
			<div class="left-0 right-0 flex justify-center space-x-4 m-8">
				<button class="bg-green-400 hover:bg-green-700 text-gray-700 font-bold py-1 px-4 rounded-xl" id="1" on:click={handleVoteClick}>Aprovar<span class="hidden sm:block">👍</span></button>
				<button class="bg-gray-400 hover:bg-gray-700 text-gray-700 font-bold px-4 rounded-xl" id="2" on:click={handleVoteClick}>Abster-me<span class="hidden sm:block">🤷‍♂️</span></button>
				<button class="bg-red-400 hover:bg-red-700 text-gray-700 font-bold px-4 rounded-xl" id="0" on:click={handleVoteClick}>Rejeitar<span class="hidden sm:block">👎</span></button>
			</div>
		</div>
	{/key}
{/if}
