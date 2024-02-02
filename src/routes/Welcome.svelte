<script lang="ts">
	import AboutButton from './AboutButton.svelte';

	export let readInstructions = false;
	import Hemicycle from './Hemicycle.svelte';
	import TagPicker from './tags/TagPicker.svelte';
	import { IconCheckbox } from '@tabler/icons-svelte';
	import { IconIcons } from '@tabler/icons-svelte';

	let ticker = 0;
</script>

<TagPicker />
{#if !readInstructions}
	<div class="flex flex-col items-center p-6 sm:p-8">
		<!-- <h1 class="text-center text-4xl mb-4">Descobre em quem votar</h1> -->
		<!--Olá! Bem-vindo ao <strong>Concordas?</strong>, um jogo que te permite descobrir em quem votar nas próximas eleições. O jogo é baseado nas votaçõoes que aconteceram no parlamento europeu de 2022-2023. -->

		<h1 class="text-center text-4xl mb-4">Descobre o teu ADN Político!</h1>
		<p class="text-center text sm:text-base mb-4">Pronuncia-te diretamente sobre as propostas de legislação e defende os teus interesses no parlamento. Sê o teu próprio representante partidário. Vê que partido melhor te representou.</p>
		<!-- {#key ticker} -->
		<Hemicycle centerText="" random={true} />
		<!-- {/key} -->

		<div class="mb-8 mt-4">
			As <b>instruções</b> são simples:
			<ul>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">Lê a proposta que te é apresentada, sumário, riscos e críticas.</span>
				</li>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">Usa os poderes do partido: vota a favor, contra, ou abstem-te.</span>
				</li>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">No final, dizemos-te que partido melhor te representou.</span>
				</li>
			</ul>
		</div>
		<button
			class="rounded bg-green-400 px-3 py-3 font-bold text-white hover:bg-green-700 sm:px-4"
			on:click={() => {
				readInstructions = true;
				window.scrollTo(0, 0);
			}}>Entra na Assembleia</button
		>
		<AboutButton />
	</div>
{/if}
