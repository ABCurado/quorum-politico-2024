<script lang="ts">
	export let readInstructions = false;
</script>

{#if !readInstructions}
	<div class="flex flex-col items-center p-6 sm:p-8">
		<h1 class="text-center text-4xl mb-4">Descobre em quem votar</h1>
		<p class="text-center text sm:text-base mb-4">
			Olá! Bem-vindo ao <strong>Concordas?</strong>, um jogo que te permite descobrir em quem votar nas próximas eleições. O jogo é baseado nas votaçõoes que aconteceram no parlamento europeu de 2022-2023.
		</p>
		<div class="mt-4 mb-8">
			<ul class="list-disc list-inside ml-5 text-slate-900 dark:text-slate-200 list-image-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNCAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjMzhiZGY4Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy42ODUuMTUzYS43NTIuNzUyIDAgMCAxIC4xNDMgMS4wNTJsLTggMTAuNWEuNzUuNzUgMCAwIDEtMS4xMjcuMDc1bC00LjUtNC41YS43NS43NSAwIDAgMSAxLjA2LTEuMDZsMy44OTQgMy44OTMgNy40OC05LjgxN2EuNzUuNzUgMCAwIDEgMS4wNS0uMTQzWiIgLz48L3N2Zz4=')]">
				<li>Lê a proposta que te é apresentada</li> 
				<li>Decide se concordas ou não com o mesmo.</li>
				<li>No final, o jogo vai-te dizer em quem votar.</li>
			</ul>
		</div>
		<button
			class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-3 sm:px-4 rounded-full"
			on:click={() => {
				readInstructions = true;
			}}>Começar</button
		>
	</div>
{/if}
