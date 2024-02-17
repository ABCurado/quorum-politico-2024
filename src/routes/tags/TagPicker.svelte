<script lang="ts">
	import { Modal, Button, GradientButton } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	// Fetch all tags from the /tags endpoint
	// and store them in the tags variable
	let tags: string [] = [];
	export let selectedTags: string [] = [];
	$: selectedTagsSize = selectedTags.length;
	export let show = false;
    export let onButtonClick = (selectedTags) => {};

	onMount(async () => {
		let response = await fetch('/tags', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		tags = await response.json();
	});

	function handleCheckboxClick(event: any) {
		if (selectedTags.length < 3 && event.target.checked) {
			selectedTags = [...selectedTags, event.target.id];
		} else if (!event.target.checked) {
			selectedTags = selectedTags.filter((tag) => tag !== event.target.id);
		} else {
			event.target.checked = false;
		}
	}
</script>

{#if tags !== undefined}
	<Modal title={'Escolhe 3 categorias'} bind:open={show} autoclose outsideclose size="lg">
		<ul class="grid gap-3 w-full md:grid-cols-3">
			{#each Object.keys(tags) as tag}
				<li>
					<input type="checkbox" id={tag} value="" class="hidden peer" on:click={handleCheckboxClick} />
					<label
						for={tag}
						class="inline-flex items-center justify-between w-full p-5 text-slate-500 bg-white border-2 border-slate-200 rounded-lg cursor-pointer dark:hover:text-slate-300 dark:border-slate-700 peer-checked:bg-slate-100 hover:text-slate-600 dark:peer-checked:text-slate-300 peer-checked:text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700">
						<div class="block">
							<div class="w-full text-lg font-semibold flex items-center">
								{tag} <span class="text-xs text-slate-300 ml-1">({tags[tag]})</span>
							</div>
						</div>
					</label>
				</li>
			{/each}
		</ul>
		<svelte:fragment slot="footer">
			<div class="flex justify-between items-center h-12">
				<button on:click={onButtonClick} class="mb-4 rounded bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-700" disabled={selectedTagsSize !== 3}>
    				Vamos a isso!
				</button>
			</div>
		</svelte:fragment>
	</Modal>
{/if}
