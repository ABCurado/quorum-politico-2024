<script lang="ts">
	import { Bar } from 'svelte-chartjs';
	import 'chart.js/auto';
	import { IconThumbUpFilled, IconThumbDownFilled } from '@tabler/icons-svelte';
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
	let isMobile;
	
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
		isMobile = window.innerWidth < 768
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
				label: 'Número de votantes que se identificam',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 1).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(16, 185, 129, 0.6)',
				order: 1
			},
			{
				label: 'Número de votantes que não se identificam',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 0).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(239, 68, 68, 0.6)'
			},
			{
				label: 'Não expressaram a sua opinião',
				data: Object.values(voteResults).map((vote) => vote.filter((v) => v.agrees === 2).reduce((acc, cur) => acc + cur.votes, 0)),
				backgroundColor: 'rgb(200, 200, 200, 0.6)'
			}
		]
	};
	
</script>

<div class="w-3/4 lg:w-1/2 xl:w-1/3">
	{#if !showResults}
		<div class="container mx-auto p-1">
			<h2 class="text-m text-center text-base font-bold">Identificas-te com o resultado?</h2>
			<p class="text-center text-xs">Responde para veres os resultados de quem já participou.</p>
			<div class="flex justify-center">
				<button on:click={showResultsFunction} id="1" class="m-2 rounded bg-green-800 p-3 font-bold text-slate-200 hover:bg-green-500" title="Click to agree">
					<IconThumbUpFilled />
				</button>
				<button on:click={showResultsFunction} id="0" class="m-2 rounded bg-red-800 p-3 font-bold text-slate-200 hover:bg-red-500" title="Click to disagree">
					<IconThumbDownFilled />
				</button>
			</div>
		</div>
	{/if}
	{#if loading}
		<div class="flex justify-center">
			<div class="h-32 w-32 animate-spin rounded-full border-b-2 border-slate-900" />
		</div>
	{:else if showResults}
		<h2 class="text-m mb-4 text-center font-bold">Resultados de quem já participou:</h2>
		<div class="h-60">
			<Bar
				{data}
				options={{
					responsive: true,
					maintainAspectRatio: false,

					plugins: {
						legend: {
							position: 'top',
							labels: {
								font: {
									size: isMobile ? 10 : 14
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
									size: 12
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
		</div>
	{/if}
</div>
