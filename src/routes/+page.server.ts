export const csr = true;
export const ssr = false;
export const prerender = false;
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request: any) => {
    return {
        status: 200,
        headers: {},
        body: 'Hello world!',
    };
};
