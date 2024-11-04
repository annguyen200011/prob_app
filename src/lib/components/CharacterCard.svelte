<!-- src/lib/components/CharacterCard.svelte -->
<script lang="ts">
	import type { Character } from '../types';
	import { createEventDispatcher } from 'svelte';

	export let character: Character;

	const dispatch = createEventDispatcher();

	/**
	 * Handles the click event on the character card.
	 */
	function handleClick() {
		dispatch('select', character);
	}
</script>

<!-- Use a button instead of div -->
<button
	type="button"
	class="flex cursor-pointer flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
	on:click={handleClick}
>
	<!-- Character Image -->
	<img src={character.imageUrl} alt={character.name} class="mb-4 h-24 w-24" />

	<!-- Character Name -->
	<p class="text-lg font-semibold">{character.name}</p>

	<!-- Probability Bar -->
	<div class="mt-2 h-4 w-full rounded-full bg-gray-200">
		<div class="h-4 rounded-full bg-blue-500" style="width: {character.probability}%;"></div>
	</div>
	<p class="mt-1 text-sm text-gray-600">Probability: {character.probability.toFixed(2)}%</p>
</button>
