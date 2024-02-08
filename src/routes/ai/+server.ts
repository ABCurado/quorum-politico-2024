import { Ai } from "@cloudflare/ai";
import type { RequestHandler } from '@sveltejs/kit';

// A get route that returns information about a specific party
/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ platform, url }) => {
    const ai = new Ai(platform?.env.AI);
    const inputs = {
      // text: "I don't like you. I hate you",
      text: 'I like you. I love you'
    };

    const response = await ai.run(
      '@cf/huggingface/distilbert-sst-2-int8',
      inputs
    );
    return new Response(JSON.stringify(inputs,response), { headers: { 'Content-Type': 'application/json' } });
};
