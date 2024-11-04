<!-- src/routes/+page.svelte -->
<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import CharacterCard from '$lib/components/CharacterCard.svelte';
  import ChatSidebar from '$lib/components/ChatSidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import CountdownDisplay from '$lib/components/CountdownDisplay.svelte';
  import { characters, chatHistory, questionsAsked, gameState, resetGame } from '$lib/stores/gameStore';
  import type { Question, Character, ChatEntry } from '$lib/types';
  import { get } from 'svelte/store';
  import { browser } from '$app/environment';

  let gameWon = false;
  let winningCharacter: Character | null = null;

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
   * Processes the user's guess by comparing it with the target character.
   * @param guess - The player's guess.
   */
  function processGuess(guess: string) {
    const target = get(gameState).targetCharacter;
    if (!target) {
      chatHistory.update((history) => [...history, { sender: 'bot', message: 'Game has not started yet.' }]);
      return;
    }

    if (guess.trim() === '') {
      // Should not happen due to UI disabling, but handle just in case
      chatHistory.update((history) => [...history, { sender: 'bot', message: 'Please enter a character name.' }]);
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
      chatHistory.update((history) => [...history, { sender: 'bot', message: 'Incorrect guess. Try again!' }]);
    }
  }

  /**
   * Processes the user's question by determining the bot's response and updating probabilities.
   * @param question - The Question object.
   */
  function processQuestion(question: Question) {
    const target = get(gameState).targetCharacter;

    if (!target) {
      chatHistory.update((history) => [...history, { sender: 'bot', message: "Game not started yet." }]);
      return;
    }

    // Add user's question to chat history
    const userQuestionMessage = `${question.type === 'is' ? 'Is it' : 'Is it not'} ${question.property} ${question.adjective}?`;
    chatHistory.update((history) => [...history, { sender: 'user', message: userQuestionMessage }]);

    // Determine the answer based on the target character's properties
    let answer: 'Yes' | 'No' = 'No';
    if (question.type === 'is') {
      answer = target.properties[question.property] === question.adjective ? 'Yes' : 'No';
    } else {
      answer = target.properties[question.property] !== question.adjective ? 'Yes' : 'No';
    }

    // Add bot's response to chat history
    chatHistory.update((history) => [...history, { sender: 'bot', message: answer }]);

    // Update probabilities using Bayesian reasoning
    updateProbabilities(question, answer);
  }

  /**
   * Updates the probabilities of each character based on the user's question and bot's answer.
   * @param question - The Question object.
   * @param answer - The bot's response ('Yes' or 'No').
   */
  function updateProbabilities(question: Question, answer: 'Yes' | 'No') {
    const currentCharacters = get(characters);

    // Compute P(E|Hi) for each character based on the answer
    const p_E_given_Hi = currentCharacters.map((char) => {
      if (question.type === 'is') {
        return char.properties[question.property] === question.adjective ? 1 : 0;
      } else {
        return char.properties[question.property] !== question.adjective ? 1 : 0;
      }
    });

    // Compute P(E)
    const p_E = p_E_given_Hi.reduce((sum:number, p, idx) => sum + p * (currentCharacters[idx].probability / 100), 0);

    if (p_E === 0) {
      // No characters match the evidence
      chatHistory.update((history) => [...history, { sender: 'bot', message: "No characters match this evidence." }]);
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

    // Normalize probabilities
    const totalProbability = updatedCharacters.reduce((sum, char) => sum + char.probability, 0);
    const normalizedCharacters = updatedCharacters.map((char) => ({
      ...char,
      probability: (char.probability / totalProbability) * 100
    }));

    // Update the store
    characters.set(normalizedCharacters);
  }
</script>

<Header title="Guessing Game" />

<!-- Countdown and Character Display -->
<CountdownDisplay />

<div class="flex">
  <!-- Chat Sidebar Component -->
  <ChatSidebar on:question={handleQuestion} on:guess={handleGuess} />

  <!-- Main Content Area: Character Cards -->
  <main class="flex-1 p-4">
    <div class="grid grid-cols-4 gap-4">
      {#each $characters as character}
        <CharacterCard {character} />
      {/each}
    </div>
  </main>
</div>

<Footer />

<!-- Win Modal -->
{#if gameWon && winningCharacter}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 class="text-2xl font-bold mb-4">You Win!</h2>
      <p>The character is <strong>{winningCharacter.name}</strong>.</p>
      <p class="mt-2">Congratulations!</p>
      <button on:click={resetGame} class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Play Again
      </button>
    </div>
  </div>
{/if}
