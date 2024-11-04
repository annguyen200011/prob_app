<!-- src/lib/components/CountdownDisplay.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { gameState, startGame } from '../stores/gameStore';
  import { get } from 'svelte/store';

  let countdown = 5;
  let showCharacter = false;
  let displayComplete = false;

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
          displayComplete = true;
        }, 2000);
      }
    }, 1000);
  });
</script>

{#if $gameState.gameStarted && !displayComplete}
  <div class="flex justify-center items-center h-32">
    {#if !showCharacter}
      <p class="text-2xl font-semibold animate-pulse">Game starts in: {countdown}</p>
    {:else}
      {#if $gameState.targetCharacter}
        <p class="text-2xl font-semibold text-green-600">Selected Character: {$gameState.targetCharacter.name}</p>
      {/if}
    {/if}
  </div>
{/if}
