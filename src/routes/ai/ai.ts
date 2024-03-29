// import { Ai } from '@cloudflare/ai';
import OpenAI from 'openai';
import type { UserVote } from '../../types';

let partyDescriptions = {
	'PS': 'Partido Socialista',
	'PSD': 'Partido Social Democrata',
	'BE': 'Bloco de Esquerda',
	'CDS': 'Centro Democrático Social',
	'PCP': 'Coligação Democrática Unitária',
	'PAN': 'Pessoas Animais Natureza',
	'CH': 'Chega',
	'IL': 'Iniciativa Liberal',
	'L': 'Livre',
}

export async function randomPartyDescription(platform: any, party: string) {
	const ai = new Ai(platform?.env.AI);
	// messages - chat style input
	let chat = {
		messages: [
			{
				role: 'system',
				content:
					'You are a helpful comical assistant that knows about portuguese politics. I will send you a sentiment and a political party and you have to reply a sentente. The response should be a single sentence in Portuguese from Portugal'
			},
			{ role: 'user', content: `Funny PS` }
		]
	};
	let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
	// Do something with the response
	return response.response;
}

export async function randomPolicialSentence(platform: any) {
	const ai = new Ai(platform?.env.AI);
	let politics = [
		'Democracy',
		'Government',
		'Constitution',
		'Election',
		'Parliament',
		'Legislation',
		'Policy',
		'Diplomacy',
		'Ideology',
		'Power',
		'Civilization',
		'Empire',
		'Revolution',
		'Industrialization',
		'Colonialism',
		'War',
		'Continent',
		'European Union (EU)',
		'Brexit',
		'Eurozone',
		'Schengen Area',
		'Mediterranean',
		'Portugal',
		'Spain',
		'Iberian Peninsula',
		'Lusophone',
		'Latin America',
		'Brazil',
		'Angola',
		'Mozambique',
		'Cape Verde',
		'Portuguese India',
		'Portuguese Empire',
		'Portuguese language',
		'Portuguese people',
		'Portuguese culture'
	];
	let randomWords = politics.sort(() => 0.5 - Math.random()).slice(0, 2);
	let chat = {
		prompt: `Return a short and humorous sentence about the politics that could contain the following topics ${randomWords.join(', ')}. You can add historical random facts. Only one sentence, nothing else.`
	};
	// let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
	let response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', chat);
	console.log('response', response);
	let response2 = await ai.run('@cf/meta/m2m100-1.2b', {
		text: response.response,
		source_lang: 'english', // defaults to english
		target_lang: 'portuguese'
	});
	console.log('response2', response2);
	return response2.translated_text;
}

export async function aiPersonaSummary(platform: any, proposals: UserVote[], winningPartyShortDescription: string) {
	const openai = new OpenAI({
		apiKey: platform.env.OPENAI_API_KEY 
	});
	// const ai = new Ai(platform?.env.AI);
	// messages - chat style input
	let systemPrompt =
		`
		O teu objectivo é criar um perfil politico que seja genérico, humoristico e muito divertido sobre uma pessoa. Vou enviar-te frases com as quais a pessoa concorda ou discorda para te ajudar a conheceres a pessoa. Exagera de forma comica, muito divertido. A tua resposta deve ser muito curta e não pode ter mais de 30 palavras. A pessoa dever falar na primeria pessoa. Não menciones nada sem ser a descrição da pessoa. A resposta deve ser em português de Portugal.
		
		Bons exemplos de respostas:
			"Sou um visionário dos tijolos, a transformar ruínas em mansões com IVA baixinho. Educação animal? Mas quem precisa, se o meu cão já tem doutoramento em latim."
			"Sou o tipo que não se interessa por nada, exceto por saber onde fica a próxima manifestação. Se está na rua, estou lá, com o meu cartaz de \"interesse zero\".
			"Sou o provedor dos liberais descomprometidos, o Robin Hood dos tempos modernos mas com uma carteira de ações em vez de um arco. Salários altos, impostos baixos, essa a melodia a que danço."'
			"Sou uma pessoa que vibra com Solidariedade, sempre a levantar o braço por causas. Sonho com um país mais justo, onde até na fila do pão se grita Bloco"
			"Eu sou tipo um super-herói verdem apaixonado por tudo que respira. Defender a natureza é o meu lema, mas sou flexível como um bambu apaixonado por justiça para os jovens aventureiros."
		`;
	let content = `
	    O partido mais alinhado com a pessoa é ${partyDescriptions[winningPartyShortDescription as keyof typeof partyDescriptions]}. 
	    As opiniões desta pessoa são as seguintes:
	    ${proposals.map((proposal) => getVoteDescription(proposal.vote, 'pt') + ' ' + proposal.proposal.title).join('\n')}+'.'`;
	console.log('content', content);
	let chat = {
		messages: [
			{ role: 'system', content: systemPrompt },
			{ role: 'user', content: content }
		]
	};
	
	// let response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', chat);
	const chatCompletion = await openai.chat.completions.create({
		messages: chat.messages,
		model: 'gpt-4-turbo-preview'
	});
	console.log('chatCompletion', chatCompletion.choices[0].message.content);
	return chatCompletion.choices[0].message.content;
}

function getVoteDescription(vote: string, lang: string): string {
	if (lang === 'pt') {
		if (vote === '1') {
			return 'Concorda com';
		} else if (vote === '0') {
			return 'Discorda de';
		} else if (vote === '2') {
			return 'Não se interessa por';
		} else {
			return 'Inválido';
		}
	} else if (lang === 'en') {
		if (vote === '1') {
			return 'Agrees with';
		} else if (vote === '0') {
			return 'Disagrees with';
		} else if (vote === '2') {
			return 'Doesnt care about';
		} else {
			return 'Invalid';
		}
	} else {
		return 'Invalid language';
	}
}
