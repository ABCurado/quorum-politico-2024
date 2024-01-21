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
export const GET: RequestHandler = async ({ request, platform }) => {
    let result = await platform?.env.DB.prepare(
        `
        SELECT 
            top_party, 
            agrees,
            COUNT(*) AS votes 
        FROM votes 
        GROUP BY 1 ,2
        `).run();
    
    const transformedResult = result.reduce((acc: any, row: any) => {
        const { top_party, agrees, votes } = row;
        if (!acc[top_party]) {
            acc[top_party] = [];
        }
        acc[top_party].push({ agrees, votes });
        return acc;
    }, {});

    return new Response(JSON.stringify(transformedResult));
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export const POST: RequestHandler = async ({ request, platform }) => {
    try {
        let body = await request.json();

        // Input validation
        if (!body.device_id || !body.results || !body.top_party) {
            return new Response('Invalid input', { status: 400 });
        }

        // Rate limiting
        // const lastInsertTime = await platform?.env.CACHE.get(body.device_id);
        // if (lastInsertTime) {
        //     return new Response('Too many requests, please try again later.', { status: 429 });
        // }

        let result = await platform?.env.DB.prepare(
            "INSERT INTO votes (device_id, env, results, top_party, agrees, _created, _updated) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)"
        ).bind(
            body.device_id,
            platform?.env.ENV,
            JSON.stringify(body.results),
            body.top_party,
            2,
            new Date().toISOString(),
            new Date().toISOString()
        ).run();

        // Store the timestamp of the last insert for this device id
        // await platform?.env.CACHE.put(body.device_id, Date.now(), { expirationTtl: 5 * 60 });

        return new Response(result, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}

/** @type {import('@sveltejs/kit').RequestHandler} */
export const PUT: RequestHandler = async ({ request, platform }) => {
    try {
        let body = await request.json();
        let result = await platform?.env.DB.prepare(
            "UPDATE votes SET agrees = ?1, _updated = ?2 WHERE rowid = (SELECT rowid FROM votes WHERE device_id = ?3 AND env = ?4 ORDER BY _updated DESC LIMIT 1)"
        ).bind(body.agrees, new Date().toISOString(), body.device_id, platform?.env.ENV
        ).run();
        return new Response(null, { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}