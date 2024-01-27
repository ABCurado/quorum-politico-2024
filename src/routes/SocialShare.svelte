<script lang="ts">
	// @ts-ignore
	import { LinkedIn, Telegram, WhatsApp, Facebook, X } from 'svelte-share-buttons-component';
	export let url = 'https://em-quem-votar-2023.pages.dev/';
	export let title = '';
	export let desc = '';
	export let hashtags = 'em-quem-votar-2023';

	let textContent;

	$: console.log('textContent', textContent);
	async function navigatorShare() {
		console.log('navigatorShare');
		// feature detecting navigator.canShare() also implies
		// the same for the navigator.share()
		if (!window.navigator.canShare) {
			textContent = `Your browser doesn't support the Web Share API.`;
			return;
		}

		try {
			await window.navigator.share({
				title: title,
				text: 'Beautiful images',
				url: url
			});
			textContent = 'Shared!';
		} catch (error) {
			textContent = `Error: ${error.message}`;
		}

	}
</script>

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
<button class="share-button rounded" on:click={() => window.navigator.clipboard.writeText(url)}>Copy Link</button>
<button class="share-button rounded" on:click={() => {console.log("KKKK");navigatorShare()}}>Navigator Share</button>
<br/>
{@html textContent}
