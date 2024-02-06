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

		<h1 class="text-center text-4xl mb-4"><strong>ADN Político</strong>: descobre que partido melhor te representa.</h1>
		<p class="text-center text sm:text-base mb-4">Não é só mais um quiz político. Sê o teu próprio representante partidário e <strong>vota diretamente nas propostas parlamentares</strong>.</p>
		
		<!-- {#key ticker} -->
		<Hemicycle centerText="" random={true} />
		<!-- {/key} -->

		<div class="mb-8 mt-4">
			<!--As <b>instruções</b> são simples:-->
			<ul>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">Lê a <strong>motivação, riscos e críticas</strong> de cada proposta que te é apresentada.</span>
				</li>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">Decide se és a <strong>favor</strong>, <strong>contra</strong> ou simplesmente <strong>abstém-te</strong>.</span>
				</li>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">No final, dizemos-te que <strong>partido realmente te representou</strong>.</span>
				</li>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">Fica descansado, não guardamos quaisquer dados! Podes, no entanto, ajudar-nos ao partilhar com os teus amigos!</span>
				</li>
			</ul>
		</div>
		<button
			class="rounded bg-green-400 px-3 py-3 font-bold mb-4 text-white hover:bg-green-700 sm:px-4"
			on:click={() => {
				readInstructions = true;
				window.scrollTo(0, 0);
			}}>Entra na Assembleia</button
		>

		<p class="text-center text sm:text-base mb-4 text-gray-700">Demora ~15min</p>

		<AboutButton />
	</div>
{/if}
