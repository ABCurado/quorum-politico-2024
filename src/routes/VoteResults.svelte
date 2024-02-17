<script lang="ts">
	import mixpanel from 'mixpanel-browser';
	import type { UserVote } from '../types';

	export let vote_proposals: UserVote[];
	let showResults = false;

	$: if (vote_proposals) {
		mixpanel.track('Click Vote Results', { vote_proposals });
	}
</script>

<button on:click={() => (showResults = !showResults)} class="m-2 rounded bg-gray-400 px-4 py-2 text-base font-bold text-white hover:bg-gray-800"> Clica para ver os Resultados das votações </button>

{#if showResults}
	{#each vote_proposals as vote}
		<div class="mb-4 w-full overflow-hidden shadow sm:rounded-lg lg:w-1/2 xl:w-1/3">
			<div class="w-full border-b border-gray-200 px-4 py-5 sm:px-6">
				<h2 class="text-lg font-medium leading-6 text-gray-900">[{vote.proposal.author}] {vote.proposal.title}</h2>
			</div>

			<div class="overflow-x-auto">
				<table class="mx-auto mb-4 w-full min-w-full divide-y divide-gray-200 shadow sm:w-3/4">
					<thead class="bg-gray-50">
						<tr>
							<th class="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 sm:text-sm">O teu Voto</th>
							<th class="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 sm:text-sm">Qual foi o resultado final da votação?</th>
						</tr></thead
					>
					<tbody class="divide-y divide-gray-200 bg-white">
						<tr>
							<td class="whitespace-nowrap px-2 py-2 text-center text-xs text-gray-500 sm:px-6 sm:py-4 sm:text-sm">{vote.vote === '0' ? '❌' : vote.vote === '1' ? '✅' : '🤷‍♂️'}</td>
							<td class="whitespace-nowrap px-2 py-2 text-center text-xs text-gray-500 sm:px-6 sm:py-4 sm:text-sm"
								>{vote.proposal.final_result === false ? '❌' : vote.proposal.final_result === true ? '✅' : '🤷‍♂️'}</td
							>
						</tr>
					</tbody>
				</table>
				<table class="mx-auto mb-4 w-full min-w-full divide-y divide-gray-200 shadow sm:w-3/4">
					<thead class="bg-gray-50">
						<tr>
							{#each vote.proposal.parties as party}
								<th class="px-2 py-3 text-xs font-medium uppercase tracking-wider text-gray-500 sm:px-6 sm:text-sm">{party}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						<tr>
							{#each vote.proposal.party_votes as result}
								<td class="whitespace-nowrap px-2 py-2 text-center text-xs text-gray-500 sm:px-6 sm:py-4 sm:text-sm">{result === 0 ? '❌' : result === 1 ? '✅' : '🤷‍♂️'}</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	{/each}
{/if}
