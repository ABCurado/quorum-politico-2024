<script>
	export let readInstructions = false;
</script>

{#if !readInstructions}
	<div class="flex flex-col justify-center items-center p-6 sm:p-8">
		<h1 class="text-center text-3xl sm:text-4xl mb-4">Descobre em quem votar</h1>
		<p class="text-center text-sm sm:text-base mb-4">
			Olá! Bem-vindo ao <strong>Concordas?</strong>, um jogo que te permite descobrir em quem votar nas próximas eleições. O jogo é baseado nas votaçõoes que aconteceram no parlamento europeu de 2021-2023.
		</p>
		<div class="mt-4">
			O jogo é simples:
			<ul class="list-disc list-inside ml-5">
				<li>Lê a proposta que te é apresentada</li> 
				<li>Decide se concordas ou não com o mesmo.</li>
				<li>No final, o jogo vai-te dizer em quem votar.</li>
			</ul>
		</div>
		<p class="text-center text-sm sm:text-base mb-4 mt-8">Para começar, clica no botão abaixo.</p>
		<button
			class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 sm:py-2 px-2 sm:px-4 rounded-full text-xs sm:text-sm"
			on:click={() => {
				readInstructions = true;
			}}>Começar</button
		>
	</div>
{/if}
