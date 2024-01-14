<script lang="ts">
	import mixpanel from 'mixpanel-browser';

	let voteResults: { agrees: number; disagrees: number } = {
		agrees: 0,
		disagrees: 0
	};
	let showResults = false;

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

	async function showResultsFunction(event) {
		await fetch('/votes', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				device_id: mixpanel.get_distinct_id(),
				agrees: event.target.id === '1'
			})
		});
		results = await fetchData();
		voteResults['agrees'] = results.find((result) => result.user_vote === '1').votes;
		voteResults['disagrees'] = results.find((result) => result.user_vote === '0').votes;
		showResults = true;
	}
</script>


<h2>Concordas? (Vê os resultados dos outros)</h2>
<button on:click={showResultsFunction} id="1" class="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 m-2 rounded"> Sim, votei neste partido desde pequenino </button>
<button on:click={showResultsFunction} id="0" class="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 m-2 rounded"> Odeio este partido. Vou ter que repensar a minha vida </button>

{#if showResults}
	<div class="shadow overflow-hidden sm:rounded-lg mb-4 w-3/4">
		<div class="px-4 py-5 sm:px-6 border-b border-gray-200 w-full">
			<h2 class="text-lg leading-6 font-medium text-gray-900">Concordas?</h2>
		</div>
		<div class="px-4 py-4 sm:px-6 w-full">
			<p class="text-sm text-gray-500">⁠{voteResults.agrees} pessoas concordaram</p>
			<p class="text-sm text-gray-500">⁠{voteResults.disagrees} pessoas discordaram</p>
		</div>
	</div>
{/if}
