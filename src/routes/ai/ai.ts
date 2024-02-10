import { Ai } from '@cloudflare/ai';
import OpenAI from 'openai';

export async function randomPartyDescription(platform: any, party: string) {
    const ai = new Ai(platform?.env.AI);
    // messages - chat style input
    let chat = {
        messages: [
            { role: 'system', content: 'You are a helpful comical assistant that knows about portuguese politics. I will send you a sentiment and a political party and you have to reply a sentente. The response should be a single sentence in Portuguese from Portugal' },
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
        "Democracy",
        "Government",
        "Constitution",
        "Election",
        "Parliament",
        "Legislation",
        "Policy",
        "Diplomacy",
        "Ideology",
        "Power",
        "Civilization",
        "Empire",
        "Revolution",
        "Renaissance",
        "Industrialization",
        "Colonialism",
        "World War",
        "Dynasty",
        "Archaeology",
        "Monarchy",
        "Continent",
        "European Union (EU)",
        "Brexit",
        "Eurozone",
        "Schengen Area",
        "Renaissance",
        "Mediterranean",
        "Baltic States",
        "Balkans",
        "Portugal",
        "Spain",
        "Iberian Peninsula",
        "Lusophone",
        "Latin America",
        "Brazil",
        "Angola",
        "Mozambique",
        "Cape Verde",
        "Guinea-Bissau",
        "East Timor",
        "Macau",
        "Goa",
        "Daman and Diu",
        "Portuguese India",
        "Portuguese Empire",
        "Portuguese language",
        "Portuguese people",
        "Portuguese culture",
    ];
    let randomWords = politics.sort(() => 0.5 - Math.random()).slice(0, 2);
    let chat = {
        prompt: `Return a short and funny sentence about the politics that must contain the following orders ${randomWords.join(', ')}. Only one sentence, nothing else.`,
    };
    // let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
    let response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', chat);
    console.log('response', response);
    let response2 = await ai.run('@cf/meta/m2m100-1.2b', {
        text: response.response,
        source_lang: "english", // defaults to english
        target_lang: "portuguese"
      }
    );
    console.log('response2', response2);
    return response2.response;
}

export async function aiPersonaSummary(platform: any, proposals: [{title:string, vote: number}], winningPartyShortDescription: string) {
    const openai = new OpenAI({
        // apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
        apiKey: "my-key", // This is the default and can be omitted
      });
    const ai = new Ai(platform?.env.AI);
    // messages - chat style input
    console.log('proposals', proposals);
    let content = `
        O partido mais próximo é ${winningPartyShortDescription}. 
        As opinioes sobre as propostas são as seguintes:
            ${proposals.map((proposal) => getVoteDescription(proposal.vote, 'pt') + ' ' + proposal.title).join('\n')}`;
    console.log('content', content);
    let chat = {
        messages: [
            { role: 'system', content: 'És um assistente cómico e útil que conhece a política portuguesa. Vou enviar-te frases com as quais a pessoa concorda ou discorda e tu deves descrever essa pessoa numa ou duas frases curtas.' },
            { role: 'user', content: content }
        ]
    };
    let response = await ai.run('@cf/meta/llama-2-7b-chat-fp16', chat);
    return response.response;
}

function getVoteDescription(vote: number, lang: string): string {
    if (lang === 'pt') {
        if (vote == 1) {
            return "Concorda com";
        } else if (vote == 0) {
            return "Discorda de";
        } else if (vote == 2) {
            return "Não tem opinião sobre";
        } else {
            return "Inválido";
        }
    } else if (lang === 'en') {
        if (vote == 1) {
            return "Agrees with";
        } else if (vote == 0) {
            return "Disagrees with";
        } else if (vote == 2) {
            return "Has no opinion on";
        } else {
            return "Invalid";
        }
    } else {
        return "Invalid language";
    }
}