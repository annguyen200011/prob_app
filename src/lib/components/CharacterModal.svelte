<!-- src/lib/components/CharacterModal.svelte -->
<script lang="ts">
	import type { Character } from '../types';
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';

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
</script>

{#if isOpen && character}
	<!-- Overlay -->
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
		role="dialog"
		aria-labelledby="modal-title"
		aria-modal="true"
	>
		<!-- Modal Content -->
		<div
			bind:this={modalContent}
			class="relative w-11/12 rounded-lg bg-white p-6 shadow-lg md:w-2/3 lg:w-1/2"
			tabindex="-1"
		>
			<!-- Close Button -->
			<button
				class="absolute right-4 top-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
				on:click={closeModal}
				aria-label="Close Modal"
			>
				&times;
			</button>

			<!-- Character Name -->
			<h2 id="modal-title" class="mb-4 text-2xl font-bold">{character.name}</h2>

			<!-- Character Image -->
			<img src={character.imageUrl} alt={character.name} class="mx-auto mb-4 h-32 w-32" />

			<!-- Character Properties -->
			<div class="grid grid-cols-2 gap-4">
				{#each Object.entries(character.properties) as [property, value]}
					<div>
						<span class="font-semibold capitalize">{property.replace(/([A-Z])/g, ' $1')}:</span>
						<span>{value}</span>
					</div>
				{/each}
			</div>

			<!-- Probability -->
			<div class="mt-4">
				<span class="font-semibold">Probability:</span>
				<span>{character.probability.toFixed(2)}%</span>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Optional: Add smooth transition for the modal */
	div[role='dialog'] {
		transition: opacity 0.3s ease;
	}
</style>
