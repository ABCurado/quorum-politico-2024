<script lang="ts">
	import { Modal } from 'flowbite-svelte';
	import { IconHelpHexagonFilled } from '@tabler/icons-svelte';
	import type { Proposal, Glossary } from '../types';

	export let proposal_document: Proposal;

	let title_reduced = proposal_document.title;
	let summary_reduced = proposal_document.description;
	let counter_reduced = proposal_document.counter_arguments;
	let official_id = proposal_document.official_id;
	let proposal_link = proposal_document.proposalLink;
	let type = proposal_document.type;
	let vote_link = proposal_document.vote_link;
	let tag = proposal_document.category;

	function highlightTitles(text: string) {
		return text
			.split('\n')
			.map((point, index, array) => {
				if (/^\d+\./.test(point)) {
					return `<p class="font-bold">${point.split(':')[0]}</p>${point.split(':')[1]}`;
				} else {
					return `<p>${point}</p>${index < array.length - 1 && /^\d+\./.test(array[index + 1]) ? '' : '<br>'}`;
				}
			})
			.join('');
	}

	function transformBulletsToHTML(text: string) {
		return text
			.split('\n')
			.map((line) => {
				if (line.startsWith('- ')) {
					return `<li class="list-disc ml-4">${line.slice(2)}</li>`;
				} else if (line.endsWith(':')) {
					return `${line}<br><br>`;
				} else {
					return line;
				}
			})
			.join('\n');
	}

	function set_category(g: Glossary[], t: string) {
		for (let gloss of g) {
			if (t === gloss.category) {
				return gloss.description;
			}
		}
	}

	let glossary: Glossary[] = [
		{ category: 'Deliberação', description: 'Trata-se de uma forma de deliberação em que se prescinde da reunião (vulgo, “assembleia geral”)' },
		{
			category: 'Moção de censura',
			description:
				'Instrumento de fiscalização típico de sistemas em que o Governo é responsável perante o Parlamento, visa reprovar a execução do Programa do Governo ou a gestão de assunto de relevante interesse nacional. Pode ser apresentada por um quarto dos Deputados em efetividade de funções ou por qualquer grupo parlamentar. A sua aprovação requer a maioria absoluta dos Deputados em efetividade de funções (número de votos superior a metade dos Deputados em efetividade de funções) e provoca a demissão do Governo.'
		},
		{
			category: 'Projeto de Lei',
			description:
				'Iniciativa legislativa apresentada por qualquer Deputado, pelo grupo parlamentar ou ainda por grupos de cidadãos eleitores sobre matéria da competência legislativa da Assembleia da República. Não são admitidos nem projetos que infrinjam a Constituição ou os princípios nela consignados e não definam concretamente o sentido das modificações a introduzir na ordem legislativa, nem projetos de lei que envolvam, no ano económico em curso, aumento das despesas ou diminuição das receitas do Estado previstas no Orçamento.'
		},
		{ category: 'Projeto de Resolução', description: 'Destinado a regular as matérias da competência privativa da Assembleia e as de caráter político, processual, legislativo ou administrativo.' },
		{
			category: 'Reapreciação de Decreto',
			description:
				'O decreto que seja objecto de reformulação ou de expurgo das normas inconstitucionais pode, se a Assembleia assim o deliberar, voltar à comissão parlamentar competente para efeito de redacção final.'
		},
		{
			category: 'Votação Final na Especialidade Global',
			description:
				'Fase do processo de tramitação das iniciativas legislativas a seguir à sua aprovação na generalidade. O debate na especialidade é feito, em regra, na comissão competente em razão da matéria, versa sobre cada artigo, ou mais de um artigo simultaneamente. A requerimento de, pelo menos, 10 Deputados ou de um grupo parlamentar, pode o Plenário deliberar chamar a si a votação na especialidade. Há matérias que são obrigatoriamente votadas na especialidade em Plenário.'
		},
		{
			category: 'Votação na Generalidade',
			description:
				'Fase do processo de tramitação das iniciativas legislativas em que a discussão incide sobre os princípios e o sistema de cada projeto ou proposta de lei. O debate e a votação na generalidade decorrem no Plenário no prazo de 18 reuniões plenárias a contar da aprovação do parecer da comissão competente.'
		},
		{
			category: 'Voto de Saudação',
			description:
				'Manifestação de congratulação, protesto, condenação, saudação, solidariedade, preocupação ou pesar que pode ser proposta pela Mesa, pelos grupos parlamentares ou por Deputados. A discussão e votação dos projetos de voto apresentados pelo Presidente da Assembleia da República são feitas, em regra, no início de cada período regimental de votações, dispondo cada grupo parlamentar de dois minutos e cada Deputado único representante de um partido de um minuto para uso da palavra.'
		},
		{
			category: 'Voto de Solidariedade',
			description:
				'Manifestação de congratulação, protesto, condenação, saudação, solidariedade, preocupação ou pesar que pode ser proposta pela Mesa, pelos grupos parlamentares ou por Deputados. A discussão e votação dos projetos de voto apresentados pelo Presidente da Assembleia da República são feitas, em regra, no início de cada período regimental de votações, dispondo cada grupo parlamentar de dois minutos e cada Deputado único representante de um partido de um minuto para uso da palavra.'
		}
	];
	let showInfo = false;
</script>

{#if showInfo}
	<Modal title={type} bind:open={showInfo} autoclose outsideclose size="xs">
		{@html set_category(glossary, type)}
	</Modal>
{/if}

<div class="mb-20 mt-4 flex w-full flex-col items-center rounded-2xl bg-slate-50 bg-opacity-80 p-4 shadow-2xl sm:mb-4 sm:w-8/12  md:w-10/12 lg:w-8/12">
	<div class="items-center sm:w-8/12 flex w-full flex-col md:w-9/12 lg:w-8/12">
		<div class="mb-2 mt-6 flex flex-row flex-wrap">
			<div class="mb-2 inline-block rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">
				{tag}
			</div>
		</div>
		<div
			role="button"
			tabindex="0"
			class="mb-4 cursor-pointer text-center text-sm text-slate-600 underline decoration-slate-400 decoration-dashed decoration-2 underline-offset-2 opacity-75 hover:decoration-slate-600"
			on:click={() => (showInfo = !showInfo)}
			on:keydown={() => (showInfo = !showInfo)}
		>
			{type}
			<p style="display: inline;">(o que é?)</p>
		</div>
		<div class="mx-auto max-w-4xl">
			<h3 class="mb-2 min-h-12 text-center text-2xl font-bold text-slate-800 sm:mb-6 sm:text-4xl">
				{title_reduced}
			</h3>
		</div>
		<div class="summary-text mb-4 min-h-52 w-full max-w-4xl rounded-md bg-white p-4 text-base shadow-md sm:p-8 sm:text-lg">
			{@html transformBulletsToHTML(summary_reduced)}
		</div>

		<h3 class="mb-2 text-xl font-semibold text-slate-800 sm:text-2xl">Riscos e Críticas:</h3>

		<div class="mb-4 cursor-pointer text-center text-sm text-slate-600 underline decoration-slate-400 decoration-dashed decoration-2 underline-offset-2 opacity-75 hover:decoration-slate-600">
			<a href="https://forms.gle/kT4ktnhZtRppQVon8" target="_blank"> Esquecemo-nos de algum? </a>
		</div>

		<div class="mb-6 min-h-52 w-full max-w-4xl rounded-md bg-white p-4 text-base shadow-md sm:text-lg">
			{@html highlightTitles(counter_reduced)}
		</div>

		<a href={proposal_link} target="_blank" class="text-xs text-blue-500 underline mb-4 sm:text-base">Ver documento oficial {official_id} (Votado a {vote_link})</a>
	</div>
</div>
