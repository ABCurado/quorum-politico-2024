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

			await toPng(node).then(function (dataUrl) {
				var img = new Image();
				img.src = dataUrl;
				document.body.appendChild(img);
			})
			let blob = await toBlob(node, { backgroundColor: 'white' });
			var file = new File([blob], 'adn.png', { type: blob.type });
			filesArray = [file];
			document.body.appendChild(file);

			browser.downloads.download({
				url: URL.createObjectURL(blob),
				filename: 'adn.png',
				saveAs: true
			});

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

{#if filesArray.length > 0}
	<button class="flex items-center rounded-full border border-gray-200 bg-opacity-50 p-4 text-sm font-medium text-gray-500 shadow-inner transition-colors duration-300 ease-in-out hover:bg-gray-100" on:click={() => navigatorShare()}>
		<IconShare size={48} stroke={2} class="" />
	</button>
{:else}
	<Spinner color="gray" />
{/if}
