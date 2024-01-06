<script lang="ts">
	import { fade } from 'svelte/transition';
	let proximity: { party: string; proximity: number }[] = [];
	import Welcome from './Welcome.svelte';
	import Document from './Document.svelte';
	import mixpanel from 'mixpanel-browser';
	import SocialShare from './SocialShare.svelte';
	import Hemicycle from './Hemicycle.svelte';

	export let data;
	let readInstructions = false;
	let quizSize: number = data.db.length;
	let currentVote = 0;

	function handleVoteClick(event) {
		data.db[currentVote].user_vote = event.target.id;
		currentVote += 1;
	}

	$: currentVote == quizSize ? mixpanel.track('quiz-finished', { 'quiz-size': quizSize}) : null;

	$: proximity = calculateProximity();

	function calculateProximity() {
		let partyProximity = {
			BE: 0,
			CH: 0,
			IL: 0,
			L: 0,
			PAN: 0,
			PCP: 0,
			PS: 0,
			PSD: 0
		};

		for (var proposal of data.db) {
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

		return Object.keys(partyProximity)
			.map((party: string) => {
				return {
					party: party,
					proximity: partyProximity[party] / quizSize
				};
			})
			.sort((a: { proximity: number }, b: { proximity: number }) => {
				return b.proximity - a.proximity;
			});
	}
</script>

{#if !readInstructions}
	<div class="absolute mx-auto w-full h-full z-20 flex items-center justify-center">
		<Welcome bind:readInstructions />
	</div>
{:else if currentVote == quizSize}
	<div class="flex flex-col justify-center items-center px-4 sm:px-0 min-h-screen">
		<Hemicycle opacities={Object.fromEntries(calculateProximity().map((party) => [party.party, party.proximity]))} centerText={calculateProximity()[0].party} />
		<h1 class="text-center text-4xl sm:text-6xl mb-8">Concordas?</h1>
		<p class="text-center text-base sm:text-lg mb-4">
			O partido mais próximo a ti é o: <strong>{calculateProximity()[0].party}</strong>
		</p>
		<div>
			{#each calculateProximity() as party}
				<div class="flex align-middle mb-2">
					<div class="bar-label w-48 sm:w-60 font-bold">{party.party}</div>
					<div class="bar-fill" style="width: {party.proximity * 100}%" />
				</div>
			{/each}
		</div>
		<div class="flex justify-center w-full gap-3 center m-2 mt-6">
			<SocialShare title="Concordas?" url="https://em-quem-votar-2023.pages.dev/" desc="O partido mais próximo a ti é o: {calculateProximity()[0].party}" />
		</div>
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
			<Document title={data.db[currentVote].title} summary={data.db[currentVote].sumary} url={data.db[currentVote].link_to_proposal} />

			<div class="fixed bottom-10 sm:bottom-16 left-0 right-0 flex justify-center space-x-4 m-8">
				<button class="bg-green-400 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full" id="1" on:click={handleVoteClick}>👍<span class="hidden sm:block">Aprovado</span></button>
				<button class="bg-gray-400 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full" id="2" on:click={handleVoteClick}>🤷‍♂️<span class="hidden sm:block">Abestençao</span></button>
				<button class="bg-red-400 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full" id="0" on:click={handleVoteClick}>👎<span class="hidden sm:block">Rejeitado</span></button>
			</div>
		</div>
	{/key}
{/if}

<style>
	.bar-fill {
		width: 100%; /* Add this line */
	}

	.bar-fill::after {
		content: '';
		display: block;
		height: 100%;
		border-radius: 4px;
		background-color: rgba(0, 128, 128, 0.8);
		transition: width 0.3s ease-in-out;
		direction: ltr; /* Add this line if you have text inside the bar */
	}

	.bar-fill:hover::after {
		background-color: rgba(0, 128, 128, 1);
	}

	.bar-fill:hover {
		background-color: teal;
	}
</style>
