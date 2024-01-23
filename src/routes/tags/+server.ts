import type { RequestHandler } from '@sveltejs/kit';
import db from '../proposals/db.json';

// A get route that returns for 2 urls. One called /tags another called /proposals
// The /tags route returns a list of tags, the /proposals route returns a list of proposals
// The /proposals route can be filtered by tag
// The /proposals route can be filtered by search term
// The /proposals route can be filtered by tag and search term and page number

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ request, platform, url, params }) => {
    const tags = db.map((item: any) => [item.tag_1, item.tag_2]).flat();
    const uniqueTags = [...new Set(tags)];
    const tagCounts: { [tag: string]: number } = {};

    for (const tag of uniqueTags) {
        tagCounts[tag] = db.filter((item: any) => item.tag_1 === tag || item.tag_2 === tag).length;
    }

    return new Response(JSON.stringify(tagCounts), { headers: { 'Content-Type': 'application/json' } });
};
