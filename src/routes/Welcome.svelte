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

		<h1 class="text-center text-4xl mb-4"><strong>ADN Político</strong> - Descobre que partido melhor te representa.</h1>
		<p class="text-center text sm:text-base mb-4">Defende os <strong>teus</strong> interesses no parlamento. Sê o teu próprio representante partidário.</p>
		<!-- {#key ticker} -->
		<Hemicycle centerText="" random={true} />
		<!-- {/key} -->

		<div class="mb-8 mt-4">
			<!--As <b>instruções</b> são simples:-->
			<ul>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">Lê o sumário, riscos e críticas de cada proposta que te é apresentada.</span>
				</li>
				<li class="ml-3 flex items-center">
					<IconCheckbox size={16} stroke={3} color="green" />
					<span class="ml-2">Decide se és a favor, contra ou simplesmente abstem-te.</span>
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
