import { Ai } from '@cloudflare/ai';
import type { RequestHandler } from '@sveltejs/kit';

// A get route that returns information about a specific party
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ platform, url }) => {
	const ai = new Ai(platform?.env.AI);
	// messages - chat style input
	let chat = {
		messages: [
			{ role: 'system', content: 'You are a helpful assistant.' },
			{ role: 'user', content: 'Who won the world series in 2020?' }
		]
	};
	let response = await ai.run('@cf/meta/llama-2-7b-chat-int8', chat);
	console.log('response.outputs', response);
	return new Response(JSON.stringify(chat, response), { headers: { 'Content-Type': 'application/json' } });
};
