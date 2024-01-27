<script lang="ts">
	export let readInstructions = false;
	import Hemicycle from './Hemicycle.svelte';
	import TagPicker from './tags/TagPicker.svelte';

	let ticker = 0;


</script>

<TagPicker />
{#if !readInstructions}
	<div class="flex flex-col items-center p-6 sm:p-8">
		<!-- <h1 class="text-center text-4xl mb-4">Descobre em quem votar</h1> -->
		<!--Olá! Bem-vindo ao <strong>Concordas?</strong>, um jogo que te permite descobrir em quem votar nas próximas eleições. O jogo é baseado nas votaçõoes que aconteceram no parlamento europeu de 2022-2023. -->

		<h1 class="text-center text-4xl mb-4">Descobre o teu ADN Político!</h1>
		<p class="text-center text sm:text-base mb-4">Pronuncia-te diretamente sobre as propostas de legislação e defende os teus interesses no parlamento. Sê o teu próprio representante partidário. E vê que partido melhor te representou.</p>
		<!-- {#key ticker} -->
			<Hemicycle centerText="" random={true} /> 
		<!-- {/key} -->

		<div class="mt-4 mb-8">
			As <b>instruções</b> são simples:
			<ul
				class="list-disc list-inside ml-5 text-slate-900 dark:text-slate-200 list-image-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTIiIHZpZXdCb3g9IjAgMCAxNCAxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjMzhiZGY4Ij48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMy42ODUuMTUzYS43NTIuNzUyIDAgMCAxIC4xNDMgMS4wNTJsLTggMTAuNWEuNzUuNzUgMCAwIDEtMS4xMjcuMDc1bC00LjUtNC41YS43NS43NSAwIDAgMSAxLjA2LTEuMDZsMy44OTQgMy44OTMgNy40OC05LjgxN2EuNzUuNzUgMCAwIDEgMS4wNS0uMTQzWiIgLz48L3N2Zz4=')]"
			>
				<li>Lê a proposta que te é apresentada, sumário, riscos e críticas.</li>
				<li>Usa os poderes do partido: vota a favor, contra, ou abstem-te.</li>
				<li>No final, dizemos-te que partido melhor te representou.</li>
			</ul>
		</div>
		<button
			class="bg-green-400 hover:bg-green-700 text-white font-bold py-3 px-3 sm:px-4 rounded-full"
			on:click={() => {
				readInstructions = true;
				window.scrollTo(0,0);
			}}>Entra na Assembleia</button
		>
	</div>
{/if}
