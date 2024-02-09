import type { RequestHandler } from '@sveltejs/kit';
import { runAi } from './ai';

// A get route that returns information about a specific party
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ platform, url }) => {
    let party = url.searchParams.get('party');

    if (!party) {
        return new Response(JSON.stringify({ error: 'Party name is required' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    if (party.length > 12) {
        return new Response(JSON.stringify({ error: 'Party name should not exceed 12 characters' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    let response = runAi(platform, party);
    console.log('response.outputs', response);
    return new Response(JSON.stringify(response), { headers: { 'Content-Type': 'application/json' } });
};
