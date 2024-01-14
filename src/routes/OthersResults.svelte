<script lang="ts">
	let results: [{ agrees: number; votes: number }];
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

	async function showResultsFunction() {
        results = await fetchData();
		showResults = true;
	}
</script>

<button on:click={showResultsFunction} class="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded"> Concordas? (Vê os resultados dos outros) </button>

{#if showResults}
	{#each results as result}
		<div>{result.agrees}</div>
		<div>{result.votes}</div>
	{/each}
{/if}
