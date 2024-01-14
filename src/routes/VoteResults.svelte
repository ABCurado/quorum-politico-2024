<script lang="ts">
	export let votes: Array<{ party: string; proximity: number; title: string; author: string; final_result: string; user_vote: string }>;
	let showResults = false;
</script>

<button on:click={() => (showResults = !showResults)} class="bg-blue-300 hover:bg-blue-500 text-white font-bold py-2 px-4 m-2 rounded"> Mostrar resultados </button>

{#if showResults}
	{#each votes as vote}
		<div class="shadow overflow-hidden sm:rounded-lg mb-4 w-3/4">
			<div class="px-4 py-5 sm:px-6 border-b border-gray-200 w-full">
				<h2 class="text-lg leading-6 font-medium text-gray-900">{vote.title} - {vote.author}</h2>
			</div>
			<div class="px-4 py-4 sm:px-6 w-full">
				<p class="text-sm text-gray-500">⁠O que decidiste tu: {vote.user_vote === '0' ? 'Rejeitar' : vote.user_vote === '1' ? 'Aceitar' : 'Abestençao'}</p>
				<p class="text-sm text-gray-500">⁠O que decidiu a average das pessoas:</p>
				<p class="text-sm text-gray-500">⁠Qual foi o outcome real: {vote.final_result === '0' ? 'Rejeitar' : vote.final_result === '1' ? 'Aceitar' : 'Abestençao'}</p>
			</div>
		</div>
	{/each}
{/if}
