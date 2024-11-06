// src/lib/stores/gameStore.ts

import { writable, type Writable } from 'svelte/store';
import type { Character, Question, GameState, ChatEntry } from '../types';
import { generateRandomProps, getRandomName, generateImageUrl } from '../utils';
import { browser } from '$app/environment';

/**
 * Utility function to load a Svelte writable store from localStorage
 * or initialize it with a default value if not present.
 *
 * @param key - The localStorage key.
 * @param defaultValue - The default value for the store.
 * @returns A writable store of type T.
 */
function loadStore<T>(key: string, defaultValue: T): Writable<T> {
	if (browser) {
		const stored = localStorage.getItem(key);
		if (stored) {
			try {
				return writable<T>(JSON.parse(stored));
			} catch (e) {
				console.error(`Error parsing localStorage key "${key}":`, e);
				// Optionally, you might want to remove corrupted data
				localStorage.removeItem(key);
			}
		}
	}
	return writable<T>(defaultValue);
}

// Initialize with 24 random characters
const initialCharacters: Character[] = Array.from({ length: 24 }, (_, i) => {
	const props = generateRandomProps();
	return {
		id: i + 1,
		name: getRandomName(),
		properties: props,
		probability: 100 / 24, // Initial equal probability
		imageUrl: generateImageUrl(props)
	};
});

// Initialize stores with explicit types
export const characters: Writable<Character[]> = loadStore<Character[]>(
	'characters',
	initialCharacters
);
export const chatHistory: Writable<ChatEntry[]> = loadStore<ChatEntry[]>('chatHistory', []);
export const questionsAsked: Writable<Question[]> = loadStore<Question[]>('questionsAsked', []);
export const guessesMade: Writable<number> = loadStore<number>('guessesMade', 0); // New Store
export const gameState: Writable<GameState> = loadStore<GameState>('gameState', {
	targetCharacter: null,
	gameStarted: false,
	gameWon: false,
	guessResult: null
});

// Subscribe to store changes to save to localStorage, only on the client
if (browser) {
	characters.subscribe((value) => localStorage.setItem('characters', JSON.stringify(value)));
	chatHistory.subscribe((value) => localStorage.setItem('chatHistory', JSON.stringify(value)));
	questionsAsked.subscribe((value) =>
		localStorage.setItem('questionsAsked', JSON.stringify(value))
	);
	guessesMade.subscribe((value) => localStorage.setItem('guessesMade', JSON.stringify(value))); // Save Guesses
	gameState.subscribe((value) => localStorage.setItem('gameState', JSON.stringify(value)));
}

export function startGame() {
	if (browser) {
		const randomIndex = Math.floor(Math.random() * initialCharacters.length);
		const selectedCharacter = initialCharacters[randomIndex];
		gameState.set({
			targetCharacter: selectedCharacter,
			gameStarted: true,
			gameWon: false,
			guessResult: null
		});
		// Reset other stores
		chatHistory.set([]);
		questionsAsked.set([]);
		guessesMade.set(0); // Reset Guesses
		characters.set(initialCharacters);
	}
}

// Function to reset the game
export function resetGame() {
	if (browser) {
		localStorage.clear();
		window.location.reload();
	}
}
