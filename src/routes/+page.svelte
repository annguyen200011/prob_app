<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import CharacterCard from '$lib/components/CharacterCard.svelte';
  import ChatSidebar from '$lib/components/ChatSidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { characters, chatHistory, questionsAsked } from '$lib/stores/gameStore';
  import type { Question, Character } from '$lib/types';
  import { get } from 'svelte/store';

  // State variables
  let gameWon = false;
  let winningCharacter: Character | null = null;

  // Handle incoming questions from ChatSidebar
  function handleQuestion(event: CustomEvent<Question>) {
    const question: Question = event.detail;
    questionsAsked.update((qs) => [...qs, question]);
    processQuestion(question);
  }

  // Process the question using Bayesian reasoning
  function processQuestion(question: Question) {
    const currentCharacters = get(characters);

    // Step 1: Compute P(E|Hi) for each character
    const p_E_given_Hi = currentCharacters.map((char) => {
      // Binary evidence: 1 if character matches the evidence, else 0
      return char.properties[question.property] === question.adjective ? 1 : 0;
    });

    // Step 2: Compute P(E) = sum(P(E|Hi) * P(Hi))
    const p_E = p_E_given_Hi.reduce((sum: number, p, idx) => sum + p * (currentCharacters[idx].probability / 100), 0);

    if (p_E === 0) {
      // No characters match the evidence
      chatHistory.update((history) => [...history, { question, response: "No characters match this evidence." }]);
      return;
    }

    // Step 3: Compute P(Hi|E) for each character
    const updatedCharacters = currentCharacters.map((char, idx) => {
      const prior = char.probability / 100; // Convert percentage to probability
      const likelihood = p_E_given_Hi[idx];
      const posterior = (likelihood * prior) / p_E;
      return {
        ...char,
        probability: posterior * 100 // Convert back to percentage
      };
    });

    // Step 4: Optionally normalize if necessary
    const totalProbability = updatedCharacters.reduce((sum, char) => sum + char.probability, 0);
    if (Math.abs(totalProbability - 100) > 0.01) { // Allowing a small margin
      const normalizedCharacters = updatedCharacters.map((char) => ({
        ...char,
        probability: (char.probability / totalProbability) * 100
      }));
      characters.set(normalizedCharacters);
    } else {
      characters.set(updatedCharacters);
    }

    // Step 5: Update chat history with response
    const response = generateResponse(question, updatedCharacters);
    chatHistory.update((history) => [...history, { question, response }]);

    // Step 6: Check for win condition
    const winner = updatedCharacters.find((char) => char.probability >= 90);
    if (winner) {
      gameWon = true;
      winningCharacter = winner;
    }
  }

  // Generate a response message based on updated probabilities
  function generateResponse(question: Question, characters: Character[]): string {
    // Calculate the total probability of characters matching the evidence
    const matching = characters.filter((char) => char.properties[question.property] === question.adjective);
    const totalProbability = matching.reduce((sum, char) => sum + char.probability, 0);
    const percentage = totalProbability.toFixed(2);
    return `Based on your question, the probability of characters matching "${question.adjective}" for "${question.property}" is now ${percentage}%.`;
  }

  // Reset the game by clearing localStorage and reloading
  function resetGame() {
    localStorage.clear();
    window.location.reload();
  }
</script>

<!-- Header Component -->
<Header title="Guessing Game" />

<div class="flex">
  <!-- Chat Sidebar Component -->
  <ChatSidebar on:question={handleQuestion} />

  <!-- Main Content Area: Character Cards -->
  <main class="flex-1 p-4">
    <div class="grid grid-cols-4 gap-4">
      {#each $characters as character}
        <CharacterCard {character} />
      {/each}
    </div>
  </main>
</div>

<!-- Footer Component -->
<Footer />

<!-- Win Modal: Displayed when game is won and winningCharacter is set -->
{#if gameWon && winningCharacter}
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold mb-4">You Win!</h2>
      <p>The character is <strong>{winningCharacter.name}</strong>.</p>
      <img src={winningCharacter.imageUrl} alt={winningCharacter.name} class="w-32 h-32 mt-2 mb-4" />
      <button on:click={resetGame} class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Play Again
      </button>
    </div>
  </div>
{/if}
