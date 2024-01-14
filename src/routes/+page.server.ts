import db from './db.json';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request: any, platform }) => {
    // Pick 10 random items from the database
    let questions_number: number = 2;
    if(platform?.env.ENV ===  "production") {
        questions_number=10;
    }

    const items = db.sort(() => Math.random() - 0.5).slice(0, questions_number);
    return {
        "db": items,
        "env": platform?.env.ENV || "unknown"
    };
};
