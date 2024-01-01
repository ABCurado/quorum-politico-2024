<script>
	// @ts-ignore
	import { LinkedIn, Telegram, WhatsApp, Facebook, X } from 'svelte-share-buttons-component';

	export let url = 'https://em-quem-votar-2023.pages.dev/';
	export let title = '';
	export let desc = '';
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
<X class="share-button rounded" text={title} {desc} {url} related="other,users" />
<!-- <Line class="share-button" {url} /> -->
