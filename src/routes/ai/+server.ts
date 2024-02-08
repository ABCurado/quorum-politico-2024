import { Ai } from '@cloudflare/ai';
import type { RequestHandler } from '@sveltejs/kit';

// A get route that returns information about a specific party
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ platform, url }) => {
    let party = url.searchParams.get('party');

	const ai = new Ai(platform?.env.AI);
	// messages - chat style input
	let chat = {
		messages: [
			{ role: 'system', content: 'You are a helpful comical assistant that knows about portuguese politics. I will send you a sentiment and a political party and you have to reply a sentente. The response should be a single sentence in Portuguese from Portugal' },
			{ role: 'user', content: `Funny ${party}` }
		]
	};
	let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
	console.log('response.outputs', response);
	return new Response(JSON.stringify(response), { headers: { 'Content-Type': 'application/json' } });
};
