<script lang="ts">
	// @ts-ignore
	import { LinkedIn, Telegram, WhatsApp, Facebook, X } from 'svelte-share-buttons-component';
	export let url = 'https://em-quem-votar-2023.pages.dev/';
	export let title = '';
	export let desc = '';
	export let hashtags = 'em-quem-votar-2023';

	let supportsNavigatorShare = window.navigator.canShare === undefined ? false : true;

	async function navigatorShare() {
		let response = await fetch("https://dev.em-quem-votar-2023.pages.dev/example.png")
		let blob = await response.blob();
		var file = new File([blob], "example.png", {type: 'image/png'});

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
	<button class="share-button rounded" on:click={() => navigatorShare()}>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share">
			<path d="M17 8.517a3.5 3.5 0 0 0-5 0L7.5 11.5M12 4.5v11" />
			<path d="M3 12h2m4 0h10" />
		</svg>
		Share with Friends
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