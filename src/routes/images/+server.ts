import Hemicycle from '../Hemicycle.svelte';
import type { RequestHandler } from '@sveltejs/kit';
import { Resvg } from '@resvg/resvg-js';
import { html } from 'satori-html';
import satori from 'satori';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ url }) => {
	const result = Hemicycle.render({random:true});
	const markup = html(`${result.html}<style>${result.css.code}</style>`);
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

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: 500
		}
	});

	const png = resvg.render();

	return new Response(svg, {
		headers: {
			'content-type': 'image/svg+xml'
		}
	});
};
