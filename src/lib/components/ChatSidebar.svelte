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

	// Count user questions in chat history
	$: questionCount = $chatHistory.filter((entry) => entry.sender === 'user').length;

	// Define available properties and adjectives
	const properties: { [key in keyof CharacterProperties]: string[] } = {
		topType: [
			'NoHair',
			'Eyepatch',
			'Hat',
			'Hijab',
			'Turban',
			'WinterHat1',
			'WinterHat2',
			'WinterHat3',
			'WinterHat4',
			'LongHairBigHair',
			'LongHairBob',
			'LongHairBun',
			'LongHairCurly',
			'LongHairCurvy',
			'LongHairDreads',
			'LongHairFrida',
			'LongHairFro',
			'LongHairFroBand',
			'LongHairNotTooLong',
			'LongHairShavedSides',
			'LongHairMiaWallace',
			'LongHairStraight',
			'LongHairStraight2',
			'LongHairStraightStrand',
			'ShortHairDreads01',
			'ShortHairDreads02',
			'ShortHairFrizzle',
			'ShortHairShaggyMullet',
			'ShortHairShortCurly',
			'ShortHairShortFlat',
			'ShortHairShortRound',
			'ShortHairShortWaved',
			'ShortHairSides',
			'ShortHairTheCaesar',
			'ShortHairTheCaesarSidePart'
		],
		accessoriesType: [
			'Blank',
			'Kurt',
			'Prescription01',
			'Prescription02',
			'Round',
			'Sunglasses',
			'Wayfarers'
		],
		hairColor: [
			'Auburn',
			'Black',
			'Blonde',
			'BlondeGolden',
			'Brown',
			'BrownDark',
			'PastelPink',
			'Blue',
			'Platinum',
			'Red',
			'SilverGray'
		],
		facialHairType: [
			'Blank',
			'BeardMedium',
			'BeardLight',
			'BeardMajestic',
			'MoustacheFancy',
			'MoustacheMagnum'
		],
		facialHairColor: [
			'Auburn',
			'Black',
			'Blonde',
			'BlondeGolden',
			'Brown',
			'BrownDark',
			'Platinum',
			'Red'
		],
		clotheType: [
			'BlazerShirt',
			'BlazerSweater',
			'CollarSweater',
			'GraphicShirt',
			'Hoodie',
			'Overall',
			'ShirtCrewNeck',
			'ShirtScoopNeck',
			'ShirtVNeck'
		],
		clotheColor: [
			'Black',
			'Blue01',
			'Blue02',
			'Blue03',
			'Gray01',
			'Gray02',
			'Heather',
			'PastelBlue',
			'PastelGreen',
			'PastelOrange',
			'PastelRed',
			'PastelYellow',
			'Pink',
			'Red',
			'White'
		],
		eyeType: [
			'Close',
			'Cry',
			'Default',
			'Dizzy',
			'EyeRoll',
			'Happy',
			'Hearts',
			'Side',
			'Squint',
			'Surprised',
			'Wink',
			'WinkWacky'
		],
		eyebrowType: [
			'Angry',
			'AngryNatural',
			'Default',
			'DefaultNatural',
			'FlatNatural',
			'RaisedExcited',
			'RaisedExcitedNatural',
			'SadConcerned',
			'SadConcernedNatural',
			'UnibrowNatural',
			'UpDown',
			'UpDownNatural'
		],
		mouthType: [
			'Concerned',
			'Default',
			'Disbelief',
			'Eating',
			'Grimace',
			'Sad',
			'ScreamOpen',
			'Serious',
			'Smile',
			'Tongue',
			'Twinkle',
			'Vomit'
		],
		skinColor: ['Tanned', 'Yellow', 'Pale', 'Light', 'Brown', 'DarkBrown', 'Black']
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

<!-- Updated ChatSidebar.svelte -->

<div class="flex h-screen w-1/4 flex-col overflow-y-auto border-r border-gray-200 bg-gray-50 p-6">
	<!-- Guess Section -->
	<div class="mb-8">
		<h2 class="mb-3 text-xl font-semibold text-gray-800">Guess the Character</h2>
		<div class="flex items-center space-x-2">
			<label for="guess-input" class="sr-only">Enter character name</label>
			<input
				id="guess-input"
				type="text"
				bind:value={guessInput}
				placeholder="Enter character name"
				class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
				disabled={!$gameState.gameStarted || $gameState.gameWon}
			/>
			<button
				on:click={submitGuess}
				class="rounded-lg bg-blue-500 p-3 font-semibold text-white hover:bg-blue-600 disabled:bg-gray-300"
				disabled={!$gameState.gameStarted || $gameState.gameWon || guessInput.trim() === ''}
			>
				Guess
			</button>
		</div>
		{#if guessError}
			<p class="mt-2 text-sm text-red-500">{guessError}</p>
		{/if}
	</div>

	<!-- Question Section -->
	<h2 class="mb-3 text-xl font-semibold text-gray-800">Ask a Question</h2>
	<div class="mb-8 space-y-4">
		<div>
			<label for="question-type" class="mb-2 block font-medium text-gray-700">Question Type:</label>
			<div class="flex space-x-2">
				<button
					id="question-type-is"
					type="button"
					class={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${questionType === 'is' ? 'bg-blue-500 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'}`}
					on:click={() => (questionType = 'is')}
					aria-pressed={questionType === 'is'}
				>
					Is it
				</button>
				<button
					id="question-type-is-not"
					type="button"
					class={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${questionType === 'is_not' ? 'bg-red-500 text-white' : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'}`}
					on:click={() => (questionType = 'is_not')}
					aria-pressed={questionType === 'is_not'}
				>
					Is it not
				</button>
			</div>
		</div>

		{#if questionType}
			<div>
				<label for="property-select" class="mb-2 block font-medium text-gray-700"
					>Choose Property:</label
				>
				<select
					id="property-select"
					bind:value={selectedProperty}
					class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
				>
					<option value="" disabled>Select a property</option>
					{#each Object.keys(properties) as prop}
						<option value={prop}>{prop}</option>
					{/each}
				</select>
			</div>
		{/if}

		{#if selectedProperty}
			<div>
				<label for="adjective-select" class="mb-2 block font-medium text-gray-700"
					>Choose Adjective:</label
				>
				<select
					id="adjective-select"
					bind:value={selectedAdjective}
					class="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
				>
					<option value="" disabled>Select an adjective</option>
					{#each properties[selectedProperty] as adjective}
						<option value={adjective}>{adjective}</option>
					{/each}
				</select>
			</div>
		{/if}

		{#if selectedAdjective}
			<button
				on:click={submitQuestion}
				class="w-full rounded-lg bg-green-500 p-3 font-semibold text-white hover:bg-green-600"
			>
				Submit Question
			</button>
		{/if}
	</div>

	<!-- Chat History -->
	<div class="flex-1 overflow-y-auto">
		<div class="mb-3 flex items-center justify-between">
			<h3 class="text-lg font-semibold text-gray-800">History</h3>
			<span class="text-sm text-gray-500">{questionCount} Questions</span>
		</div>
		<ul class="space-y-3">
			{#each $chatHistory as entry}
				<li class="flex items-start">
					{#if entry.sender === 'user'}
						<div class="ml-auto flex max-w-xs items-center space-x-2 text-right">
							<span class="rounded-lg bg-blue-100 p-2 font-medium text-blue-800"
								>{entry.message}</span
							>
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 font-semibold text-white"
							>
								U
							</div>
						</div>
					{:else if entry.sender === 'bot'}
						<div class="flex max-w-xs items-center space-x-2">
							<div
								class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 font-semibold text-white"
							>
								B
							</div>
							<span class="rounded-lg bg-green-100 p-2 font-medium text-green-800"
								>{entry.message}</span
							>
						</div>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</div>
