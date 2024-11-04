<script lang="ts">
  import type { Character } from '../types';
  export let character: Character;
</script>

<div class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
  <img src={character.imageUrl} alt={character.name} class="w-24 h-24 mb-2" />
  <h2 class="text-lg font-semibold">{character.name}</h2>
  <p class="mt-1 text-sm text-gray-600">Probability: {character.probability.toFixed(2)}%</p>
</div>
