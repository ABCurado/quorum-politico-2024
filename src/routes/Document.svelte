<script lang="ts">
	export let title: string;
	export let official_id: any;
	export let summary: string;
	export let proposal_link: string;
	export let counter: string;
	export let type: string;
	export let vote_link: string;
	export let tag_1: string;
	export let tag_2: string;
</script>

<div class="flex flex-col items-center justify-center p-4 w-full sm:p-0">
	<div class="flex flex-row flex-wrap justify-center mb-2">
		<div class="bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
			{tag_1}
		</div>
		<div class="bg-gray-200 rounded-full px-4 py-2 text-sm font-semibold text-gray-700 mr-2 mb-2">
			{tag_2}
		</div>
	</div>
	<div class="max-w-4xl mx-auto">
		<h3 class="text-xl sm:text-3xl min-h-12 font-bold mb-4 text-center">{type}: {title}</h3>
	</div>
	Sumário do {type}:
	<textarea class="text-base sm:text-lg mb-2 min-h-96 w-full max-w-4xl p-4 border rounded-lg bg-gray-100" value={summary} readonly />
	Possíveis contra-argumentos do {type}:
	<textarea class="text-base sm:text-lg mb-2 min-h-96 w-full max-w-4xl p-4 border rounded-lg bg-gray-100" value={counter} readonly />

	<a href={proposal_link} target="_blank" class="text-blue-500 underline">Ver documento oficial {official_id} (Votado a {vote_link})</a>
</div>
