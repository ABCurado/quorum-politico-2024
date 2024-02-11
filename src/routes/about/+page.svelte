<script>
	import Hemicycle from '../Hemicycle.svelte';



    import { IconArrowBack } from '@tabler/icons-svelte';
    let goBack = () => {
        window.history.back();
    };


</script>


<!-- Back button -->
<div class="absolute top-4 left-4 cursor-pointer">
    <a on:click={goBack}>
        <IconArrowBack name="IconArrowBack" class="text-gray-700" size={48} />
    </a>
</div>



<div class="flex w-full justify-center">
	<Hemicycle random={true} />
</div>
<div class="relative mx-auto w-10/12 space-y-8 py-3 sm:mx-auto">
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">ADN Político:</h2>
		<ul class="mt-4 list-inside list-disc space-y-2 text-lg text-gray-700">
			<li>Iniciativa apartidária para votares diretamente em propostas parlamentares e perceberes que partido melhor te representa.</li>
			<li>
				Ignoramos agendas políticas e partidárias, o que se diz em entrevistas e o que se promete em programas eleitoriais. Queremos avaliar objetivamente como cada partido utiliza o seu poder de
				voto.
			</li>
		</ul>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Como funciona:</h2>
		<div class="space-y-2">
			<p class="mt-2 text-lg text-gray-700">Apresentamos-te 15 propostas onde podes simular ser o teu próprio representante partidário, votando a favor, contra ou abstendo-te.
								Em cada uma delas terás acesso à motivação para o partido a ter apresentado, bem como alguns riscos e críticas que a proposta pode ter.
								O objetivo é mostrar que até propostas que parecem de aprovação óbvia têm impactos diretos e indiretos que é preciso considerar, discutir e mitigar (algo que raramente é exposto nas propostas de cada partido).
								No final, apresentamos o partido que mais se assemelha ao teu padrão de voto e tens também a oportunidade de repetir a votação selecionando os teus temas preferidos. 
								Podes também explorar os documentos oficiais de cada proposta e como cada partido votou nas propostas em que votaste através do link direto associado.</p>
			<p class="mt-2 text-lg text-gray-700">No total recolhemos 62 propostas parlamentares apresentadas desde Janeiro de 2023 (considerando sempre a versão mais recente). 
								Consideramos 3 fatores na seleção das propostas: unanimidade (se uma proposta for unânime, não contribui para distinção das posições de cada partido, por isso temos apenas propostas em que pelo menos 1 partido diverge no voto); uniformidade (tentamos garantir representatividade de propostas de todos os espetros partidários e de vários temas relevantes); simplicidade (eliminamos propostas demasiado técnicas e que uma pessoa normal não iria ter interesse de investigar e interagir em tempo útil).
								Cada voto coincidente (tu votas a favor e partido vota a favor) adiciona um ponto à tua correlação com esse partido. Cada voto totalmente divergente (tu votas contra e partido a favor) retira um ponto à tua correlação com esse partido. Cada abstenção vs voto a favor adiciona 0.5 pontos à correlação. Cada abstenção vs voto contra não influencia a correlação.</p>
			<p class="mt-2 text-lg text-gray-700">Não precisas de criar conta e não guardamos nenhuns dados pessoais.</p>
			<p class="mt-2 text-lg text-gray-700">Código do projeto no <a href="https://github.com/ABCurado/em-quem-votar-2023" target="_blank"><u>GitHub</u></a>.</p>
		</div>
	</div>

	<div class="mt-8 space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Limitações:</h2>
		<ul class="mt-4 list-inside list-disc space-y-2 text-lg text-gray-700">
			<li>
				Votos contra dos partidos nem sempre se prendem com divergências com a motivação da proposta em si, mas sim em alguma discordância no plano de implementação ou salvaguardas legislativas que
				acham necessárias. Isto pode levar a que alguns votos não sigam a doutrina ideológica do partido.
			</li>
			<li>Riscos e críticas foram maioritariamente construídos por nós. Apesar de apartidários, podem refletir algum enviesamento.</li>
			<li>Apesar da representatividade das propostas recolhidas, cada seleção individual de 15 propostas pode estar enviesada para determinados temas ou ser maioritariamente de partidos de um espetro político.</li>
			<li>Esta ferramenta não substitui a leitura dos programas eleitorais como preparação do voto.</li>
		</ul>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Para sugestões, elogios ou reclamações:</h2>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/ab_curado" target="_blank"><u>twitter.com/ab_curado</u></a></p>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/RicardoPinho96" target="_blank"><u>twitter.com/RicardoPinho96</u></a></p>
		<p class="text-lg text-gray-700"><a href="https://twitter.com/tiagomfurtado" target="_blank"><u>twitter.com/tiagomfurtado</u></a></p>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Agradecimentos:</h2>
		<!-- <p class="text-sm text-gray-700">Maria R. Gonçalves, Rui Maciel, Catarina Ribero Lopes, Pedro Gonzalez</p> -->
	</div>

</div>
