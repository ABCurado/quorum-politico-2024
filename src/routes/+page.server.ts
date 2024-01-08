import db from './db.json';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request: any) => {
    return {"db": db};
};
