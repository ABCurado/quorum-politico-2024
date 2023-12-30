<script lang="ts">
	export let title: string;
	export let summary: string;
    export let url: string;
</script>

<div class="flex flex-col items-center justify-center">
	<div class="max-w-xl mx-auto">
		<h2 class="text-2xl font-bold mb-4 text-center">{title}</h2>
	</div>
	<!-- Display the tags from the document in a nice way -->
	<!-- <div class="flex flex-row flex-wrap justify-center mb-4">
		{#each document.summary.tags as tag}
			<div class="bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
				{tag}
			</div>
		{/each}
	</div> -->
	<textarea
		class="text-lg mb-2 h-64 w-full max-w-xl p-4 border border-gray-300 rounded-lg bg-gray-100"
		value={summary}
		readonly
	/>
	<a href={url} target="_blank" class="text-blue-500 underline">Ver documento</a>
</div>
