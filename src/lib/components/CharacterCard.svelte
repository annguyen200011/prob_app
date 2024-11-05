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

<button
	type="button"
	class="relative flex transform cursor-pointer flex-col items-center rounded-lg p-4 shadow-lg transition duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
	on:click={handleClick}
	class:opacity-50={character.probability === 0}
	class:cursor-not-allowed={character.probability === 0}
	disabled={character.probability === 0}
	style="background: linear-gradient(to top, #3b82f6 {character.probability}%, #ffffff {character.probability}%);"
>
	<!-- High Probability Badge -->
	{#if character.probability >= 50}
		<span
			class="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white shadow-md"
		>
			High
		</span>
	{/if}

	<!-- Character Image -->
	<div
		class="relative mb-3 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-inner"
	>
		<img src={character.imageUrl} alt={character.name} class="h-full w-full object-cover" />
	</div>

	<!-- Character Name -->
	<p class="text-lg font-bold text-gray-800" class:text-white={character.probability > 15}>
		{character.name}
	</p>

	<!-- Probability Text with Color Styling Based on Probability Level -->
	<p
		class="mt-1 text-sm font-medium"
		class:text-blue-700={character.probability <= 10}
		class:text-gray-900={character.probability > 10 && character.probability <= 90}
		class:text-white={character.probability > 90}
	>
		Probability: {character.probability.toFixed(0)}%
	</p>
</button>
