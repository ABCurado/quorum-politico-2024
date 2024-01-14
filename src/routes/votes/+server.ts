import type { RequestHandler } from "@sveltejs/kit";

// ┌─────┬───────────┬─────────┬─────────┬────────────┬────┐
// │ cid │ name      │ type    │ notnull │ dflt_value │ pk │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 0   │ device_id │ INTEGER │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 1   │ env       │ TEXT    │ 0       │            │ 0  │
// ├─────┼───────────┼─────────┼─────────┼────────────┼────┤
// │ 2   │ results   │ TEXT    │ 0       │            │ 0  │
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
        let result = await platform?.env.DB.prepare(
            "INSERT INTO votes (device_id, env, results, top_party, agrees, _created, _updated) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)"
        ).bind(
            body.device_id, 
            platform?.env.ENV, 
            JSON.stringify(body.results), 
            body.top_party, 
            -1, 
            new Date().toISOString(), 
            new Date().toISOString()
        ).run();
        return new Response(result, { status: 200 });
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
            "@agrees": body.agrees,
            "@updated": new Date().toISOString()
        });
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}