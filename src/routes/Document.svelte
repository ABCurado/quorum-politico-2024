<script lang="ts">
	import { Modal } from 'flowbite-svelte';

	export let title_reduced: string;
	export let summary_reduced: string;
	export let counter_reduced: string;
	
	export let official_id: any;
	export let proposal_link: string;
	export let type: string;
	export let vote_link: string;
	export let tag_1: string;
	export let tag_2: string;

	function highlightTitles(text) {
		return text
			.split('\n')
			.map((point) => {
				if (/^\d+\./.test(point)) {
					return `<p class="font-bold">${point.split(':')[0]}</p>${point.split(':')[1]}`;
				} else {
					return `<p>${point}</p>`;
				}
			})
			.join('');
	}
	const glossary = {
		Deliberação: 'Trata-se de uma forma de deliberação em que se prescinde da reunião (vulgo, “assembleia geral”)',
		'Moção de Censura':
			'É um instrumento de fiscalização típico de sistemas em que o Governo é responsável perante o Parlamento, visa reprovar a execução do Programa do Governo ou a gestão de assunto de relevante interesse nacional. Pode ser apresentada por um quarto dos Deputados em efetividade de funções ou por qualquer grupo parlamentar. A sua aprovação requer a maioria absoluta dos Deputados em efetividade de funções (número de votos superior a metade dos Deputados em efetividade de funções) e provoca a demissão do Governo;',
		'Projeto de Lei':
			'Iniciativa legislativa apresentada por qualquer Deputado, pelo grupo parlamentar ou ainda por grupos de cidadãos eleitores sobre matéria da competência legislativa da Assembleia da República. Não são admitidos nem projetos que infrinjam a Constituição ou os princípios nela consignados e não definam concretamente o sentido das modificações a introduzir na ordem legislativa, nem projetos de lei que envolvam, no ano económico em curso, aumento das despesas ou diminuição das receitas do Estado previstas no Orçamento.',
		'Projeto de Resolução': 'Os projetos de resolução são destinados a regular as matérias da competência privativa da Assembleia e as de caráter político, processual, legislativo ou administrativo.',
		'Reapreciação de Decreto':
			'O decreto que seja objecto de reformulação ou de expurgo das normas inconstitucionais pode, se a Assembleia assim o deliberar, voltar à comissão parlamentar competente para efeito de redacção final',
		'Votação Final na Especialidade Global':
			'Fase do processo de tramitação das iniciativas legislativas a seguir à sua aprovação na generalidade. O debate na especialidade é feito, em regra, na comissão competente em razão da matéria, versa sobre cada artigo, ou mais de um artigo simultaneamente, ou, com fundamento na complexidade da matéria ou das propostas de alteração apresentadas, que se faça por números. A requerimento de, pelo menos, 10 Deputados ou de um grupo parlamentar, pode o Plenário deliberar chamar a si a votação na especialidade. Há matérias que são obrigatoriamente votadas na especialidade em Plenário.',
		'Votação na Generalidade':
			'Fase do processo de tramitação das iniciativas legislativas em que a discussão incide sobre os princípios e o sistema de cada projeto ou proposta de lei. O debate e a votação na generalidade decorrem no Plenário no prazo de 18 reuniões plenárias a contar da aprovação do parecer da comissão competente.',
		'Voto de Saudação':
			'Manifestação de congratulação, protesto, condenação, saudação, solidariedade, preocupação ou pesar que pode ser proposta pela Mesa, pelos grupos parlamentares ou por Deputados. A discussão e votação dos projetos de voto apresentados pelo Presidente da Assembleia da República são feitas, em regra, no início de cada período regimental de votações, dispondo cada grupo parlamentar de dois minutos e cada Deputado único representante de um partido de um minuto para uso da palavra. ',
		'Voto de Solidariedade':
			'Manifestação de congratulação, protesto, condenação, saudação, solidariedade, preocupação ou pesar que pode ser proposta pela Mesa, pelos grupos parlamentares ou por Deputados. A discussão e votação dos projetos de voto apresentados pelo Presidente da Assembleia da República são feitas, em regra, no início de cada período regimental de votações, dispondo cada grupo parlamentar de dois minutos e cada Deputado único representante de um partido de um minuto para uso da palavra. '
	};
	let showInfo = false;
</script>

{#if showInfo}
	<Modal title={type} bind:open={showInfo} autoclose outsideclose size="xs">
		{@html glossary[type]}
	</Modal>
{/if}

<div class="flex flex-col items-center p-4 w-full sm:p-0">
	<div class="flex flex-row flex-wrap mb-2">
		<div class="bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
			{tag_1}
		</div>
		<div class="bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
			{tag_2}
		</div>
	</div>
	<div class="max-w-4xl mx-auto">
		<h3 class="text-xl sm:text-3xl min-h-12 font-bold text-center">
			<span
				role="button"
				tabindex="0"
				class="underline text-gray-600 cursor-pointer decoration-dashed decoration-2 decoration-slate-400 hover:decoration-slate-600 underline-offset-2"
				on:click={() => (showInfo = !showInfo)}
				on:keydown={() => (showInfo = !showInfo)}>{type}</span
			>: {title_reduced}
		</h3>
	</div>
	<div class="text-base sm:text-lg mb-2 min-h-52 w-full max-w-4xl p-4 rounded-lg bg-gray-100 summary-text">
		{summary_reduced}
	</div>

	<h3 class="text-l sm:text-xl mb-2 font-semibold">Riscos e Críticas:</h3>
	<div class="text-base sm:text-lg mb-6 min-h-52 w-full max-w-4xl p-4">
		{@html highlightTitles(counter_reduced)}
	</div>

	<a href={proposal_link} target="_blank" class="text-blue-500 underline">Ver documento oficial {official_id} (Votado a {vote_link})</a>
</div>
