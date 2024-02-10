<script lang="ts">
	// @ts-ignore
	import { LinkedIn, Telegram, WhatsApp, Facebook, X } from 'svelte-share-buttons-component';
	import {IconShare} from '@tabler/icons-svelte';

	export let url = 'https://adn-politico.com/';
	export let title = '';
	export let desc = '';
	export let hashtags = 'adn-politico-2024';
	export let proximity: { party: string; proximity: number }[] = [];
	let supportsNavigatorShare = window.navigator.canShare === undefined ? false : true;

	async function navigatorShare() {
		let response = await fetch(
			"/images",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					proximity: proximity,
				}),
			}
		)
		let blob = await response.blob();
		var file = new File([blob], "adn.png", {type: 'image/.png'});

		var filesArray = [file];	
		await window.navigator.share({
			title: title,
			files: filesArray,
			text: `${title} ${desc}`,
			url: url
		});
	}
</script>

{#if supportsNavigatorShare}
	<button class="share-button rounded-full bg-gray-200 bg-opacity-30 px-4 py-4 cursor-pointer flex items-center border-2  shadow-lg hover:shadow-2xl" on:click={() => navigatorShare()}>
		<IconShare size={48} stroke={2} class="text-sky-500 opacity-75"/>		
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
