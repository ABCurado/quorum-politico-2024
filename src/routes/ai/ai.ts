// import { Ai } from '@cloudflare/ai';
import OpenAI from 'openai';

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
	console.log('response', response);
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

export async function aiPersonaSummary(platform: any, proposals: [{ title: string; vote: number }], winningPartyShortDescription: string) {
	const openai = new OpenAI({
		// apiKey: platform.env.OPENAI_API_KEY'], // This is the default and can be omitted
		apiKey: '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'// This is the default and can be omitted
	});
	// const ai = new Ai(platform?.env.AI);
	// messages - chat style input
	console.log('proposals', proposals);

	let systemPrompt =
		'O teu objectivo é criares um perfil muito generico e humoristico sobre uma pessoa. Vou enviar-te frases com as quais a pessoa concorda ou discorda para te ajudar a conheceres a pessoa. Exagera na descrição de forma comica. A tua resposta não pode ter mais de 3 pequenas frases e a pessoa dever falar na primeria pessoa. Não menciones nada sem ser a descrição da pessoa. A resposta deve ser em português de Portugal.';
	let content = `
        O partido mais alinhado é o ${winningPartyShortDescription}. 
        As opinioes desta pessoa são as seguintes:
		${proposals.map((proposal) => getVoteDescription(proposal.vote, 'pt') + ' ' + proposal.title).join('\n')}`;
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
		model: 'gpt-3.5-turbo'
	});
    console.log('chatCompletion', chatCompletion.choices[0].message.content);
	return chatCompletion.choices[0].message.content;
}

function getVoteDescription(vote: number, lang: string): string {
	if (lang === 'pt') {
		if (vote == 1) {
			return 'Concorda com';
		} else if (vote == 0) {
			return 'Discorda de';
		} else if (vote == 2) {
			return 'Não se interessa por';
		} else {
			return 'Inválido';
		}
	} else if (lang === 'en') {
		if (vote == 1) {
			return 'Agrees with';
		} else if (vote == 0) {
			return 'Disagrees with';
		} else if (vote == 2) {
			return 'Doesnt care about';
		} else {
			return 'Invalid';
		}
	} else {
		return 'Invalid language';
	}
}
