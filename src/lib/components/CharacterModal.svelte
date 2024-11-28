<!-- src/lib/components/CharacterModal.svelte -->
<script lang="ts">
	import type { Character, CharacterProperties, PropertyOption } from '../types';
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	import { properties, propertyDisplayNames } from '../utils'; // Import propertyDisplayNames

	export let character: Character | null = null;
	export let isOpen: boolean = false;

	const dispatch = createEventDispatcher();

	let modalContent: HTMLDivElement;

	/**
	 * Closes the modal by dispatching a 'close' event.
	 */
	function closeModal() {
		dispatch('close');
		console.log('Modal closed'); // Debugging line
	}

	/**
	 * Closes the modal when the Escape key is pressed.
	 */
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	/**
	 * Adds an event listener for keydown when the modal is open.
	 */
	onMount(() => {
		if (isOpen) {
			window.addEventListener('keydown', handleKeydown);
		}
		return () => {
			window.removeEventListener('keydown', handleKeydown);
		};
	});

	/**
	 * Sets focus to the modal content when it becomes open.
	 */
	afterUpdate(() => {
		if (isOpen && modalContent) {
			modalContent.focus();
			console.log(`Modal is open for: ${character?.name}`); // Debugging line
		}
	});

	/**
	 * Utility function to get display name from value
	 */
	function getDisplayName(property: keyof CharacterProperties, value: string): string {
		const option = properties[property].find((opt: PropertyOption) => opt.value === value);
		return option ? option.display : value;
	}
</script>

{#if isOpen && character}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
		role="dialog"
		aria-labelledby="modal-title"
		aria-modal="true"
	>
		<!-- Modal Content -->
		<div
			bind:this={modalContent}
			class="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-2xl"
			tabindex="-1"
		>
			<!-- Close Button -->
			<button
				class="absolute right-4 top-4 rounded-full p-2 text-4xl text-gray-500 hover:text-gray-700 focus:outline-none"
				on:click={closeModal}
				aria-label="Close Modal"
			>
				&times;
			</button>

			<!-- Character Name and Image -->
			<div class="mb-6 text-center">
				<h2 id="modal-title" class="text-3xl font-bold text-blue-600">{character.name}</h2>
				<img
					src={character.imageUrl}
					alt={character.name}
					class="mx-auto mt-4 h-40 w-40 rounded-full border-4 border-blue-500 shadow-md"
				/>
			</div>

			<!-- Probability Bar -->
			<div class="mb-6 mt-4">
				<p class="text-center font-semibold">Probability</p>
				<div class="h-4 w-full overflow-hidden rounded-full bg-gray-200">
					<div
						class="h-full rounded-full transition-all duration-500"
						style="width: {character.probability}%; background-color: {character.probability >= 20
							? '#34D399' /* Green for high probability */
							: character.probability >= 10
								? '#FBBF24' /* Yellow for medium probability */
								: '#F87171'};  /* Red for low probability */"
					></div>
				</div>
				<p class="mt-1 text-center text-sm font-semibold text-gray-600">
					{character.probability.toFixed(2)}%
				</p>
			</div>

			<!-- Character Properties -->
			<div class="grid grid-cols-3 gap-4">
				{#each Object.entries(character.properties) as [property, value]}
					<div class="flex flex-col items-start rounded-lg bg-gray-100 p-3 shadow-sm">
						<span class="text-xs font-bold uppercase text-gray-500">
							{propertyDisplayNames[property as keyof CharacterProperties]}
						</span>
						<span class="text-sm font-medium text-gray-800">
							{getDisplayName(property as keyof CharacterProperties, value)}
						</span>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<style>
	/* Optional: Add smooth transition for modal appearance */
	div[role='dialog'] {
		transition: opacity 0.3s ease;
	}
</style>
