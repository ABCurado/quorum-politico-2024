<script>
	export let proximity = [];
</script>

<div class="flex flex-col bg-green-400 items-center">
    <h1 class="flex items-center">My ADN Politico Wrapped</h1>
    {#each proximity as party}
        <h3 class="m-4">{party.party}</h3>
        <p>{party.proximity * 100}%</p>
    {/each}
</div>
