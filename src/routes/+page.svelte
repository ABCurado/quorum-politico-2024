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
	import type { Party, Proximity, Proposal, UserVote } from '../types';
	import { aprovingParties, rejectingParties, abstainingParties, finalResultMapping, calculateProximity } from '../dbAbstraction';
	//import Proximity from './party/+server.ts';
	import AiSummary from './ai/AISummary.svelte';
	import { IconRefresh, IconTriangleOff } from '@tabler/icons-svelte';
	import db_total from './proposals/proposals_db.json';

	export let data;
	export let selectedTags: string[];
	
	const total_db_proposals: number = db_total.length;
	let quizSize: number = data.db.length;
	let showToast: boolean = false;
	let showCategoriesPicker: boolean = false;
	let showPartyInfo: boolean = false;
	let showResults: boolean = false;
	let readInstructions = false;

	const BE: Party = {
		name: 'BE'
	};
	const PS: Party = {
		name: 'PS'
	};
	const CH: Party = {
		name: 'CH'
	};
	const IL: Party = {
		name: 'IL'
	};
	const L: Party = {
		name: 'L'
	};
	const PAN: Party = {
		name: 'PAN'
	};
	const PCP: Party = {
		name: 'PCP'
	};
	const PSD: Party = {
		name: 'PSD'
	};

	let proposals: Proposal[];
	let userProximity: Proximity[];
	let userVote: UserVote[] = [];
	let currentVote: number = 0;
	let goku: number = 0;

	function initializeVar() {
		quizSize = data.db.length;
		goku = 0;

		proposals = data.db.map((proposal) => ({
			id: proposal.id,
			official_id: proposal.official_id,
			vote_link: proposal.vote_link,
			proposalLink: proposal.proposal_link,
			title: proposal.title_reduced,
			description: proposal.summary_reduced,
			counter_arguments: proposal.counter_reduced,
			category: proposal.tag_1,
			type: proposal.type,
			author: proposal.author,
			parties: Object.keys(proposal.votes),
			party_votes: Object.values(proposal.votes),
			aproving_parties: aprovingParties(proposal),
			rejecting_parties: rejectingParties(proposal),
			abstaining_parties: abstainingParties(proposal),
			final_result: finalResultMapping(proposal.final_result)
		}));

		for (let pr of proposals) {
			userVote[goku] = { proposal: pr, vote: userVote[goku]?.vote || '' };
			goku += 1;
		}
	}

	function handleVoteClick(v: string) {
		userVote[currentVote].proposal = proposals[currentVote];
		userVote[currentVote].vote = v;

		currentVote += 1;
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}

	async function addQuestion() {
		let response = await fetch(`/proposals?pageSize=10&exlcudeIds=${proposals.map((proposal) => proposal.official_id)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		mixpanel.track('Add 10 Questions', {
			'quiz-size': quizSize
		});
		let new_data = await response.json();
		data.db = data.db.concat(new_data.proposals);

		if (data.db.length >= total_db_proposals) {
			data.db = data.db.slice(0, total_db_proposals);
			showResults = true;
		}
		
		initializeVar();
	}

	$: if (currentVote === Math.round(quizSize / 2)) {
		mixpanel.track('Quiz Halfway', {
			'quiz-size': quizSize
		});
		showToast = true;
		setTimeout(() => {
			showToast = false;
		}, 2000);
	}

	$: if (currentVote === quizSize && showResults) {
		userProximity = [
			{ party: BE, value: 0 },
			{ party: PS, value: 0 },
			{ party: CH, value: 0 },
			{ party: IL, value: 0 },
			{ party: L, value: 0 },
			{ party: PAN, value: 0 },
			{ party: PCP, value: 0 },
			{ party: PSD, value: 0 }
		];

		calculateProximity(proposals, userVote, userProximity);

		for (let p of userProximity) {
			p.value = p.value / quizSize;
		}

		// If multiple parties have the same proximity, shuffle them
		userProximity = userProximity.sort(() => Math.random() - 0.5).sort((a, b) => b.value - a.value);
		const results = userVote.map((p) => ({ id: p.proposal.official_id, user_vote: p.vote }));

		mixpanel.track('Quiz Finished', {
			'quiz-size': quizSize,
			'top-party': userProximity[0].party.name,
			'top-party-proximity': userProximity[0].value,
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
				top_party: userProximity[0].party
			})
		});
	}

	async function getNewQuiz() {
		let tagsParam = Array.from(selectedTags).join(',');

		let response = await fetch(`/proposals?tags=${tagsParam}&pageSize=7`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		let new_data = await response.json();
		data.db = new_data.proposals;
		showCategoriesPicker = false;
		selectedTags = [];
		initializeVar();
		currentVote = 0;
	}

	/*
	function categoryCounts(){
		let counts = {};
		for (let proposal of proposals) {
			if (counts[proposal.category]) {
				counts[proposal.category] += 1;
			} else {
				counts[proposal.category] = 1;
			}
		}
		return Object.entries(counts).map(([category, count]) => ({ category, count }));
	}
	*/

	initializeVar();
</script>

<DevBanner env={data.env} />

<Toast
	bind:open={showToast}
	divClass="flex mt-3 fixed z-50 w-full p-4 text-slate-500 bg-white opacity-85 shadow dark:text-slate-400 dark:bg-slate-800 gap-3"
	contentClass="w-full text-m font-normal text-center"
>
	Chegaste a metade do Quiz! 🎉
</Toast>

{#if !readInstructions}
	<div class="mx-auto flex h-full w-full items-center justify-center">
		<Welcome bind:readInstructions />
	</div>
{:else if currentVote === quizSize && showResults}
	<div class="flex min-h-screen flex-col items-center justify-center px-4 sm:px-0">
		<div id="share" class="flex flex-col items-center justify-center">
			<Hemicycle partyRankingList={userProximity} party_logo={userProximity[0].party.name} />

			<button
				tabindex="0"
				class="mb-1 mt-2 cursor-pointer text-center text-xs font-bold text-slate-500 underline decoration-slate-300 decoration-dashed decoration-2 underline-offset-2 hover:decoration-slate-500 sm:text-lg md:text-sm"
				id="descobre"
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

			<PartyInfo bind:show={showPartyInfo} party={userProximity[0].party.name} />

			<!-- {#if data.env !== 'production'} -->
			<AiSummary proposals={userVote} winningPartyShortDescription={userProximity[0].party.name} />
			<!-- {/if} -->

			<BarChart proximity={userProximity} />
		</div>
		<VoteResults vote_proposals={userVote} />

		<OthersResults />

		<div class="mt-2 flex flex-col items-center justify-center px-4 text-base sm:px-0">
			<h2 class="text-m text-center text-base font-bold">Os temas não te diziam muito?</h2>
			<p class="text-center text-xs">Recomeça com as categorias que te interessam.</p>
			<button
				class="mb-4 mt-4 rounded-2xl bg-slate-700 px-6 py-3 text-base font-bold text-slate-200 hover:bg-slate-400"
				on:click={() => {
					showCategoriesPicker = true;
				}}
			>
				<IconRefresh size={32} stroke={2} />
			</button>
			{#if showCategoriesPicker}
				<TagPicker bind:show={showCategoriesPicker} bind:selectedTags onButtonClick={getNewQuiz} />
			{/if}
		</div>

		<SocialShare title="Quórum Político." url="https://quorum-politico.pt/" desc="O Partido que melhor me representa é: {userProximity[0].party.name}" />

		<AboutButton />
	</div>
{:else if currentVote === quizSize && !showResults}
	<div class="mt-8 flex w-full flex-col items-center justify-center">
		<div class="flex w-2/3 flex-col items-center justify-center">
			<Hemicycle random={true} />
		</div>
	</div>

	<div class="mt-8 flex w-full flex-col items-center">
		<button class="mb-2 w-2/3 rounded bg-slate-500 bg-opacity-50 py-2 font-bold text-slate-100 shadow-2xl hover:bg-slate-700 sm:w-1/3" on:click={() => (showResults = true)}
			>👁️ Mostra-me os resultados</button
		>
		{#if quizSize === 15 || quizSize === 2}
			<button class="mt-2 mb-6 w-2/3 rounded bg-slate-500 bg-opacity-50 py-2 font-bold text-slate-100 shadow-2xl hover:bg-slate-700 sm:w-1/3" on:click={addQuestion}
				>🤓 Responde a mais 10 perguntas para aumentar a precisão do resultado</button
			>
		{:else}
			<button class="mt-2 mb-6 w-2/3 rounded bg-slate-500 bg-opacity-50 py-2 font-bold text-slate-100 shadow-2xl hover:bg-slate-700 sm:w-1/3" on:click={addQuestion}
				>📚 Estou a pensar tornar-me um deputado (mais 10 perguntas)</button
			>
		{/if}

	    <!-- {#each categoryCounts() as proposal, i}
			<div class="italic flex flex-col items-center justify-center px-4 text-slate-400 sm:mt-2 sm:bg-opacity-100 sm:px-0">
				{proposal.category} - {proposal.count}
			</div>
		{/each} -->
		<p class="italic text-lg text-slate-400 mt-1">{quizSize} votos até agora.</p>
	</div>
{:else}
	<div class="loading absolute top-0 z-40 h-2 bg-teal-500 opacity-50 transition-all duration-200 sm:h-4" style="width: {(currentVote / quizSize) * 100}%" />
	{#key currentVote}
		<div class="flex flex-col items-center justify-center px-4 sm:mt-8 sm:bg-opacity-100 sm:px-0">
			<Document proposal_document={proposals[currentVote]} />

			<div class="fixed bottom-0 left-0 right-0 flex justify-center space-x-4 bg-slate-100 bg-opacity-95 p-4 sm:relative sm:mt-2 sm:bg-opacity-0">
				<button class="rounded bg-green-400 px-4 py-1 font-bold text-slate-700 hover:bg-green-700 hover:text-slate-200" on:click={() => handleVoteClick('1')}
					>Aprovar<span class="hidden sm:block">👍</span></button
				>
				<button class="rounded bg-slate-400 px-4 font-bold text-slate-700 hover:bg-slate-700 hover:text-slate-200" on:click={() => handleVoteClick('2')}
					>Abster-me<span class="hidden sm:block">🤷‍♂️</span></button
				>
				<button class="rounded bg-red-400 px-4 font-bold text-slate-700 hover:bg-red-700 hover:text-slate-200" on:click={() => handleVoteClick('0')}
					>Rejeitar<span class="hidden sm:block">👎</span></button
				>
			</div>
		</div>
	{/key}
{/if}
