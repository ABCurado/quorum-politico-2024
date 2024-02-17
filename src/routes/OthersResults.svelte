<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';
	import mixpanel from 'mixpanel-browser';
	import { tick } from 'svelte';

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
		// await fetch('/votes', {
		// 	method: 'PUT',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		device_id: mixpanel.get_distinct_id(),
		// 		agrees: event.target.id === '1' ? 1 : 0
		// 	})
		// });
		voteResults = await fetchData();

		voteResults = Object.fromEntries(
			Object.entries(voteResults).sort((a, b) => {
				const totalVotesA = a[1].reduce((acc, cur) => acc + cur.votes, 0);
				const totalVotesB = b[1].reduce((acc, cur) => acc + cur.votes, 0);
				return totalVotesB - totalVotesA;
			})
		);
		loading = false;
		showResults = true;
	}

	$: data = {
		labels: Object.keys(voteResults).map((key) => `${key} (${voteResults[key].reduce((acc, cur) => acc + cur.votes, 0)})`),
		datasets: [
			{
				label: 'Sim',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 1).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(16, 185, 129, 0.6)',
				order: 1
			},
			{
				label: 'Não',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 0).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(239, 68, 68, 0.6)'
			},
			{
				label: 'Sem opiniāo',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 2).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(200, 200, 200, 0.6)'
			}
		]
	};
</script>

<div class="w-3/4 lg:w-1/2 xl:w-1/3">
	{#if !showResults}
		<div class="container mx-auto px-4">
			<h2 class="text-m mb-4 text-center text-base font-bold">Identificas-te com o resultado? Responde para veres os resultados de quem já participou.</h2>
			<div class="mb-4 flex justify-center">
				<button on:click={showResultsFunction} id="1" class="m-2 flex-1 rounded bg-green-300 px-4 py-2 font-bold text-white hover:bg-green-500" title="Click to agree">Sim</button>
				<button on:click={showResultsFunction} id="0" class="m-2 flex-1 rounded bg-red-300 px-4 py-2 font-bold text-white hover:bg-red-500" title="Click to disagree">Não</button>
			</div>
		</div>
	{/if}
	{#if loading}
		<div class="flex justify-center">
			<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
		</div>
	{:else if showResults}
		<h2 class="text-m mb-4 text-center font-bold">Resultados de quem já participou:</h2>
		<Bar
			{data}
			options={{
				plugins: {
					legend: {
						position: 'top',
						labels: {
							font: {
								size: 0
							}
						}
					},
					title: {
						display: false,
						text: 'Compara-te com as votações parlamentares'
					}
				},
				responsive: true,
				scales: {
					x: {
						stacked: true,
						grid: {
							display: false
						},
						ticks: {
							font: {
								size: 10
							}
						}
					},
					y: {
						display: false,
						stacked: true
					}
				},
				maxBarThickness: 25
			}}
		/>
	{/if}
</div>
