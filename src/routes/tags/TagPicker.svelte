<script lang="ts">
	import { Modal, Button, GradientButton } from 'flowbite-svelte';
	import { onMount } from 'svelte';

	// Fetch all tags from the /tags endpoint
	// and store them in the tags variable
	let tags;
	export let selectedTags = [];
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

	function handleCheckboxClick(event) {
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
					<input type="checkbox" id={tag} value="" class="hidden peer" required="" on:click={handleCheckboxClick} />
					<label
						for={tag}
						class="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:bg-gray-100 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
					>
						<div class="block">
							<div class="w-full text-lg font-semibold flex items-center">
								{tag} <span class="text-xs text-gray-300 ml-1">({tags[tag]})</span>
							</div>
						</div>
					</label>
				</li>
			{/each}
		</ul>
		<svelte:fragment slot="footer">
			<div class="flex justify-between items-center h-12">

<button on:click={onButtonClick} class="custom-button" disabled={selectedTagsSize !== 3}>
    Vamos a isso!
</button>




			</div>
		</svelte:fragment>
	</Modal>
{/if}
