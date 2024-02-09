import { Ai } from '@cloudflare/ai';

export async function runAi(platform: any, party: string) {
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
        prompt: `Return a short and funny sentence about the politics that must contain the following orders ${randomWords.join(', ')}. The answer must be in Portuguese. Only one sentence, nothing else. Do not return the english version of the sentence.`,
    };
    let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
    console.log('response', response);
    // Do something with the response
    return response.response;
}
