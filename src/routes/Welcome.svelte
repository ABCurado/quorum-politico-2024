<script>
	export let readInstructions = false;
</script>

{#if !readInstructions}
	<div class="flex flex-col justify-center items-center">
		<h1 class="text-center text-6xl mb-4">Descobre em em quem votar</h1>
		<p class="text-center text-lg mb-4">
			Olá! Bem-vindo ao <strong>Concordas?</strong>, um jogo que te permite descobrir em quem votar
			nas próximas eleições. O jogo é simples: lê o documento que te é apresentado e
			decide se concordas ou não com o mesmo. No final, o jogo vai-te dizer em quem votar.
		</p>
		<p class="text-center text-lg mb-4">
			Para começar, clica no botão abaixo.
		</p>
		<button
			class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
			on:click={() => {readInstructions = true;}}>Começar</button>
	</div>
{/if}
