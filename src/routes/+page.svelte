<script lang="ts">
	import { fade } from 'svelte/transition';
	import Welcome from './Welcome.svelte';
	import Document from './Document.svelte';

	export let data;
	let readInstructions = false;
	let quizSize: number = data.db.length;
	let currentVote = 0;

	function handleVoteClick(event) {
		data.db[currentVote].user_vote = event.target.id;
		currentVote += 1;
	}

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
					console.log(proposal.id, ' VOTE NOT FOUND');
				}
			}
		}
        console.log(data.db);
        console.log(partyProximity);
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
	<div transition:fade={{ duration: 150 }} class="absolute w-full h-full z-20 flex items-center justify-center">
		<Welcome bind:readInstructions />
	</div>
{:else if currentVote == quizSize}
	<div class="flex flex-col justify-center items-center mt-24">
		<h1 class="text-center text-6xl mb-8">Concordas?</h1>
		<p class="text-center text-lg mb-4">
			O partido mais próximo a ti é o: <strong>{calculateProximity()[0].party}</strong>
		</p>
		<div>
			{#each calculateProximity() as party}
				<div class="flex align-middle mb-2">
					<div class="bar-label w-60 font-bold">{party.party}</div>
					<div class="bar-fill" style="width: {party.proximity * 100}%" />
				</div>
			{/each}
		</div>
	</div>
{:else}
	<div class="loading h-4 w-[{(currentVote / quizSize) * 100}%] bg-teal-500 transition-all duration-200 absolute z-40 top-0" />
	{#key currentVote}
		<div class="flex flex-col justify-center items-center mt-24">
			<Document title={data.db[currentVote].title} summary={data.db[currentVote].sumary} url={data.db[currentVote].link_to_proposal} />

			<div class="fixed bottom-16 left-0 right-0 flex justify-center space-x-4 m-8">
				<button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" id="1" on:click={handleVoteClick}>Favor</button>
				<button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full" id="2" on:click={handleVoteClick}>Abstenção</button>
				<button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" id="0" on:click={handleVoteClick}>Contra</button>
			</div>
		</div>
	{/key}
{/if}

<style>
	.bar-fill {
		height: 20px;
		background-color: teal;
		border-radius: 4px;
		transition: width 0.3s ease-in-out;
		direction: rtl; /* Add this line */
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
