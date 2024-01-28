import * as resvg from '@resvg/resvg-wasm';

import Document from '../Document.svelte';
import Hemicycle from '../Hemicycle.svelte';
import type { RequestHandler } from '@sveltejs/kit';
import db from '../proposals/proposals_db.json';
import { html } from 'satori-html';
// @ts-ignore
import satori from 'satori';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ url }) => {
	const result = Hemicycle.render({ ...db[0], random: true });
	const markup = html(`${result.html}<style>${result.css.code}</style>`);
	await fetch('https://dev.em-quem-votar-2023.pages.dev/resvg_bg.wasm?module').then((res) => resvg.initWasm(res))

	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Source Serif Pro',
				data: await fetch('https://dev.em-quem-votar-2023.pages.dev/fonts/Satoshi-Medium.otf').then((res) => res.arrayBuffer()),
				style: 'normal'
			}
		],
		height: 500,
		width: 500
	});
	try {
		const resvgJS = new resvg.Resvg(svg, {
			fitTo: {
				mode: 'width',
				value: 1280
			}
		});
		const pngData = resvgJS.render();
		const pngBuffer = pngData.asPng();
		return new Response(pngBuffer, {
			headers: {
				'content-type': 'image/png'
			}
		});
	} catch (error) {
		console.error(error);
		return new Response(error.message, {
			status: 500
		});
	}
};
