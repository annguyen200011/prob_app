<!-- src/lib/components/ChatSidebar.svelte -->
<script lang="ts">
	import { createEventDispatcher, afterUpdate } from 'svelte';
	import { chatHistory, gameState } from '../stores/gameStore'; // Import gameState
	import type { Question, ChatEntry, CharacterProperties } from '../types';

	const dispatch = createEventDispatcher();

	let questionType: 'is' | 'is_not' | null = null;
	let selectedProperty: keyof CharacterProperties | null = null;
	let selectedAdjective: string | null = null;

	// Reference to the chat history container
	let chatMessagesContainer: HTMLDivElement;

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
	 * Dispatches an event to initiate guess mode.
	 */
	const initiateGuess = () => {
		dispatch('initiateGuess');
	};

	/**
	 * Auto-scrolls the chat history to the bottom whenever it updates.
	 */
	afterUpdate(() => {
		if (chatMessagesContainer) {
			chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
		}
	});
</script>

<!-- Updated ChatSidebar.svelte -->

<div class="flex h-screen w-1/4 flex-col overflow-hidden border-r border-gray-200 bg-gray-50">
	<!-- Guess Button -->
	<div class="flex items-center justify-between p-4">
		<h2 class="text-xl font-semibold text-gray-800">Guess the Character</h2>
		<button
			on:click={initiateGuess}
			class="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600 disabled:bg-gray-300"
			disabled={!$gameState.gameStarted || $gameState.gameWon}
		>
			Guess
		</button>
	</div>

	<!-- Divider -->
	<div class="border-t border-gray-300"></div>

	<!-- Question Section -->
	<div class="p-4">
		<h2 class="mb-3 text-xl font-semibold text-gray-800">Ask a Question</h2>
		<div class="space-y-4">
			<div>
				<label for="question-type" class="mb-2 block font-medium text-gray-700"
					>Question Type:</label
				>
				<div class="flex space-x-2">
					<button
						type="button"
						id="question-type"
						class={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${
							questionType === 'is'
								? 'bg-blue-500 text-white'
								: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
						}`}
						on:click={() => (questionType = 'is')}
						aria-pressed={questionType === 'is'}
					>
						Is it
					</button>
					<button
						type="button"
						class={`flex-1 rounded-lg px-4 py-2 font-semibold transition ${
							questionType === 'is_not'
								? 'bg-red-500 text-white'
								: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
						}`}
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
						class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
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
						class="w-full rounded-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
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
					class="w-full rounded-lg bg-green-500 px-4 py-2 font-semibold text-white hover:bg-green-600"
				>
					Submit Question
				</button>
			{/if}
		</div>
	</div>

	<!-- Divider -->
	<div class="border-t border-gray-300"></div>

	<!-- Chat History -->
	<div class="flex min-h-0 flex-1 flex-col">
		<!-- Fixed Header for Chat History -->
		<div class="flex items-center justify-between p-4">
			<h3 class="text-lg font-semibold text-gray-800">History</h3>
			<span class="text-sm text-gray-500">{questionCount} Questions</span>
		</div>

		<!-- Scrollable Chat Messages -->
		<div class="flex-1 overflow-y-auto px-4 pb-4" bind:this={chatMessagesContainer}>
			<ul class="space-y-3">
				{#each $chatHistory as entry}
					<li class="flex items-start">
						{#if entry.sender === 'user'}
							<div class="ml-auto flex max-w-xs items-center space-x-2 text-right">
								<span class="rounded-lg bg-blue-100 p-2 font-medium text-blue-800">
									{entry.message}
								</span>
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
								<span
									class="rounded-lg p-2 font-medium"
									class:bg-green-100={entry.message === 'Yes' || entry.message === 'Correct!'}
									class:text-green-800={entry.message === 'Yes' || entry.message === 'Correct!'}
									class:bg-red-100={entry.message === 'No' ||
										entry.message === 'Incorrect guess. Try again!'}
									class:text-red-800={entry.message === 'No' ||
										entry.message === 'Incorrect guess. Try again!'}
									class:bg-yellow-100={entry.message === 'Maybe'}
									class:text-yellow-800={entry.message === 'Maybe'}
								>
									{entry.message}
								</span>
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
