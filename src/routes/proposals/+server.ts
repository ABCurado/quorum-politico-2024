import { abstainingParties, aprovingParties, finalResultMapping, rejectingParties } from '../../dbAbstraction';

import type { Proposal } from '../../types'; // Import the Proposal type
import type { RequestHandler } from '@sveltejs/kit';
import db from './proposals_db.json';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ request, platform, url }) => {
	const tags = url.searchParams.get('tags')?.split(',') ?? [];
	const pageSize: number = Number(url.searchParams.get('pageSize') ?? 10);
	const excludeIds: string[] = url.searchParams.get('exlcudeIds')?.split(",") ?? [];

	// Filter proposals atribute by tags
	let filteredProposals = db
	if (tags.length > 0) {
		filteredProposals = filteredProposals.filter((proposal) => {
			return tags.some((tag: string) => {
				return proposal.tag_1 === tag;
			});
		});
	}
	
	// Exclude proposals by id
	filteredProposals = filteredProposals.filter((proposal) => {
		return !excludeIds.includes(proposal.official_id);
	});

	// Randomize the order of filtered proposals
	const randomizedProposals = filteredProposals.sort(() => Math.random() - 0.5);
	
	// Paginate the randomized proposals
	let paginatedProposals = randomizedProposals.slice(0, pageSize);
	
	return new Response(
		JSON.stringify({
			proposals: paginatedProposals,
			total: filteredProposals.length,
			pageSize
		}),
		{ headers: { 'Content-Type': 'application/json' } }
	);
};
