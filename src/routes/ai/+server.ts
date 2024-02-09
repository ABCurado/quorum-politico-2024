import type { RequestHandler } from '@sveltejs/kit';
import { randomPolicialSentence } from './ai';

// A get route that returns information about a specific party
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ platform, url }) => {
    let response = await randomPolicialSentence(platform);
    console.log('response.outputs', response);
    return new Response(JSON.stringify({"response": response}), { headers: { 'Content-Type': 'application/json' } });
};
