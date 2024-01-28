<script>
	export let name = 'world';
	let songs = [
		{ title: 'PCP', artist: '100%' },
		{ title: 'L', artist: '40%' },
		{ title: 'PSD', artist: '15%' }
		// Add more songs here
	];
</script>

<div class="flex flex-col bg-green-400 items-center">
    <h1 class="flex items-center">My ADN Politico Wrapped</h1>
    {#each songs as song}
        <h3 class="m-4">{song.title}</h3>
        <p>{song.artist}</p>
    {/each}
</div>
