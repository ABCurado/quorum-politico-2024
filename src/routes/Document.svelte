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

	function highlightTitles(text) {
		return text
			.split('\n')
			.map((point) => {
				if (/^\d+\./.test(point)) {
					return `<p class="font-bold">${point.split(':')[0]}</p>${point.split(':')[1]}`;
				} else {
					return `<p>${point}</p>`;
				}
			})
			.join('');
	}
</script>

<div class="flex flex-col items-center p-4 w-full sm:p-0">
	<div class="flex flex-row flex-wrap mb-2">
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
	<h3 class="text-l sm:text-xl mb-2 text-left">Sumário do {type}:</h3>
	<div class="text-base sm:text-lg mb-2 min-h-52 w-full max-w-4xl p-4 rounded-lg bg-gray-100 summary-text">
		{summary}
	</div>
	<h3 class="text-l sm:text-xl mb-2 text-left">Possíveis contra-argumentos do {type}:</h3>

	<div class="text-base sm:text-lg mb-6 min-h-52 w-full max-w-4xl p-4 border rounded-lg bg-gray-100">
		{@html highlightTitles(counter)}
	</div>

	<a href={proposal_link} target="_blank" class="text-blue-500 underline">Ver documento oficial {official_id} (Votado a {vote_link})</a>
</div>
