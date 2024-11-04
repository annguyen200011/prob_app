<!-- src/lib/components/ChatSidebar.svelte -->
<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { chatHistory, gameState } from '../stores/gameStore'; // Import gameState
  import type { Question, ChatEntry, CharacterProperties } from '../types';

  const dispatch = createEventDispatcher();

  let questionType: 'is' | 'is_not' | null = null;
  let selectedProperty: keyof CharacterProperties | null = null;
  let selectedAdjective: string | null = null;

  let guessInput: string = '';
  let guessError: string = '';

  // Define available properties and adjectives
  const properties: { [key in keyof CharacterProperties]: string[] } = {
    topType: [
      "NoHair",
      "Eyepatch",
      "Hat",
      "Hijab",
      "Turban",
      "WinterHat1",
      "WinterHat2",
      "WinterHat3",
      "WinterHat4",
      "LongHairBigHair",
      "LongHairBob",
      "LongHairBun",
      "LongHairCurly",
      "LongHairCurvy",
      "LongHairDreads",
      "LongHairFrida",
      "LongHairFro",
      "LongHairFroBand",
      "LongHairNotTooLong",
      "LongHairShavedSides",
      "LongHairMiaWallace",
      "LongHairStraight",
      "LongHairStraight2",
      "LongHairStraightStrand",
      "ShortHairDreads01",
      "ShortHairDreads02",
      "ShortHairFrizzle",
      "ShortHairShaggyMullet",
      "ShortHairShortCurly",
      "ShortHairShortFlat",
      "ShortHairShortRound",
      "ShortHairShortWaved",
      "ShortHairSides",
      "ShortHairTheCaesar",
      "ShortHairTheCaesarSidePart"
    ],
    accessoriesType: [
      "Blank",
      "Kurt",
      "Prescription01",
      "Prescription02",
      "Round",
      "Sunglasses",
      "Wayfarers"
    ],
    hairColor: [
      "Auburn",
      "Black",
      "Blonde",
      "BlondeGolden",
      "Brown",
      "BrownDark",
      "PastelPink",
      "Blue",
      "Platinum",
      "Red",
      "SilverGray"
    ],
    facialHairType: [
      "Blank",
      "BeardMedium",
      "BeardLight",
      "BeardMajestic",
      "MoustacheFancy",
      "MoustacheMagnum"
    ],
    facialHairColor: [
      "Auburn",
      "Black",
      "Blonde",
      "BlondeGolden",
      "Brown",
      "BrownDark",
      "Platinum",
      "Red"
    ],
    clotheType: [
      "BlazerShirt",
      "BlazerSweater",
      "CollarSweater",
      "GraphicShirt",
      "Hoodie",
      "Overall",
      "ShirtCrewNeck",
      "ShirtScoopNeck",
      "ShirtVNeck"
    ],
    clotheColor: [
      "Black",
      "Blue01",
      "Blue02",
      "Blue03",
      "Gray01",
      "Gray02",
      "Heather",
      "PastelBlue",
      "PastelGreen",
      "PastelOrange",
      "PastelRed",
      "PastelYellow",
      "Pink",
      "Red",
      "White"
    ],
    eyeType: [
      "Close",
      "Cry",
      "Default",
      "Dizzy",
      "EyeRoll",
      "Happy",
      "Hearts",
      "Side",
      "Squint",
      "Surprised",
      "Wink",
      "WinkWacky"
    ],
    eyebrowType: [
      "Angry",
      "AngryNatural",
      "Default",
      "DefaultNatural",
      "FlatNatural",
      "RaisedExcited",
      "RaisedExcitedNatural",
      "SadConcerned",
      "SadConcernedNatural",
      "UnibrowNatural",
      "UpDown",
      "UpDownNatural"
    ],
    mouthType: [
      "Concerned",
      "Default",
      "Disbelief",
      "Eating",
      "Grimace",
      "Sad",
      "ScreamOpen",
      "Serious",
      "Smile",
      "Tongue",
      "Twinkle",
      "Vomit"
    ],
    skinColor: [
      "Tanned",
      "Yellow",
      "Pale",
      "Light",
      "Brown",
      "DarkBrown",
      "Black"
    ]
  };

  /**
   * Resets the question selection fields.
   */
  const resetQuestion = () => {
    questionType = null;
    selectedProperty = null;
    selectedAdjective = null;
  };

  /**
   * Submits the question by dispatching it to the parent component.
   */
  const submitQuestion = () => {
    if (questionType && selectedProperty && selectedAdjective) {
      const question: Question = {
        type: questionType,
        property: selectedProperty,
        adjective: selectedAdjective
      };
      // Dispatch the question event
      dispatch('question', question);
      // Reset selections
      resetQuestion();
    }
  };

/**
   * Handles the player's guess by dispatching a custom event.
   */
  const submitGuess = () => {
    if (guessInput.trim() === '') {
      guessError = 'Please enter a character name.';
      return;
    }

    // Dispatch a 'guess' event with the guess input
    dispatch('guess', guessInput.trim());

    // Reset the guess input and error
    guessInput = '';
    guessError = '';
  };
</script>

<div class="w-1/4 p-4 bg-gray-100 h-screen overflow-y-auto flex flex-col">
  <!-- Guessing Section at the Top -->
  <div class="mb-6">
    <h2 class="text-xl font-semibold mb-2">Guess the Character</h2>
    <input
      type="text"
      bind:value={guessInput}
      placeholder="Enter character name"
      class="w-full p-2 border rounded mb-2"
      disabled={!$gameState.gameStarted || $gameState.gameWon}
    />
    <button
      on:click={submitGuess}
      class="w-full bg-green-500 text-white p-2 rounded disabled:bg-gray-400"
      disabled={!$gameState.gameStarted || $gameState.gameWon || guessInput.trim() === ''}
    >
      Guess
    </button>
    {#if guessError}
      <p class="text-red-500 mt-2">{guessError}</p>
    {/if}
  </div>

  <!-- Ask a Question Section -->
  <h2 class="text-xl font-semibold mb-4">Ask a Question</h2>

  <!-- Step 1: Choose Question Type -->
  <div class="mb-4">
    <label class="block mb-2 font-medium">Question Type:</label>
    <div class="flex space-x-2">
      <button
        class={`px-4 py-2 rounded ${questionType === 'is' ? 'bg-blue-500 text-white' : 'bg-white border'}`}
        on:click={() => (questionType = 'is')}
      >
        Is it
      </button>
      <button
        class={`px-4 py-2 rounded ${questionType === 'is_not' ? 'bg-red-500 text-white' : 'bg-white border'}`}
        on:click={() => (questionType = 'is_not')}
      >
        Is it not
      </button>
    </div>
  </div>

  <!-- Step 2: Choose Property -->
  {#if questionType}
    <div class="mb-4">
      <label class="block mb-2 font-medium">Choose Property:</label>
      <select
        bind:value={selectedProperty}
        class="w-full p-2 border rounded"
      >
        <option value="" disabled selected>Select a property</option>
        {#each Object.keys(properties) as prop}
          <option value={prop}>{prop}</option>
        {/each}
      </select>
    </div>
  {/if}

  <!-- Step 3: Choose Adjective -->
  {#if selectedProperty}
    <div class="mb-4">
      <label class="block mb-2 font-medium">Choose Adjective:</label>
      <select
        bind:value={selectedAdjective}
        class="w-full p-2 border rounded"
      >
        <option value="" disabled selected>Select an adjective</option>
        {#each properties[selectedProperty] as adjective}
          <option value={adjective}>{adjective}</option>
        {/each}
      </select>
    </div>
  {/if}

  <!-- Submit Button -->
  {#if selectedAdjective}
    <button
      on:click={submitQuestion}
      class="w-full bg-green-500 text-white p-2 rounded"
    >
      Submit Question
    </button>
  {/if}

  <!-- Chat History -->
  <div class="mt-6 flex-1 overflow-y-auto">
    <h3 class="text-lg font-semibold mb-2">History</h3>
    <ul>
  {#each $chatHistory as entry}
    <li class="mb-2">
      {#if entry.sender === 'user'}
        <div class="flex justify-end">
          <div class="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
            <strong>You:</strong> {entry.message}
          </div>
        </div>
      {:else if entry.sender === 'bot'}
        <div class="flex justify-start">
          <div class="bg-green-500 text-white p-2 rounded-lg max-w-xs">
            <strong>Bot:</strong> {entry.message}
          </div>
        </div>
      {/if}
    </li>
  {/each}
</ul>
  </div>
</div>
