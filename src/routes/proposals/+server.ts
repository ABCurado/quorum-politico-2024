import type { Proposal } from './types'; // Import the Proposal type
import type { RequestHandler } from '@sveltejs/kit';
import db from './db.json';

// The /proposals route can be filtered by tag
// The /proposals route can be filtered by search term
// The /proposals route can be filtered by tag and number of records

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ request, platform, url }) => {
	const tags = url.searchParams.get('tags')?.split(',') ?? [];
	const pageSize: number = Number(url.searchParams.get('pageSize') ?? 10);

	// console.log(db);
	// Filter proposals atribute tag_1 and tag_2 by tags
	const filteredProposals = db.filter((proposal: Proposal) => {
		return tags.some((tag: string) => {
			return proposal.tag_1 === tag || proposal.tag_2 === tag;
		});
	});

	// Randomize the order of filtered proposals
	const randomizedProposals = filteredProposals.sort(() => Math.random() - 0.5);
	// Paginate the randomized proposals
	let paginatedProposals = randomizedProposals.slice(0, pageSize - 1);
	const easter_egg = db.filter((proposal: Proposal) => {
		// Use the Proposal type
		return tags.some((tag: string) => {
			return proposal.official_id == '3/XV-2';
		});
	});
	paginatedProposals = [...paginatedProposals, ...easter_egg];

	return new Response(
		JSON.stringify({
			proposals: paginatedProposals,
			total: filteredProposals.length,
			pageSize
		}),
		{ headers: { 'Content-Type': 'application/json' } }
	);
};
