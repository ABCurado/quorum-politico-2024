<script lang="ts">
	import type { Proximity } from "../../types";
    export let pr: Proximity[] = [];
</script>

<div class="flex flex-col bg-green-400 items-center">
    <h1 class="flex items-center">My ADN Politico Wrapped</h1>
    {#each pr as party}
        <h3 class="m-4">{party.party.name}</h3>
        <p>{party.value * 100}%</p>
    {/each}
</div>
