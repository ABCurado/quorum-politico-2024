<script lang="ts">
	export let title: string;
	export let official_id: any;
	export let summary: string;
	export let proposal_link: string;
	export let counter: string;
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
		'Projeto de Resolução': 'Iniciativa de Deputados ou grupos parlamentares, que não deva revestir depois de aprovada a forma de lei e que é, em regra, de cariz político.',
		'Projeto de Lei':
			'Iniciativa legislativa apresentada por qualquer Deputado, grupo parlamentar e ainda por grupos de cidadãos eleitores sobre matéria da competência legislativa da Assembleia da República. Não são admitidos projetos que infrinjam a Constituição ou os princípios nela consignados e não definam concretamente o sentido das modificações a introduzir na ordem legislativa. Os Deputados, os grupos parlamentares e os grupos de cidadãos eleitores não podem apresentar projetos de lei que envolvam, no ano económico em curso, aumento das despesas ou diminuição das receitas do Estado previstas no Orçamento.',
		Deliberação: 'Trata-se de uma forma de deliberação em que se prescinde da reunião (vulgo, “assembleia geral”)',
		'⁠Assembleia Universal':
			'Estas assembleias gerais caracterizam-se por serem reuniões em que não foram observadas as formalidades legais relativas à sua convocação, mas em que, estando presentes todos os sócios ou representados todos os sócios e todos manifestando a vontade de que a reunião se constitua como assembleia geral para deliberar sobre determinado ou determinados assuntos, tal é legalmente admissível.',
		'⁠Votação na Generalidade':
			'Fase do processo de tramitação das iniciativas legislativas em que a discussão incide sobre os princípios e o sistema de cada projeto ou proposta de lei. O debate e a votação na generalidade decorrem no Plenário no prazo de 18 reuniões plenárias a contar da aprovação do parecer da comissão competente.',
		'⁠Votação na Especialidade':
			'Fase do processo de tramitação das iniciativas legislativas a seguir à sua aprovação na generalidade. O debate na especialidade é feito, em regra, na comissão competente em razão da matéria, versa sobre cada artigo, ou mais de um artigo simultaneamente, ou, com fundamento na complexidade da matéria ou das propostas de alteração apresentadas, que se faça por números. A requerimento de, pelo menos, 10 Deputados ou de um grupo parlamentar, pode o Plenário deliberar chamar a si a votação na especialidade. Há matérias que são obrigatoriamente votadas na especialidade em Plenário.',
		'Texto de Substituição':
			'Documento que pretende substituir, total ou parcialmente uma iniciativa legislativa, projeto ou proposta de lei, apresentada à Assembleia da República. Qualquer comissão parlamentar permanente pode apresentar textos de substituição, quer em fase de apreciação na generalidade, quer em fase de apreciação na especialidade da iniciativa, sem prejuízo dos projetos e das propostas de lei a que se referem, quando não retirados. O texto de substituição é discutido na generalidade em conjunto com o texto do projeto ou proposta e, finda a discussão, procede-se à votação sucessiva dos textos pela ordem da sua apresentação.'
	};
	let showInfo = false;
</script>

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
		<div class="max-w-4xl mx-auto">
			<h3 class="text-xl sm:text-3xl min-h-12 font-bold mb-4 text-center">
				<span class="underline text-gray-400 cursor-pointer" on:click={() => (showInfo = !showInfo)} on:keydown={() => (showInfo = !showInfo)}>{type}</span>: {title}
			</h3>
			{#if showInfo}
				<div class="fixed inset-0 bg-gray-700 bg-opacity-75 z-10 backdrop-blur">
					<!-- Your content here -->
					<div class="fixed inset-0 z-20 flex items-center justify-center">
						<span class="text-gray-800">{@html glossary[type]}</span>
						<button class="absolute top-4 right-4 text-gray-500 z-30" on:click={() => (showInfo = false)}>Close</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
	<h3 class="text-l sm:text-xl mb-2 text-left">Sumário do {type}:</h3>
	<div class="text-base sm:text-lg mb-2 min-h-52 w-full max-w-4xl p-4 rounded-lg bg-gray-100 summary-text">
		{summary}
	</div>
	<h3 class="text-l sm:text-xl mb-2 text-left">Possíveis contra-argumentos do {type}:</h3>

	<div class="text-base sm:text-lg mb-6 min-h-52 w-full max-w-4xl p-4 border rounded-lg bg-gray-100">
		{@html highlightTitles(counter)}
	</div>

	<a href={proposal_link} target="_blank" class="text-blue-500 underline">Ver documento oficial {official_id} (Votado a {vote_link})</a>
</div>
