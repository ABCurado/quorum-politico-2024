import { aiPersonaSummary, randomPolicialSentence } from './ai';

import type { RequestHandler } from '@sveltejs/kit';

// A get route that returns information about a specific party
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ platform, url }) => {
    let response = await randomPolicialSentence(platform);

    return new Response(JSON.stringify({"response": response}), { headers: { 'Content-Type': 'application/json' } });
};

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST: RequestHandler = async ({ request,  platform, url }) => {
    let body = await request.json();

    let proposals = body.proposals;
    let winningPartyShortDescription = body.winningPartyShortDescription;

    let response = await aiPersonaSummary(platform, proposals, winningPartyShortDescription);

    return new Response(JSON.stringify({"response": response}), { headers: { 'Content-Type': 'application/json' } });
};

