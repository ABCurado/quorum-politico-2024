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
		const results = await fetchData();
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
	<div class="flex justify-center">
		<div class="w-1/2">
			<div class="flex justify-between">
				<div class="text-center text-xl font-bold text-green-500">{voteResults.agrees}</div>
				<div class="text-center text-xl font-bold text-red-500">{voteResults.disagrees}</div>
			</div>
			<div class="flex justify-between">
				<div class="text-center text-xl font-bold text-green-500">Concordam</div>
				<div class="text-center text-xl font-bold text-red-500">Não concordam</div>
			</div>
			<div class="flex justify-center">
				<div class="w-1/2">
					<div class="bg-green-300 h-4 rounded-full mb-2">
						<div class="w-1/2 bg-green-500 h-4 rounded-full" />
					</div>
					<div class="bg-red-300 h-4 rounded-full mb-2">
						<div class="w-1/2 bg-red-500 h-4 rounded-full" />
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
