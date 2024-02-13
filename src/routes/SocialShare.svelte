<script lang="ts">
	// @ts-ignore
	import { LinkedIn, Telegram, WhatsApp, Facebook, X } from 'svelte-share-buttons-component';
	import { IconShare } from '@tabler/icons-svelte';
	import mixpanel from 'mixpanel-browser';
	import { toSvg, toBlob, toPng } from 'html-to-image';
	import { onMount } from 'svelte';
	import { Spinner } from 'flowbite-svelte';

	export let url = 'https://adn-politico.com/';
	export let title = '';
	export let desc = '';
	export let hashtags = 'adn-politico-2024';
	export let proximity: { party: string; proximity: number }[] = [];
	let supportsNavigatorShare = window.navigator.canShare === undefined ? false : true;

	let filesArray: File[] = [];
	onMount(async () => {
		try {
			let node = document.getElementById('share');

			// await toPng(node).then(function (dataUrl) {
			// 	var img = new Image();
			// 	img.src = dataUrl;
			// 	document.body.appendChild(img);
			// });
			
			let blob = await toBlob(node, { backgroundColor: 'white',width:400, height:600});
			// const blob = await (await fetch(await toPng(node, {}))).blob(); 
			var file = new File([blob], 'adn.png', { type: "image/png"});
			filesArray = [file];
		} catch (e) {
			mixpanel.track('Error Detected', { error_type: 'Image generation', error: e.message });
		}
	});

	async function navigatorShare() {
		try {
			await window.navigator.share({
				title: title,
				files: filesArray,
				text: `${title} ${desc}`,
				url: url
			});
		} catch (e) {
			mixpanel.track('Error Detected', { error_type: 'Navigator Share With Files', error: e.message });
		}
		try {
			await window.navigator.share({
				title: title,
				text: `${title} ${desc}`,
				url: url
			});
		} catch (e) {
			mixpanel.track('Error Detected', { error_type: 'Navigator Share Without Files', error: e.message });
		}
	}
</script>

{#if supportsNavigatorShare}
	<button class="share-button flex cursor-pointer items-center rounded-full border-2 bg-gray-200 bg-opacity-30 px-4 py-4 shadow-lg hover:shadow-2xl" on:click={() => navigatorShare()}>
		<IconShare size={48} stroke={2} class="" />
	</button>
{:else}
	<!-- <Email subject={title} body="{desc} {url}" /> -->
	<!-- <HackerNews class="share-button" {title} {url} /> -->
	<!-- <Reddit class="share-button" {title} {url} /> -->
	<LinkedIn class="share-button rounded" {url} />
	<!-- <Tumblr class="share-button" {title} {url} caption={title} /> -->
	<!-- <Pinterest class="share-button" {url} media="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/200px-Svelte_Logo.svg.png" description={title} /> -->
	<Telegram class="share-button rounded" text={title} - {desc} {url} />
	<!-- <Vk class="share-button" {title} {url} /> -->
	<WhatsApp class="share-button rounded" text="{title} {url}" />
	<!-- <Xing class="share-button" {title} {url} /> -->
	<Facebook class="share-button rounded" quote={title} {url} />
	<X class="share-button rounded" text={title} {desc} {url} related="other,users" {hashtags} />
	<!-- <Line class="share-button" {url} /> -->
	<!-- <button class="share-button rounded" on:click={() => window.navigator.clipboard.writeText(url)}>Copy Link</button> -->
{/if}
