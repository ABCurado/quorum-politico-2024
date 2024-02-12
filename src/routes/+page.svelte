<script lang="ts">
	import mixpanel from 'mixpanel-browser';
	import { Toast } from 'flowbite-svelte';
	import BarChart from './BarChart.svelte';
	import DevBanner from './DevBanner.svelte';
	import Document from './Document.svelte';
	import Hemicycle from './Hemicycle.svelte';
	import OthersResults from './OthersResults.svelte';
	import SocialShare from './SocialShare.svelte';
	import VoteResults from './VoteResults.svelte';
	import Welcome from './Welcome.svelte';
	import TagPicker from './tags/TagPicker.svelte';
	import PartyInfo from './party/PartyInfo.svelte';
	import AboutButton from './AboutButton.svelte';
	// import AiSummary from './ai/AISummary.svelte';

	export let data;
	let quizSize: number = data.db.length;

	let showToast: boolean = false;
	let showCategoriesPicker: boolean = false;
	let showPartyInfo: boolean = false;

	let readInstructions = false;
	let selectedTags = [];

	let currentVote = 0;

	function handleVoteClick(event) {
		data.db[currentVote].user_vote = event.target.id;
		currentVote += 1;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	let proximity: { party: string; proximity: number }[] = [];

	$: if (currentVote === quizSize / 2) {
		mixpanel.track('Quiz Halfway', {
			'quiz-size': quizSize
		});
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 2000);
	}

	$: if (currentVote === quizSize) {

		// Initialize partyProximity object
		let partyProximity: { party: string; proximity: number }[] = [];
		partyProximity.push({ party: "PS", proximity: 0 });
		partyProximity.push({ party: "PSD", proximity: 0 });
		partyProximity.push({ party: "PCP", proximity: 0 });
		partyProximity.push({ party: "IL", proximity: 0 });
		partyProximity.push({ party: "CH", proximity: 0 });
		partyProximity.push({ party: "BE", proximity: 0 });
		partyProximity.push({ party: "L", proximity: 0 });
		partyProximity.push({ party: "PAN", proximity: 0 });

		/*
		for (let proposal of data.db) {
			for (const [party, result] of Object.entries(proposal.votes)) {
				if (result == proposal.user_vote) {
            				partyProximity[party] += 1;
        			} else if ((result == 0 && proposal.user_vote == 1) || (result == 1 && proposal.user_vote == 0)) {
            				partyProximity[party] -= 1;
        			} else if ((result == 2 && proposal.user_vote == 1) || (result == 1 && proposal.user_vote == 2)) {
            				partyProximity[party] += 0.5;
        			} else if ((result == 2 && proposal.user_vote == 0) || (result == 0 && proposal.user_vote == 2)) {
            				partyProximity[party] += 0;
        			}
			}
		}
		*/

		proximity = Object.entries(partyProximity)
			.map(([party, proximity]) => ({ party, proximity: proximity / quizSize }))
			.sort((a, b) => b.proximity - a.proximity);

		const results = data.db.map((vote) => ({ id: vote.official_id, user_vote: vote.user_vote }));
		mixpanel.track('Quiz Finished', {
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
		});
	}

	async function getNewQuiz() {
		let tagsParam = Array.from(selectedTags).join(',');

		let response = await fetch(`/proposals?tags=${tagsParam}&pageSize=6`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		let new_data = await response.json();
		data.db = new_data.proposals;
		quizSize = data.db.length;
		currentVote = 0;
		showCategoriesPicker = false;
		selectedTags = [];
	}
</script>

<DevBanner env={data.env} />
<Toast
	bind:open={showToast}
	divClass="flex mt-3 fixed z-50 w-full p-4 text-gray-500 bg-white opacity-85 shadow dark:text-gray-400 dark:bg-gray-800 gap-3"
	contentClass="w-full text-m font-normal text-center"
>
	Chegaste a metade do Quiz! 🎉
</Toast>

{#if !readInstructions}
	<div class="absolute z-20 mx-auto flex w-full items-center justify-center">
		<Welcome bind:readInstructions />
	</div>
{:else if currentVote == quizSize}
	<div class="flex min-h-screen flex-col items-center justify-center px-4 sm:px-0">
		<Hemicycle partyRankingList={proximity} centerText={proximity[0].party} />
		<!-- <h1 class="mb-8 text-center text-4xl sm:text-6xl">Concordas?</h1> -->
		<!-- <p class="mb-1 mt-4 text-center text-base sm:text-lg">
			Tens uma proximidade de <span class="font-bold">{Number(proximity[0].proximity.toFixed(2)) * 100}%</span> com o partido{' '}
		</p> -->
		<button
			tabindex="0"
			class="mb-4 mt-2 cursor-pointer text-center text-xs text-gray-500 underline decoration-slate-300 decoration-dashed decoration-2 underline-offset-2 hover:decoration-slate-500 sm:text-lg md:text-sm"
			on:click={() => {
				showPartyInfo = true;
			}}
			on:keydown={(event) => {
				if (event.key === 'Enter') {
					showPartyInfo = true;
				}
			}}
			>Descobre mais sobre o partido
		</button>
		<PartyInfo bind:show={showPartyInfo} party={proximity[0].party} />
		<!-- <AiSummary proposals={data.db.map((vote_row) => ({ title: vote_row.title_reduced, vote: vote_row.user_vote}))} winningPartyShortDescription={proximity[0].party}/> -->
		<BarChart {proximity} />
		<OthersResults />
		<VoteResults vote_proposals={data.db} />

		<div class="mt-4 flex flex-col items-center justify-center px-4 sm:px-0">
			<p class="mb-4 text-center text-base sm:text-lg">Se o resultado não foi o que esperavas:</p>
			<button
				class="mb-4 rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-700"
				on:click={() => {
					showCategoriesPicker = true;
				}}
			>
				Escolhe outras categorias
			</button>
			{#if showCategoriesPicker}
				<TagPicker bind:show={showCategoriesPicker} bind:selectedTags onButtonClick={getNewQuiz} />
			{/if}
		</div>

		<div class="m-2 mt-6 flex w-full flex-col gap-3">
			<p class="text-center text-base">Compara as tua representação partidária com amigos:</p>
			<div class="flex items-center justify-center gap-3">
				<SocialShare title="ADN Político." url="https://adn-politico.com/" desc="O Partido que melhor me representa é: {proximity[0].party}" {proximity} />
			</div>
		</div>
		<AboutButton />
	</div>
{:else}
	<div class="loading absolute top-0 z-40 h-2 bg-teal-500 opacity-50 transition-all duration-200 sm:h-4" style="width: {(currentVote / quizSize) * 100}%" />
	{#key currentVote}
		<div class="flex flex-col items-center justify-center px-4 sm:mt-8 sm:px-0">
			<Document {...data.db[currentVote]} />

			<!-- <div class="fixed bottom-	10 sm:bottom-16 left-0 right-0 flex justify-center space-x-4 m-8"> -->
			<div class="fixed bottom-0 left-0 right-0 m-8 flex justify-center space-x-4 sm:relative sm:mt-2">
				<button class="rounded bg-green-400 px-4 py-1 font-bold text-gray-700 hover:bg-green-700 hover:text-gray-200" id="1" on:click={handleVoteClick}
					>Aprovar<span class="hidden sm:block">👍</span></button
				>
				<button class="rounded bg-gray-400 px-4 font-bold text-gray-700 hover:bg-gray-700 hover:text-gray-200" id="2" on:click={handleVoteClick}
					>Abster-me<span class="hidden sm:block">🤷‍♂️</span></button
				>
				<button class="rounded bg-red-400 px-4 font-bold text-gray-700 hover:bg-red-700 hover:text-gray-200" id="0" on:click={handleVoteClick}>Rejeitar<span class="hidden sm:block">👎</span></button>
			</div>
		</div>
	{/key}
{/if}
