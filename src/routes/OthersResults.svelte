<script lang="ts">
	let results: [{ agrees: number; votes: number }];
	let showResults = false;

	async function fetchData() {
		return fetch('/votes', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
				return json;
			});
	}

	async function showResultsFunction() {
		showResults = true;
		results = await fetchData();
	}
</script>

<button on:click={showResultsFunction} class="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded"> Concordas? (Vê os resultados dos outros) </button>

{#if showResults}
	{#each results as result}
		<div>{result.agrees}</div>
        <div>{result.votes}</div>
	{/each}
{/if}
