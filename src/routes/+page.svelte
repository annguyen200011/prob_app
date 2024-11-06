<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import CharacterCard from '$lib/components/CharacterCard.svelte';
	import ChatSidebar from '$lib/components/ChatSidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CountdownDisplay from '$lib/components/CountdownDisplay.svelte';
	import CharacterModal from '$lib/components/CharacterModal.svelte'; // Import the modal
	import {
		characters,
		chatHistory,
		questionsAsked,
		gameState,
		resetGame as resetGameStore
	} from '$lib/stores/gameStore';
	import { getObscuredProperties } from '$lib/utils';
	import type { Question, Character, ChatEntry } from '$lib/types';
	import { get } from 'svelte/store';
	import { browser } from '$app/environment';

	let gameWon = false;
	let winningCharacter: Character | null = null;

	// State for the modal
	let selectedCharacter: Character | null = null;
	let isModalOpen: boolean = false;

	// State for the countdown display
	let displayComplete = false;

	// Function to reset the game and restart the countdown
	function resetGame() {
		displayComplete = false; // Hide main content again
		resetGameStore(); // Call the store's reset function to reset game state
	}

	/**
	 * Handles incoming questions from the ChatSidebar component.
	 * @param event - The CustomEvent containing the Question object.
	 */
	function handleQuestion(event: CustomEvent<Question>) {
		const question: Question = event.detail;
		questionsAsked.update((qs) => [...qs, question]);
		processQuestion(question);
	}

	/**
	 * Handles incoming guesses from the ChatSidebar component.
	 * @param event - The CustomEvent containing the guess string.
	 */
	function handleGuess(event: CustomEvent<string>) {
		const guess = event.detail;
		processGuess(guess);
	}

	/**
	 * Handles the selection of a character from CharacterCard.
	 * @param event - The CustomEvent containing the selected Character object.
	 */
	function handleSelectCharacter(event: CustomEvent<Character>) {
		selectedCharacter = event.detail;
		isModalOpen = true;
		console.log(`Modal opened for: ${selectedCharacter.name}`); // Debugging line
	}

	/**
	 * Closes the CharacterModal.
	 */
	function closeModal() {
		isModalOpen = false;
		selectedCharacter = null;
		console.log('Modal closed'); // Debugging line
		if (browser) {
			document.body.classList.remove('modal-open');
		}
	}

	/**
	 * Processes the user's guess by comparing it with the target character.
	 * @param guess - The player's guess.
	 */
	function processGuess(guess: string) {
		const target = get(gameState).targetCharacter;
		if (!target) {
			chatHistory.update((history) => [
				...history,
				{ sender: 'bot', message: 'Game has not started yet.' }
			]);
			return;
		}

		if (guess.trim() === '') {
			// Should not happen due to UI disabling, but handle just in case
			chatHistory.update((history) => [
				...history,
				{ sender: 'bot', message: 'Please enter a character name.' }
			]);
			return;
		}

		const normalizedGuess = guess.trim().toLowerCase();
		const normalizedTarget = target.name.trim().toLowerCase();

		// Add user's guess to chat history
		const userGuessMessage = `I guess: ${guess.trim()}`;
		chatHistory.update((history) => [...history, { sender: 'user', message: userGuessMessage }]);

		if (normalizedGuess === normalizedTarget) {
			gameWon = true;
			winningCharacter = target;
			// Add bot's response
			chatHistory.update((history) => [...history, { sender: 'bot', message: 'Correct!' }]);
		} else {
			// Add bot's response
			chatHistory.update((history) => [
				...history,
				{ sender: 'bot', message: 'Incorrect guess. Try again!' }
			]);
		}
	}

	/**
	 * Processes the user's question by determining the bot's response and updating probabilities.
	 * @param question - The Question object.
	 */
	function processQuestion(question: Question) {
		const target = get(gameState).targetCharacter;

		if (!target) {
			chatHistory.update((history) => [
				...history,
				{ sender: 'bot', message: 'Game not started yet.' }
			]);
			return;
		}

		// Add user's question to chat history
		const userQuestionMessage = `${question.type === 'is' ? 'Is it' : 'Is it not'} ${question.property} ${question.adjective}?`;
		chatHistory.update((history) => [...history, { sender: 'user', message: userQuestionMessage }]);

		// Determine if the property is obscured
		const obscuredProperties = getObscuredProperties(target.properties);
		let answer: 'Yes' | 'No' | 'Maybe';

		if (obscuredProperties.has(question.property)) {
			answer = 'Maybe';
		} else {
			// Determine the answer based on the target character's properties
			if (question.type === 'is') {
				answer = target.properties[question.property] === question.adjective ? 'Yes' : 'No';
			} else {
				answer = target.properties[question.property] !== question.adjective ? 'Yes' : 'No';
			}
		}

		// Add bot's response to chat history
		chatHistory.update((history) => [...history, { sender: 'bot', message: answer }]);

		// Update probabilities using Bayesian reasoning
		updateProbabilities(question, answer);
	}

	/**
	 * Updates the probabilities of each character based on the user's question and bot's answer.
	 * @param question - The Question object.
	 * @param answer - The bot's response ('Yes', 'No', or 'Maybe').
	 */
	function updateProbabilities(question: Question, answer: 'Yes' | 'No' | 'Maybe') {
		const currentCharacters = get(characters);

		// Calculate the obscurity probability
		const totalCharacters = currentCharacters.length;
		const charactersWithPropertyObscured = currentCharacters.filter((char) =>
			getObscuredProperties(char.properties).has(question.property)
		).length;

		let obscurityProbability = charactersWithPropertyObscured / totalCharacters;

		// Prevent division by zero
		if (obscurityProbability === 0) {
			obscurityProbability = 0.01; // A small value to avoid zero probability
		} else if (obscurityProbability === 1) {
			obscurityProbability = 0.99; // Slightly less than 1 to avoid certainty
		}

		// Compute P(E|Hi) for each character
		const p_E_given_Hi = currentCharacters.map((char) => {
			// Determine if the property is obscured for this character
			const obscuredProperties = getObscuredProperties(char.properties);
			let expectedAnswer: 'Yes' | 'No' | 'Maybe';

			if (obscuredProperties.has(question.property)) {
				expectedAnswer = 'Maybe';
			} else {
				if (question.type === 'is') {
					expectedAnswer = char.properties[question.property] === question.adjective ? 'Yes' : 'No';
				} else {
					expectedAnswer = char.properties[question.property] !== question.adjective ? 'Yes' : 'No';
				}
			}

			// Assign P(E|Hi) based on expectedAnswer and actual answer
			if (expectedAnswer === answer) {
				return 1;
			} else if (expectedAnswer === 'Maybe' || answer === 'Maybe') {
				return obscurityProbability;
			} else {
				return 0;
			}
		});

		// Compute P(E)
		const p_E = p_E_given_Hi.reduce(
			(sum: number, p, idx) => sum + p * (currentCharacters[idx].probability / 100),
			0
		);

		if (p_E === 0) {
			// No characters match the evidence
			chatHistory.update((history) => [
				...history,
				{ sender: 'bot', message: 'No characters match this evidence.' }
			]);
			return;
		}

		// Compute P(Hi|E) using Bayes' Theorem
		const updatedCharacters = currentCharacters.map((char, idx) => {
			const prior = char.probability / 100;
			const likelihood = p_E_given_Hi[idx];
			const posterior = (likelihood * prior) / p_E;
			return {
				...char,
				probability: posterior * 100
			};
		});

		// Update the store
		characters.set(updatedCharacters);
	}
</script>

<Header title="Guessing Game" onReset={resetGame} />

<!-- Countdown and Character Display -->
<CountdownDisplay bind:displayComplete />

<!-- Main Content Area -->
<div
	class="flex min-h-screen transition-opacity duration-500"
	class:opacity-0={!displayComplete}
	class:pointer-events-none={!displayComplete}
>
	<!-- Chat Sidebar Component -->
	<ChatSidebar on:question={handleQuestion} on:guess={handleGuess} />

	<!-- Character Cards Area -->
	<main class="flex-1 bg-gray-100 p-6">
		<div class="grid grid-cols-6 gap-4">
			{#each $characters as character}
				<CharacterCard {character} on:select={handleSelectCharacter} />
			{/each}
		</div>
	</main>
</div>

<Footer />

<!-- Win Modal -->
{#if gameWon && winningCharacter}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
		<div class="relative w-full max-w-lg rounded-lg bg-white p-8 text-center shadow-xl">
			<!-- Close Button -->
			<button
				class="absolute right-4 top-4 p-2 text-4xl text-gray-500 hover:text-gray-700 focus:outline-none"
				on:click={resetGame}
				aria-label="Close Modal"
			>
				&times;
			</button>

			<!-- Title and Winning Character -->
			<h2 class="mb-4 text-3xl font-bold text-blue-600">You Win!</h2>
			<p class="text-xl">The character is <strong>{winningCharacter.name}</strong>!</p>

			<!-- Character Image -->
			<img
				src={winningCharacter.imageUrl}
				alt={winningCharacter.name}
				class="mx-auto my-4 h-48 w-48 rounded-full border-4 border-blue-500 shadow-lg"
			/>

			<!-- Summary of Questions Used -->
			<p class="text-lg font-semibold">Questions Asked: {$questionsAsked.length}</p>

			<!-- Play Again Button -->
			<button
				on:click={resetGame}
				class="mt-6 w-full rounded bg-blue-500 px-6 py-3 font-semibold text-white"
			>
				Play Again
			</button>
		</div>
	</div>
{/if}

<!-- Character Modal -->
<CharacterModal character={selectedCharacter} isOpen={isModalOpen} on:close={closeModal} />
