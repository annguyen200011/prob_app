<!-- src/lib/components/CountdownDisplay.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { gameState, startGame } from '../stores/gameStore';
	import { get } from 'svelte/store';

	let countdown = 5;
	let showCharacter = false;
	export let displayComplete = false; // make this a prop so it can be passed to parent

	onMount(() => {
		startGame();
		const interval = setInterval(() => {
			countdown -= 1;
			if (countdown === 0) {
				clearInterval(interval);
				showCharacter = true;
				// Display character for 2 seconds
				setTimeout(() => {
					showCharacter = false;
					displayComplete = true; // update displayComplete when finished
				}, 2000);
			}
		}, 1000);
	});
</script>

{#if $gameState.gameStarted && !displayComplete}
	<!-- Full-screen countdown display -->
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-white">
		{#if !showCharacter}
			<p class="animate-pulse text-4xl font-semibold">Game starts in: {countdown}</p>
		{:else if $gameState.targetCharacter}
			<p class="text-3xl font-semibold text-green-600">
				Selected Character: {$gameState.targetCharacter.name}
			</p>
		{/if}
	</div>
{/if}
