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
	class="flex cursor-pointer flex-col items-center rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
	on:click={handleClick}
	style="background-image: linear-gradient(to top, {character.probability === 0
		? '#d1d5db'
		: '#3b82f6'} {character.probability}%, #ffffff {character.probability}%);"
	class:opacity-50={character.probability === 0}
	class:cursor-not-allowed={character.probability === 0}
	disabled={character.probability === 0}
>
	<p
		class="relative z-10 text-lg font-semibold"
		style="color: {character.probability === 0
			? '#000000'
			: character.probability > 90
				? '#ffffff'
				: character.probability > 15
					? '#000000'
					: '#3b82f6'};"
	>
		{character.name}
	</p>

	<!-- Character Image -->
	<img src={character.imageUrl} alt={character.name} class="relative z-10 mb-4 h-24 w-24" />

	<!-- Probability Text -->
	<p
		class="relative z-10 mt-1 text-sm"
		style="color: {character.probability === 0
			? '#000000'
			: character.probability > 90
				? '#ffffff'
				: character.probability > 15
					? '#000000'
					: '#3b82f6'};"
	>
		Probability: {character.probability.toFixed(2)}%
	</p>
</button>
