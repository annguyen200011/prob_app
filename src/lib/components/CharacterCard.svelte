<script lang="ts">
	import { scale } from 'svelte/transition';
	import type { Character } from '../types';
	import { createEventDispatcher } from 'svelte';

	export let character: Character;
	export let isGuessMode: boolean = false;

	const dispatch = createEventDispatcher();

	/**
	 * Handles the click event on the character card.
	 */
	function handleClick() {
		if (character.probability === 0) return; // Ignore clicks on disabled cards
		dispatch('select', character);
	}
</script>

<button
	type="button"
	class="relative flex transform flex-col items-center rounded-lg p-4 shadow-lg transition duration-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
	on:click={handleClick}
	class:opacity-50={character.probability === 0}
	class:cursor-not-allowed={character.probability === 0 && !isGuessMode}
	class:cursor-pointer={character.probability > 0 && isGuessMode}
	disabled={character.probability === 0 && !isGuessMode}
	aria-label={`Character card for ${character.name} with probability ${character.probability.toFixed(0)}%`}
	class:guess-mode={isGuessMode && character.probability > 0}
>
	<!-- Probability Badge based on probability level -->
	{#if character.probability >= 20}
		<span
			class="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-semibold text-white shadow-md"
		>
			High
		</span>
	{:else if character.probability >= 15}
		<span
			class="absolute right-2 top-2 rounded-full bg-yellow-500 px-2 py-1 text-xs font-semibold text-white shadow-md"
		>
			Medium
		</span>
	{:else}
		<span
			class="absolute right-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white shadow-md"
		>
			Low
		</span>
	{/if}

	<!-- Character Image -->
	<div
		class="relative mb-3 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-inner"
	>
		<img src={character.imageUrl} alt={character.name} class="h-full w-full object-cover" />
	</div>

	<!-- Character Name (Fixed Color) -->
	<p class="text-lg font-bold text-gray-800">
		{character.name}
	</p>

	<!-- Probability Text (Fixed Color) -->
	<p class="mt-1 text-sm font-medium text-gray-900">
		Probability: {character.probability.toFixed(0)}%
	</p>

	<!-- Probability Progress Bar with Smooth Width and Color Transition -->
	<!-- <div class="w-full mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
		<div
			in:scale={{ duration: 500 }}
			class="h-full rounded-full transition-all duration-500 ease-in-out"
			style="width: {character.probability}%; background-color: {character.probability >= 50 ? '#34D399' : character.probability >= 15 ? '#FBBF24' : '#F87171'};"
		></div>
	</div> -->
</button>

<style>
	.guess-mode {
		border: 2px dashed #3b82f6; /* Blue dashed border */
	}
	.guess-mode:hover {
		background-color: #e0f2fe; /* Light blue background on hover */
	}
</style>
