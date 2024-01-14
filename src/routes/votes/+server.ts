import type { RequestHandler } from "@sveltejs/kit";

// ┌─────┬───────────┬─────────┬─────────┬────────────┬────┐
// │ cid │ name      │ type    │ notnull │ dflt_value │ pk │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 0   │ device_id │ INTEGER │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 1   │ env       │ TEXT    │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 2   │ results   │ BLOB    │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 3   │ top_party │ TEXT    │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 4   │ agrees    │ INTEGER │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 5   │ _created  │ TEXT    │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 6   │ _updated  │ TEXT    │ 0       │            │ 0  │
// └─────┴───────────┴─────────┴─────────┴────────────┴────┘
interface Vote {
    device_id: number;
    env: string;
    results: Buffer;
    top_party: string;
    agrees: number;
    _created: string;
    _updated: string;
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ request, platform }) {
    let result = await platform?.env.DB.prepare(
        "SELECT * FROM votes"
    ).run();
    return new Response(JSON.stringify(result));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, platform }) {
    try {
        let body = await request.json();

        // Input validation
        if (!body.device_id || !body.results || !body.top_party) {
            return new Response('Invalid input', { status: 400 });
        }

        // TODO: Add rate limiting and authentication here

        let result = await platform?.env.DB.prepare(
            "INSERT INTO votes (device_id, env, results, top_party,  _created, _updated) VALUES (@device_id, @env, @results, @top_party, @created, @updated)"
        ).run({
            "@device_id": body.device_id,
            "@env": platform?.env.ENV,
            "@results": body.results,
            "@top_party": body.top_party,
            "@created": new Date().toISOString(),
            "@updated": new Date().toISOString()
        });
        return new Response(result , { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function PUT({ request, platform }) {
    try {
        let body = await request.json();
        let result = await platform?.env.DB.prepare(
            "UPDATE votes SET agrees = @agrees, _updated = @updated WHERE device_id = @device_id AND env = @env"
        ).run({
            "@device_id": body.device_id,
            "@env": platform?.env.ENV,
            "@agrees": -1,
            "@updated": new Date().toISOString()
        });
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}