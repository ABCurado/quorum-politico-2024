<script lang="ts">
export let proximity: Array<{ party: string, proximity: number }>;
</script>

<div>
	{#each proximity as party}
		<div class="flex align-middle mb-2">
			<div class="bar-label w-48 sm:w-60 font-bold">{party.party}</div>
			<div class="bar-fill" style="width: {party.proximity * 100}%" />
		</div>
	{/each}
</div>

<style>
	.bar-fill {
		width: 100%; /* Add this line */
	}

	.bar-fill::after {
		content: '';
		display: block;
		height: 100%;
		border-radius: 4px;
		background-color: rgba(0, 128, 128, 0.8);
		transition: width 0.3s ease-in-out;
		direction: ltr; /* Add this line if you have text inside the bar */
	}

	.bar-fill:hover::after {
		background-color: rgba(0, 128, 128, 1);
	}

	.bar-fill:hover {
		background-color: teal;
	}
</style>
