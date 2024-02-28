<script>
	import Hemicycle from '../Hemicycle.svelte';
	import { IconArrowBack, IconBrandTwitterFilled } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';
	import mixpanel from 'mixpanel-browser';

	let goBack = () => {
		window.history.back();
	};

	let feedback = '';
	let isSubmitted = false;

	function submitFeedback() {
		// Send track event to Mixpanel
		// Replace 'YOUR_EVENT_NAME' with the actual event name
		mixpanel.track('Commented', { feedback });
		isSubmitted = true;

		// Clear the feedback input
		feedback = '';
	}

	onMount(() => {
		// Initialize Mixpanel
		// Replace 'YOUR_MIXPANEL_TOKEN' with your actual Mixpanel token
		mixpanel.init('YOUR_MIXPANEL_TOKEN');
	});
</script>

<div class="absolute left-4 top-4 cursor-pointer">
	<button on:click={goBack} type="button">
		<IconArrowBack class="text-gray-700" size={48} />
	</button>
</div>

<div class="m-4 flex w-full justify-center">
	<Hemicycle random={true} />
</div>

<div class="relative mx-auto w-10/12 space-y-8 py-3 sm:mx-auto">
	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Quórum Político:</h2>
		<div class="space-y-2">
			<p class="mt-2 text-base text-gray-700">
				<li>
					Uma iniciativa apartidária que procura proporcionar aos cidadãos a oportunidade de votar diretamente em propostas parlamentares, trazendo uma abordagem mais objetiva na decisão do partido que melhor representa as suas ideias.
				</li>
				<li>
					Desconsideramos agendas políticas, afiliações partidárias, discursos em entrevistas e promessas eleitorais.
				</li>
			</p>
		</div>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Como funciona:</h2>
		<div class="space-y-2">
			<p class="mt-2 text-base text-gray-700">
				<li>
					Reunimos 67 propostas parlamentares apresentadas desde Janeiro de 2023 (fonte: <a href="https://www.parlamento.pt/ArquivoDocumentacao/Paginas/Arquivodevotacoes.aspx" target="_blank"><u>Arquivo de Votações do Parlamento</u></a>) onde desconsideramos propostas demasiado técnicas (ex: pequenas alterações legislativas difíceis de enquadrar) e propostas unânimes que não ajudam a fazer distinção entre partidos (ex: pesar pelo falecimento da Maria Odete dos Santos apresentada a 2024/01/05).
				</li>
				<li>
					Destas apresentamos 15 (inicialmente), permitindo que cada pessoa simule o seu voto (a favor, contra, ou abstenção). Cada proposta é acompanhada por um breve sumário (resumido do documento oficial apresentado pelo partido) e por possíveis riscos/críticas associadas (criadas por nós e em aberto para serem complementadas pela comunidade). O grande objetivo é destacar que mesmo propostas aparentemente óbvias têm impactos diretos e indiretos que obrigam a consideração, discussão e mitigação - aspetos muitas vezes ausentes nas propostas partidárias convencionais.
				</li>
				<li>
					No final, conseguimos revelar que partido mais se alinha com os votos - cada voto coincidente vale +1 e cada voto divergente (i.e.: tu contra e partido a favor, ou vice-versa) vale -1. Há a possibilidade de ir prolongando o quiz (+10 perguntas de cada vez) para aumentar a precisão do resultado.
				</li>
				<li>
					Sem a necessidade de criar uma conta e sem armazenamento de dados pessoais, nosso projeto é transparente e acessível.
				</li>
				<li>
					Para mais detalhes, o código do projeto está disponível no <a href="https://github.com/ABCurado/quorum-politico-2024" target="_blank"><u>GitHub</u></a>.
				</li>
			</p>
		</div>
	</div>

	<div class="mt-8 space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Limitações:</h2>
		<ul class="mt-4 list-inside list-disc space-y-2 text-base text-gray-700">
			<li>
				Votos contra dos partidos nem sempre se prendem com divergências com a motivação da proposta em si, mas sim em alguma discordância no plano de implementação ou salvaguardas legislativas que
				acham necessárias. Isto pode levar a que alguns votos não sigam a doutrina ideológica do partido.
			</li>
			<li>
				Riscos e críticas foram predominantemente elaborados por nós. Apesar da nossa abordagem apartidária, é possível que revelem algum enviesamento. Procurámos mitigar este enviesamento ao facultar
				a opção de receber sugestões da comunidade.
			</li>
			<li>
				Tentamos ter representatividade nas propostas recolhidas a nível de espetro político (24 de partidos de esquerda, 21 de direita, 22 do bloco central) e de temas. No entanto nada impede uma pessoa que responda 2x (com um seleção de perguntas diferente) de ter resultados completamente antagónicos.
			</li>
			<li>
				Esta ferramenta não substitui a leitura dos programas eleitorais como preparação do voto (até porque só inclui partidos com representação parlamentar).
			</li>
		</ul>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Para sugestões, elogios ou reclamações:</h2>
		<button class="flex items-center text-base text-gray-700" on:click={() => window.open('https://twitter.com/ab_curado', '_blank')}>
			<IconBrandTwitterFilled class="mr-1" size={16} />
			<span>Antonio B Curado</span>
		</button>
		<button class="flex items-center text-base text-gray-700" on:click={() => window.open('https://twitter.com/RicardoPinho96', '_blank')}>
			<IconBrandTwitterFilled class="mr-1" size={16} />
			<span>Ricardo Pinho</span>
		</button>
		<button class="flex items-center text-base text-gray-700" on:click={() => window.open('https://twitter.com/tiagomfurtado', '_blank')}>
			<IconBrandTwitterFilled class="mr-1" size={16} />
			<span>Tiago Furtado</span>
		</button>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Agradecimentos:</h2>
		<p class="text-sm text-gray-700">Maria G. Ribeiro, Matilde P. Aires, Rui Maciel, Catarina Ribeiro Lopes, Pedro Gonzalez, Bernardo Peixoto Silva, Filipe Furtado.</p>
	</div>

	<div class="mt-8 space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Ajuda-nos a melhorar o projeto:</h2>
		<div class="relative mx-auto space-y-8 sm:mx-auto">
			{#if !isSubmitted}
				<form on:submit|preventDefault={submitFeedback}>
					<div class="flex items-center space-x-4">
						<textarea class="rounded-md border bg-slate-100 border-gray-300 px-4 p-4 focus:outline-none focus:ring-2 focus:ring-slate-500 w-full" bind:value={feedback} placeholder="A tua opinião"></textarea>
					</div>
					<div class="flex justify-end">
						<button type="submit" class="rounded-md mt-4 bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-600">Submeter</button>
					</div>
				</form>
			{/if}
			
			{#if isSubmitted}
				<p class="text-base text-gray-700">Obrigado pelo teu feedback!</p>
			{/if}
		</div>
	</div>
</div>
