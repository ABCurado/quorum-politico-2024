import { FooterLink } from 'flowbite-svelte';
import type { RequestHandler } from '@sveltejs/kit';
import db from '../party/party_db.json';

type PartyInfo = {
	party: string | undefined;
	link: string | undefined;
	proposals: string[];
};
// A get route that returns information about a specific party
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ url }) => {
	try {
		const parties: Array<{ party: string; link: string; rank: string; text: string; length: string }> = db.filter((item: any) => item.party === url.searchParams.get('party')) || [];
		const partyInfo: PartyInfo = {
			party: parties[0]?.party,
			link: parties[0]?.link,
			proposals: parties.map((item: any) => item.text)
		};
		return new Response(JSON.stringify(partyInfo), { headers: { 'Content-Type': 'application/json' } });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'An error occurred' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
	}
};
