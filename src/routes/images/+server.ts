// import Hemicycle from '../Hemicycle.svelte';
// import type { RequestHandler } from '@sveltejs/kit';
// import ShareImage from './ShareImage.svelte';
// import { html } from 'satori-html';
// import satori from 'satori';

// /** @type {import('@sveltejs/kit').RequestHandler} */
// export const POST: RequestHandler = async ({ platform, request }) => {
// 	let body = await request.json();
	
// 	const result = ShareImage.render({ proximity: body.proximity });

// 	const markup = html(`${result.html}<style>${result.css.code}</style>`);
// 	const svg = await satori(markup, {
// 		fonts: [
// 			{
// 				name: 'Source Serif Pro',
// 				data: await fetch('https://adn-politico.com/fonts/Satoshi-Medium.otf').then((res) => res.arrayBuffer()),
// 				style: 'normal'
// 			}
// 		],
// 		height: 600,
// 		width: 400
// 	});
// 	try {
// 		// Convert the SVG to PNG
// 		// TODO: find a way to avoid this http and do it either here or in the client
// 		const body = {
// 			Parameters: [
// 				{
// 					Timeout: 300,
// 					Name: 'File',
// 					FileValue: {
// 						Name: 'share.svg',
// 						Data: btoa(svg)
// 					}
// 				}
// 			]
// 		};

// 		const res = await fetch(`https://v2.convertapi.com/convert/svg/to/png?Secret=${platform?.env.CONVERT_API_TOKEN}`, {
// 			method: 'POST',
// 			body: JSON.stringify(body),
// 			headers: {
// 				'content-type': 'application/json'
// 			}
// 		}).then((res) => res.json());
// 		var binaryData = atob(res.Files[0].FileData);
// 		// Now, you can manipulate the binary data as needed, for example, create a Uint8Array
// 		var byteArray = new Uint8Array(binaryData.length);
// 		for (var i = 0; i < binaryData.length; i++) {
// 		  byteArray[i] = binaryData.charCodeAt(i);
// 		}
// 		return new Response(byteArray, {
// 			headers: {
// 				'content-type': 'image/png',
// 			}
// 		});
// 	} catch (error) {
// 		return new Response(error.message, {
// 			status: 500
// 		});
// 	}
// };
