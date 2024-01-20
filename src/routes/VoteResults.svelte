<script lang="ts">
	import mixpanel from "mixpanel-browser";

	export let vote_proposals: Array<{ party: string; proximity: number; title: string; author: string; final_result: string; user_vote: string }>;
	let showResults = false;

	$: if (vote_proposals) {
		mixpanel.track("Click Vote", { vote_proposals });
	}
</script>

<button on:click={() => (showResults = !showResults)} class="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded"> Mostrar resultados </button>

{#if showResults}
	{#each vote_proposals as vote}
		<div class="shadow overflow-hidden sm:rounded-lg mb-4 w-full sm:w-3/4 dark:bg-gray-800">
			<div class="px-4 py-5 sm:px-6 border-b border-gray-200 w-full dark:border-gray-700 dark:text-gray-200">
				<h2 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-200">{vote.title} - {vote.author}</h2>
			</div>

			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200 shadow mb-4 w-full sm:w-3/4 mx-auto dark:divide-gray-700 dark:bg-gray-900">
					<thead class="bg-gray-50 dark:bg-gray-700">
						<tr>
							<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200">Tu</th>
							<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200">Resultado</th>
							{#each Object.keys(vote.votes) as party}
								<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider dark:text-gray-200">{party}</th>
							{/each}
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
						<tr>
							<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">{vote.user_vote === '0' ? '❌' : vote.user_vote === '1' ? '✅' : '🤷‍♂️'}</td>
							<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">{vote.final_result === '0' ? '❌' : vote.final_result === '1' ? '✅' : '🤷‍♂️'}</td>
							{#each Object.values(vote.votes) as result}
								<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center dark:text-gray-400">{result == '0' ? '❌' : result == '1' ? '✅' : '🤷‍♂️'}</td>
							{/each}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	{/each}
{/if}