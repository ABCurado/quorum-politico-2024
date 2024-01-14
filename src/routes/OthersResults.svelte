<script lang="ts">
	let showResults = false;
	let results;

	$: if (showResults) {
		results = fetch('/votes', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((json) => {
				console.log(json);
			});
	}
</script>

<button on:click={() => (showResults = !showResults)} class="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded"> Concordas? (Vê os resultados dos outros) </button>

{#if showResults}
	<div>result</div>
{/if}
