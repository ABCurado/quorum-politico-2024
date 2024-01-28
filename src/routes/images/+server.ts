import { Buffer } from 'node:buffer';
import Example from './Example.svelte';
import Hemicycle from '../Hemicycle.svelte';
import type { RequestHandler } from '@sveltejs/kit';
import { html } from 'satori-html';
import satori from 'satori';

/** @type {import('@sveltejs/kit').RequestHandler} */
export const GET: RequestHandler = async ({ url }) => {
	
	const result = Example.render({ random: true });

	const markup = html(`${result.html}<style>${result.css.code}</style>`);
	const svg = await satori(markup, {
		fonts: [
			{
				name: 'Source Serif Pro',
				data: await fetch('https://dev.em-quem-votar-2023.pages.dev/fonts/Satoshi-Medium.otf').then((res) => res.arrayBuffer()),
				style: 'normal'
			}
		],
		height: 600,
		width: 400
	});
	try {
		const body = {
			Parameters: [
				{
					Timeout: 300,
					Name: 'File',
					FileValue: {
						Name: 'share.svg',
						Data: btoa(svg)
					}
				}
			]
		};

		const res = await fetch('https://v2.convertapi.com/convert/svg/to/png?Secret=02nOtN0Pm2rT7hnA', {
			method: 'POST',
			body: JSON.stringify(body),
			headers: {
				'content-type': 'application/json'
			}
		}).then((res) => res.json());
		var binaryData = atob(res.Files[0].FileData);

		// Now, you can manipulate the binary data as needed, for example, create a Uint8Array
		var byteArray = new Uint8Array(binaryData.length);
		for (var i = 0; i < binaryData.length; i++) {
		  byteArray[i] = binaryData.charCodeAt(i);
		}
		return new Response(byteArray, {
			headers: {
				'content-type': 'image/png',
			}
		});
	} catch (error) {
		return new Response(error.message, {
			status: 500
		});
	}
};
