<script lang="ts">
	import mixpanel from 'mixpanel-browser';
	import type { UserVote } from '../types';
	
	export let vote_proposals: UserVote[];
	let showResults = false;

	$: if (vote_proposals) {
		mixpanel.track('Click Vote Results', { vote_proposals });
	}
</script>

<button on:click={() => (showResults = !showResults)} class="bg-gray-400 hover:bg-gray-800 text-white text-base font-bold py-2 px-4 m-2 rounded"> Clica para ver os Resultados das votações </button>

{#if showResults}
	{#each vote_proposals as vote}
		<div class="shadow overflow-hidden sm:rounded-lg mb-4 w-full lg:w-1/2 xl:w-1/3">
			<div class="px-4 py-5 sm:px-6 border-b border-gray-200 w-full">
				<h2 class="text-lg leading-6 font-medium text-gray-900">[{vote.proposal.author}] {vote.proposal.title}</h2>
			</div>

			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200 shadow mb-4 w-full sm:w-3/4 mx-auto">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">O teu Voto</th>
							<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Qual foi o resultado final da votação?</th>
						</tr></thead
					>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr>
							<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">{vote.vote === '0' ? '❌' : vote.vote === '1' ? '✅' : '🤷‍♂️'}</td>
							<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">{vote.proposal.final_result === false ? '❌' : vote.proposal.final_result === true ? '✅' : '🤷‍♂️'}</td>
						</tr>
					</tbody>
				</table>
				<table class="min-w-full divide-y divide-gray-200 shadow mb-4 w-full sm:w-3/4 mx-auto">
					<thead class="bg-gray-50">
						<tr>
							{#each vote.proposal.parties as party}
								<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{party}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr>
							{#each vote.proposal.party_votes as result}
								<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">{result === 0 ? '❌' : result === 1 ? '✅' : '🤷‍♂️'}</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	{/each}
{/if}
