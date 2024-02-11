import type { RequestHandler } from '@sveltejs/kit';
import db from '../proposals/proposals_db.json';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ request, platform, url, params }) => {
    const tags = db.map((item: any) => [item.tag_1]).flat();
    const uniqueTags = [...new Set(tags)];
    const tagCounts: { [tag: string]: number } = {};

    for (const tag of uniqueTags) {
        tagCounts[tag] = db.filter((item: any) => item.tag_1 === tag).length;
    }

    return new Response(JSON.stringify(tagCounts), { headers: { 'Content-Type': 'application/json' } });
};
