<script>
	// @ts-ignore
	import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, X, Line } from 'svelte-share-buttons-component';

	export let url = 'https://pchynoweth.github.io/svelte-share-buttons-component/';
	export let title = 'Svelte Share Buttons Component';
	export let desc = 'Svelte based social media share buttons component with no tracking.';
</script>

<!-- <Email subject={title} body="{desc} {url}" /> -->
<!-- <HackerNews class="share-button" {title} {url} /> -->
<!-- <Reddit class="share-button" {title} {url} /> -->
<LinkedIn class="share-button rounded" {url} />
<!-- <Tumblr class="share-button" {title} {url} caption={title} /> -->
<!-- <Pinterest class="share-button" {url} media="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/200px-Svelte_Logo.svg.png" description={title} /> -->
<Telegram class="share-button rounded" text={title} {url} />
<!-- <Vk class="share-button" {title} {url} /> -->
<WhatsApp class="share-button rounded" text="{title} {url}" />
<!-- <Xing class="share-button" {title} {url} /> -->
<Facebook class="share-button rounded" quote={title} {url} />
<X class="share-button rounded" text={title} {url} hashtags="github,svelte" via="username" related="other,users" />
<!-- <Line class="share-button" {url} /> -->
