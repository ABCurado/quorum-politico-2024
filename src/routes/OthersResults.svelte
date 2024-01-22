<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';
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
		voteResults = await fetchData();
		loading = false;
		showResults = true;
	}

	$: data = {
		labels: Object.keys(voteResults),
		datasets: [
			{
				label: 'Sim',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 1).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(16, 185, 129, 0.6)'
			},
			{
				label: 'Não',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 0).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(239, 68, 68, 0.6)'
			},
			{
				label: 'Sem opiniāo',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 2).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(125, 125, 125,0.6)'
			}
		]
	};
</script>

<div class="sm:w-2/3 l:w-1/3">
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
		<Bar
			{data}
			options={{
				responsive: true,
				plugins: {
					legend: {
						position: 'bottom'
					},
					title: {
						display: false,
						text: 'Resultados das votações'
					}
				},

				scales: {
					x: {
						// display: false,
						stacked: true
					},
					y: {
						display: false,
						stacked: true
					}
				}
			}}
		/>
	{/if}
</div>
