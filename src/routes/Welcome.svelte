<script lang="ts">
	import mixpanel from 'mixpanel-browser';
	import AboutButton from './AboutButton.svelte';

	export let readInstructions = false;
	import Hemicycle from './Hemicycle.svelte';
	import TagPicker from './tags/TagPicker.svelte';
	import { IconCheckbox } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	let ticker = 0;
	let aiQuote = '';
	// onMount(() => {
	// 	fetch('/ai')
	// 		.then((res) => res.json())
	// 		.then((data) => {
	// 			aiQuote = data.response;
	// 		});
	// });
</script>

<TagPicker />
{#if !readInstructions}
	<div class="flex flex-col items-center p-6 sm:p-8">
		<h1 class="mb-4 text-center text-4xl"><strong>Quórum Político</strong>: vota diretamente nas propostas parlamentares.</h1>
		<p class="text mb-4 text-center sm:text-base">Avalia objetivamente o partido que melhor te representa, longe de <strong>promessas eleitorais</strong> e <strong>ideologias partidárias</strong>. Sê o teu próprio representante partidário.</p>
		<p class="text mb-4 text-center text-slate-500 sm:text-base"><i>Não é só mais um quiz político.</i></p>

		<Hemicycle random={true} />

		<div class="mb-4 mt-4 text-base">
			<ul>
				<li class="flex items-center mb-1">
					<div class="">
						<IconCheckbox size={16} stroke={3} class="text-green-600" />
					</div>
					<span class="ml-2">Lê a <strong>motivação, riscos e críticas</strong> de 15 propostas parlamentares (das 62 que recolhemos).</span>
				</li>
				<li class="flex items-center mb-1">
					<div class="">
						<IconCheckbox size={16} stroke={3} class="text-green-600" />
					</div>
					<span class="ml-2">Decide se és <strong>a favor</strong>, <strong>contra</strong> ou simplesmente <strong>abstém-te</strong>.</span>
				</li>
				<li class="flex items-center mb-1">
					<div class="">
						<IconCheckbox size={16} stroke={3} class="text-green-600" />
					</div>
					<span class="ml-2 flex-grow">No final, dizemos-te que <strong>partido realmente te representou</strong>.</span>
				</li>
				<li class="flex items-center mb-1">
					<div class="">
						<IconCheckbox size={16} stroke={3} class="text-green-600" />
					</div>
					<span class="ml-2 flex-grow">Não guardamos quaisquer dados pessoais.</span>
				</li>
			</ul>
		</div>

		{#if aiQuote}
			<p class="text mb-4 text-center sm:text-base"><i>{aiQuote}</i></p>
		{/if}

		<button
			class="mb-4 rounded bg-green-600 px-3 py-3 font-bold text-white hover:bg-green-700 sm:px-4"
			on:click={() => {
				readInstructions = true;
				window.scrollTo(0, 0);
				mixpanel.track('Quiz Start');
			}}>Entra na Assembleia</button
		>

		<p class="text mb-4 text-center text-slate-500 sm:text-base"><i>Demora ~15min</i></p>

		<AboutButton />
	</div>
{/if}
