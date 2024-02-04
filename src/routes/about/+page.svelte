<script>
	import Hemicycle from '../Hemicycle.svelte';
</script>

<div class="flex w-full justify-center">
	<Hemicycle random={true} />
</div>
<div class="relative mx-auto w-10/12 space-y-8 py-3 sm:mx-auto">
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">O que é o ADN Politico?</h2>
		<div class="space-y-2">
			<p class="mt-2 text-lg text-gray-700">Iniciativa/Ferramenta apartidaria</p>
			<p class="mt-2 text-lg text-gray-700">Entender semelhanças entre perfil político pessoal e a realidade das agendas dos partidos (tendência de voto)</p>
			<p class="mt-2 text-lg text-gray-700">
				Explicar o conceito de Plebiscito - porque é literalmente o que estamos a fazer, a simular uma "Democracia Direta" ao transferir o poder de voto do representante (deputado/partido) para o
				eleitor.
			</p>
			<p class="mt-2 text-lg text-gray-700">Dicotomia entre o fácil e rápido acesso a informação hoje, mas dificuldade em "digerir" facilmente a informação Política em PT</p>
			<p class="mt-2 text-lg text-gray-700">Consiste na simulação de voto em 15 medidas apresentadas na AR, com possibilidade de repetição personalizando os assuntos de voto</p>
			<p class="mt-2 text-lg text-gray-700">(Link para o repositório de perguntas / open source code) -> acho importante abrir isto (perguntas, contra argumentos, tags, etc...)</p>
			<p class="mt-2 text-lg text-gray-700">Explicar que os contra argumentos foram construídos por nós, com o nosso entendimento / interpretação da medida</p>
			<p class="mt-2 text-lg text-gray-700">Possibilidade de partilhar com amigos interessados + ver o que outros votaram, mas aviso de que não guardamos dados individuais</p>
			<p class="mt-2 text-lg text-gray-700">
				Explicar o resultado final: Coincidência entre orientação de voto do partido, e do utilizador + Explicar que é possível entrar no detalhe da proposta através do link direto + ver facilmente em
				tabela qual partido votou a favor, dando acesso a uma granularidade interessante de comparação não só na generalidade, mas para cada proposta individual
			</p>
		</div>
	</div>
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Objetivos TLDR</h2>
		<ul class="mt-4 list-inside list-disc space-y-2 text-lg text-gray-700">
			<li>(i) mobilizar os eleitores portugueses para o voto</li>
			<li>(ii) incentivo a um voto informado, munido de argumentos e fatos</li>
			<li>(iii) auxílio na melhor caracterização e entendimento de cada agenda partidária política, através do registro histórico da sua tendência de voto na AR</li>
		</ul>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Para sugestões, ideias ou reclamações:</h2>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/ab_curado" target="_blank">twitter.com/ab_curado</a></p>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/RicardoPinho96" target="_blank">twitter.com/RicardoPinho96</a></p>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/tiagomfurtado" target="_blank">twitter.com/tiagomfurtado</a></p>
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
