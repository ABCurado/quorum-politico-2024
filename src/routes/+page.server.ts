import type { PageServerLoad } from './$types';
import db from './proposals/proposals_db.json';

export const load: PageServerLoad = async ({ request: any, platform }) => {

	let questions_number: number = 2;
	let first_tag_number: number = 0;
	let items = db.sort(() => Math.random() - 0.5).slice(0, questions_number - first_tag_number);

	if (platform?.env.ENV === 'production') {
		questions_number = 15;
	
		let first_tags: string[] = ["Cidadania", "Habitação", "Fiscalidade", "Educação", "Segurança Social", "Saúde", "Finanças", "Relações internacionais"];
		first_tag_number = first_tags.length;

		let first_items = db.sort(() => Math.random() - 0.5).slice(0, 1);

		for (let t of first_tags) {
			let aux_items = db.filter((proposal) => {return proposal.tag_1 === t})
			aux_items = aux_items.sort(() => Math.random() - 0.5).slice(0, 1);
			first_items = first_items.concat(aux_items);
		};

		let rest_items = db.sort(() => Math.random() - 0.5).slice(0, questions_number - first_tag_number - 1);

		items = first_items.concat(rest_items);

	} 	

	return {
		db: items,
		env: platform?.env.ENV || 'unknown'
	};
};
