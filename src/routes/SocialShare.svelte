<script lang="ts">
	// @ts-ignore
	import { LinkedIn, Telegram, WhatsApp, Facebook, X } from 'svelte-share-buttons-component';
	import { IconShare3 } from '@tabler/icons-svelte';
	import mixpanel from 'mixpanel-browser';
	import { toBlob} from 'html-to-image';
	import { Spinner } from 'flowbite-svelte';

	export let url = 'https://quorum-politico.pt/';
	export let title = '';
	export let desc = '';
	export let hashtags = 'quorum-politico-2024';
	let supportsNavigatorShare = window.navigator.canShare === undefined ? false : true;
	let filesArray: File[] = [];
	let isGenerating = false;

	async function generatePNG() {
		isGenerating = true;
		await new Promise((r) => setTimeout(r, 200));
		try {
			let node = document.getElementById('share');
			if(!node) return;
			function filter(node) {
				return node.id !== 'descobre';
			}
			let blob = await toBlob(node, { backgroundColor: '#f1f5f9', width: 360, height: 700, filter: filter });
			// const blob = await (await fetch(await toPng(node, {}))).blob();
			var file = new File([blob], 'adn.png', { type: 'image/png' });
			filesArray = [file];
		} catch (e) {
			mixpanel.track('Error Detected', { error_type: 'Image generation', error: e.message });
		}
		isGenerating = false;
	}

	async function navigatorShare() {
		try {
			await window.navigator.share({
				title: title,
				text: `${title} ${desc}`,
				url: url,
				files: filesArray
			});
			return;
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

<div class="m-2 mt-6 flex w-full flex-col">
	<h2 class="text-m text-center text-base font-bold">Compara as tua representação partidária com amigos</h2>
	{#if supportsNavigatorShare}
		<p class="text-center text-xs">Gera uma imagem com os teus resultados e partilha.</p>
	{:else}
		<p class="text-center text-xs">Partilha e descobre os resultados de outros.</p>
	{/if}
	<div class="flex items-center justify-center gap-3 mt-2">
		{#if supportsNavigatorShare}
			{#if isGenerating}
				<button class="share-button flex cursor-pointer items-center rounded-full border-2 bg-slate-200 bg-opacity-30 px-4 py-4 shadow-xl hover:shadow-2xl">
					<Spinner />
				</button>
			{:else if filesArray.length > 0}
				<button class="share-button shadow-3xl flex cursor-pointer items-center rounded-full border-2 bg-slate-200 bg-opacity-30 px-4 py-4 hover:shadow-2xl" on:click={() => navigatorShare()}>
					<IconShare3 size={48} stroke={2}/>
				</button>
			{:else}
				<button class="share-button flex cursor-pointer items-center rounded-full border-2 bg-slate-200 bg-opacity-30 px-4 py-4 shadow-md hover:shadow-2xl" on:click={() => generatePNG()}>
					<IconShare3 size={48} stroke={2}/>
				</button>
			{/if}
		{:else}
			<!-- <Email subject={title} body="{desc} {url}" /> -->
			<!-- <HackerNews class="share-button" {title} {url} /> -->
			<!-- <Reddit class="share-button" {title} {url} /> -->
			<LinkedIn class="share-button rounded-full" {url} />
			<!-- <Tumblr class="share-button" {title} {url} caption={title} /> -->
			<!-- <Pinterest class="share-button" {url} media="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/200px-Svelte_Logo.svg.png" description={title} /> -->
			<Telegram class="share-button rounded-full" text={title} - {desc} {url} />
			<!-- <Vk class="share-button" {title} {url} /> -->
			<WhatsApp class="share-button rounded-full" text="{title} {url}" />
			<!-- <Xing class="share-button" {title} {url} /> -->
			<Facebook class="share-button rounded-full" quote={title} {url} />
			<X class="share-button rounded-full" text={title} {desc} {url} related="other,users" {hashtags} />
			<!-- <Line class="share-button" {url} /> -->
			<!-- <button class="share-button rounded" on:click={() => window.navigator.clipboard.writeText(url)}>Copy Link</button> -->
		{/if}
	</div>
</div>
