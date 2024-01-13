import db from './db.json';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (request: any) => {
    // Pick 10 random items from the database
    const items = db.sort(() => Math.random() - 0.5).slice(0, 5);
    return {
        "db": items,
        "env": !process.env || "unknown"
    };
};
