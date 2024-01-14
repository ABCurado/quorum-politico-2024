<script lang="ts">
	import mixpanel from 'mixpanel-browser';

	let voteResults: { agrees: number; disagrees: number } = {
		agrees: 0,
		disagrees: 0
	};
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

	async function showResultsFunction(event: { target: { id: string; }; }) {
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
		const results = await fetchData();
		voteResults['agrees'] = results.find((result: { agrees: number; }) => result.agrees === 1).votes;
		voteResults['disagrees'] = results.find((result: { agrees: number; }) => result.agrees === 0).votes;
		loading = false;
        showResults = true;
	}
</script>

<div class="container mx-auto px-4">
    <h2 class="text-m font-bold mb-4 text-center">Concordas? (Vê os resultados dos outros)</h2>
    <div class="flex justify-center mb-4">
        <button on:click={showResultsFunction} id="1" class="bg-green-300 hover:bg-green-500 text-white font-bold py-2 px-4 m-2 rounded" title="Click to agree">Sim, votei neste partido desde pequenino</button>
        <button on:click={showResultsFunction} id="0" class="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 m-2 rounded" title="Click to disagree">Odeio este partido. Vou ter que repensar a minha vida</button>
    </div>

    {#if loading}
        <div class="flex justify-center">
            <div class="loader"></div>
        </div>
    {:else if showResults}
        <div class="shadow overflow-hidden sm:rounded-lg mb-4 w-3/4 mx-auto">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200 w-full">
                <h2 class="text-lg leading-6 font-medium text-gray-900">Concordas?</h2>
            </div>
            <div class="px-4 py-4 sm:px-6 w-full">
                <p class="text-sm text-gray-500">{voteResults.agrees} pessoas concordaram</p>
                <p class="text-sm text-gray-500">{voteResults.disagrees} pessoas discordaram</p>
            </div>
        </div>
    {/if}
</div>

<style>
.loader {
    border: 16px solid #f3f3f3;
    border-radius: 50%;
    border-top: 16px solid #3498db;
    width: 120px;
    height: 120px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>