<script lang="ts">
	import mixpanel from 'mixpanel-browser';

	// agrees: 1 - Means agree
	// agrees: 0 - Means disagree
	// aggres: 2 - Means no vote
	type Vote = {
		agrees: number;
		votes: number;
	};

	type Votes = {
		[key: string]: Vote[];
	};

	let voteResults: Votes = {};
	let showResults = false;
	let loading = false;

	async function fetchData() {
		const response = await fetch('/votes', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return await response.json();
	}

	async function showResultsFunction(event: { target: { id: string } }) {
		loading = true;
		await fetch('/votes', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				device_id: mixpanel.get_distinct_id(),
				agrees: event.target.id === '1' ? 1 : 0
			})
		});
		const voteResults = await fetchData();
		loading = false;
		showResults = true;
	}
</script>

<div class="container mx-auto px-4">
	<h2 class="text-m font-bold mb-4 text-center">Concordas? (Vê os resultados dos outros)</h2>
	<div class="flex justify-center mb-4">
		<button on:click={showResultsFunction} id="1" class="flex-1 bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 m-2 rounded" title="Click to agree"
			>Sim, votei neste partido desde que nasci</button
		>
		<button on:click={showResultsFunction} id="0" class="flex-1 bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 m-2 rounded" title="Click to disagree"
			>Odeio. Vou ter que repensar a minha vida</button
		>
	</div>
</div>
{#if loading}
	<div class="flex justify-center">
		<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
	</div>
{:else if showResults}
	<div class="container mx-auto px-4">
		{#each Object.keys(voteResults) as party}
			<div class="shadow overflow-hidden sm:rounded-lg mb-4 w-full sm:w-3/4">
				<div class="px-4 py-5 sm:px-6 border-b border-gray-200 w-full">
					<h2 class="text-lg leading-6 font-medium text-gray-900">{party}</h2>
				</div>

				<div class="overflow-x-auto">
					<table class="min-w-full divide-y divide-gray-200 shadow mb-4 w-full sm:w-3/4 mx-auto">
						<thead class="bg-gray-50">
							<tr>
								<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Voto</th>
								<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Resultado votaçāo final</th>
							</tr></thead
						>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr>
								<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center"
									>{voteResults[party][0].agrees === 0 ? '❌' : voteResults[party][0].agrees === 1 ? '✅' : '🤷‍♂️'}</td
								>
								<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center"
									>{voteResults[party][0].votes === 0 ? '❌' : voteResults[party][0].votes === 1 ? '✅' : '🤷‍♂️'}</td
								>
							</tr>
						</tbody>
					</table>
					<table class="min-w-full divide-y divide-gray-200 shadow mb-4 w-full sm:w-3/4 mx-auto">
						<thead class="bg-gray-50">
							<tr>
								{#each Object.keys(voteResults[party][1]) as party}
									<th class="px-2 sm:px-6 py-3 text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{party}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200">
							<tr>
								{#each Object.values(voteResults[party][1]) as result}
									<td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">{result == 0 ? '❌' : result == 1 ? '✅' : '🤷‍♂️'}</td>
								{/each}
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		{/each}
	</div>
{/if}
