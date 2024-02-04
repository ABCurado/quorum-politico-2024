<script>
	import Hemicycle from '../Hemicycle.svelte';
</script>

<div class="flex w-full justify-center">
	<Hemicycle random={true} />
</div>
<div class="relative mx-auto w-10/12 space-y-8 py-3 sm:mx-auto">
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">ADN Político:</h2>
		<div class="space-y-2">
			<p class="mt-2 text-lg text-gray-700">Iniciativa apartidária para votares diretamente em propostas parlamentares e perceberes que partido melhor te representa. 
								Ignoramos agendas políticas e partidárias, o que se diz em entrevistas, o que se escreve e promete em programas eleitoriais. 
								Queremos avaliar objetivamente como cada partido utiliza o seu poder de voto.
								Melhorando a transparência sobre a atividade parlamentar conseguimos contribuir para interações políticas menos populistas e polarizadas.</p>
		</div>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Para sugestões, elogios ou reclamações:</h2>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/ab_curado" target="_blank"><u>twitter.com/ab_curado</u></a></p>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/RicardoPinho96" target="_blank"><u>twitter.com/RicardoPinho96</u></a></p>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/tiagomfurtado" target="_blank"><u>twitter.com/tiagomfurtado</u></a></p>
	</div>

	<div class="mt-8 space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Como esta plataforma se distingue do clássico Quiz</h2>
		<ul class="mt-4 list-inside list-disc space-y-2 text-lg text-gray-700">
			<li>Possibilidade de deep dive em cada proposta</li>
			<li>Objetividade da análise (vs subjetividade de uma "pergunta" num quiz)</li>
			<li>Open Source</li>
		</ul>
	</div>

	<div class="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
		<div class="mt-10 space-y-4 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28">
			<h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">Falhas na metodologia</h2>
			<ul class="mt-3 space-y-2 text-base text-gray-500 sm:mt-5 sm:text-lg md:mt-8">
				<li class="mt-2">
					<span class="text-gray-700">e.g. os contra argumentos podem estar biased</span>
				</li>
				<li class="mt-2">
					<span class="text-gray-700">Apenas contém as que achamos "mais importantes" de 2023 - total 63</span>
				</li>
				<li class="mt-2">
					<span class="text-gray-700">Apenas contém os "bullets de cada partido" das Legislativas de 2022 -> still to update</span>
				</li>
				<li class="mt-2">
					<span class="text-gray-700">Retiramos as unânimes</span>
				</li>
			</ul>
		</div>
	</div>
</div>
