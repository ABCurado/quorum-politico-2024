<script>
	import Hemicycle from '../Hemicycle.svelte';
	import { IconArrowBack, IconBrandTwitterFilled } from '@tabler/icons-svelte';
	import { onMount } from 'svelte';

	let goBack = () => {
		window.history.back();
	};

	let feedback = '';

	function submitFeedback() {
		// Send track event to Mixpanel
		// Replace 'YOUR_EVENT_NAME' with the actual event name
		mixpanel.track('Commented', { feedback });

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
				Uma iniciativa apartidária que procura proporcionar aos cidadãos a oportunidade de votar diretamente em propostas parlamentares, visando uma compreensão mais clara de qual partido melhor
				representa suas ideias.
			</p>
			<p class="mt-2 text-base text-gray-700">
				Desconsideramos agendas políticas, afiliações partidárias, discursos em entrevistas e promessas eleitorais. O nosso objetivo é avaliar de maneira objetiva como cada partido exerce seu poder de
				voto e representa os interesses da sociedade.
			</p>
		</div>
	</div>

	<div class="space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Como funciona:</h2>
		<div class="space-y-2">
			<p class="mt-2 text-base text-gray-700">
				Apresentamos 15 propostas parlamentares, permitindo que simules ser teu próprio representante partidário ao votar a favor, contra ou abster-se. Em cada proposta, fornecemos a motivação do
				partido proponente, bem como possíveis riscos e críticas associados. Nosso objetivo é destacar que mesmo propostas aparentemente óbvias têm impactos diretos e indiretos que demandam
				consideração, discussão e mitigação - aspectos muitas vezes ausentes nas propostas partidárias convencionais. Ao final, revelamos o partido que mais se alinha ao teu padrão de voto e
				oferecemos a oportunidade de refazer a votação selecionando teus temas preferidos. Além disso, disponibilizamos documentos oficiais de cada proposta e mostramos como cada partido votou nas
				propostas em que participaste através de links diretos associados.
			</p>
			<p class="mt-2 text-base text-gray-700">
				Reunimos um total de 62 propostas parlamentares desde janeiro de 2023, considerando sempre as versões mais recentes. Na seleção, levamos em conta três fatores: unanimidade, uniformidade e
				simplicidade. Descartamos propostas demasiado técnicas. Atribuímos pontos à tua correlação com um partido a cada voto coincidente e subtraímos pontos em caso de votos totalmente divergentes.
				Abstenções versus votos a favor também atribui meio ponto à correlação.
			</p>
			<p class="mt-2 text-base text-gray-700">Sem a necessidade de criar uma conta e sem armazenamento de dados pessoais, nosso projeto é transparente e acessível.</p>
			<p class="mt-2 text-base text-gray-700">Para mais detalhes, o código do projeto está disponível no <a href="https://github.com/ABCurado/em-quem-votar-2023" target="_blank"><u>GitHub</u></a>.</p>
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
				a opção de receber sugestões.
			</li>
			<li>
				Apesar da representatividade das propostas recolhidas, cada seleção individual de 15 propostas pode estar enviesada para determinados temas ou ser maioritariamente de partidos de um espetro
				político.
			</li>
			<li>Esta ferramenta não substitui a leitura dos programas eleitorais como preparação do voto (até porque só inclui partidos com representação parlamentar).</li>
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
		<p class="text-sm text-gray-700">Maria R. Gonçalves, Matilde P. Aires, Rui Maciel, Catarina Ribeiro Lopes, Pedro Gonzalez, Bernardo Peixoto Silva, Filipe Furtado.</p>
	</div>

	<div class="mt-8 space-y-4">
		<h2 class="text-2xl font-bold text-gray-700">Ajuda-nos a melhorar o projeto:</h2>
		<form on:submit|preventDefault={submitFeedback}>
			<div class="flex items-center space-x-4">
				<textarea class="rounded-md border bg-slate-100 border-gray-300 px-4 p-4 focus:outline-none focus:ring-2 focus:ring-slate-500 w-full" bind:value={feedback} placeholder="A tua opinião"></textarea>
			</div>
			<div class="flex justify-end">
				<button type="submit" class="rounded-md mt-4 bg-slate-500 px-4 py-2 font-bold text-white hover:bg-slate-600">Submeter</button>
			</div>
			</form>
	</div>
</div>
